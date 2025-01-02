package com.groupthirteen.nais_journal.service;


import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.model.JournalEntity;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
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

    public List<JournalEntity> getRecentPosts() {
        return journalRepo.findAll(Sort.by(Sort.Direction.DESC, "publishedDate"));
    }

    public List<JournalEntity> searchJournalsByTitle(String query) {
        return journalRepo.findByTitleRegex("(?i).*" + query + ".*");
    }

    public JournalEntity getJournal(ObjectId journalId) {
        Optional<JournalEntity> journal = journalRepo.findById(journalId);
        return journal.orElse(null);
    }

    public String summarizer(ObjectId journalId) {
        JournalEntity journal = journalRepo.findById(journalId).orElse(null);
        if (journal != null) {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();

            headers.set("Content-Type", "application/json");
            String jsonpayload = "{ \"inputs\": \"" + journal.getBody() + "\" }";
            HttpEntity<String> entity = new HttpEntity<>(jsonpayload, headers);

            ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, String.class);

            return response.getBody();
        }
        return null;
    }
}