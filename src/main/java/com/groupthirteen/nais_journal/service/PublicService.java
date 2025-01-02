package com.groupthirteen.nais_journal.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.model.JournalEntity;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PublicService {
    @Autowired
    JournalRepo journalRepo;

    @Value("${huggingface.api.url}")
    private String apiUrl;

    @Value("${huggingface.api.key}")
    private String apiKey;


    public List<JournalEntity> getPopularPosts() {
        return journalRepo.findAll(Sort.by(Sort.Direction.DESC, "likeCount"));
    }

    // sorted by publishedDate in descending order
    public List<JournalEntity> getRecentPosts() {
        return journalRepo.findAll(Sort.by(Sort.Direction.DESC, "publishedDate"));
    }

    // case-insensitive partial search
    public List<JournalEntity> searchJournalsByTitle(String query) {
        return journalRepo.findByTitleRegex("(?i).*" + query + ".*");
    }

    public JournalEntity getJournal(ObjectId journalId) {
        Optional<JournalEntity> journal = journalRepo.findById(journalId);
        return journal.orElse(null);
    }

    public String summarizer(ObjectId journalId) throws JsonProcessingException {
        JournalEntity journal = journalRepo.findById(journalId).orElse(null);
        if (journal != null) {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();

            headers.set("Content-Type", "application/json");
            headers.set("Authorization", "Bearer " + apiKey);

            String payload = "{ \"inputs\": \"" + journal.getBody() + "\" }";
            HttpEntity<String> entity = new HttpEntity<>(payload, headers);

            String response = restTemplate.postForEntity(apiUrl, entity, String.class).getBody();

            ObjectMapper objectMapper = new ObjectMapper();
            List<Map<String, String>> responseList = objectMapper.readValue(response, List.class);

            // Extract the "summary_text" value from the first item in the list
            String summary = responseList.get(0).get("summary_text");

            return summary;

        }
        return null;
    }

}
