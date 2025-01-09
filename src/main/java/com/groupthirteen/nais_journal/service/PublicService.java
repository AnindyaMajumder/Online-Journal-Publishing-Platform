package com.groupthirteen.nais_journal.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.groupthirteen.nais_journal.Repository.AnnouncementRepo;
import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.model.AnnouncementEntity;
import com.groupthirteen.nais_journal.model.JournalEntity;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PublicService {

    private static final Logger logger = LoggerFactory.getLogger(PublicService.class);

    @Autowired
    JournalRepo journalRepo;

    @Autowired
    private AnnouncementRepo announcementRepo;

    @Value("${huggingface.api.url}")
    private String apiUrl;

    @Value("${huggingface.api.key}")
    private String apiKey;

    public List<JournalEntity> getPopularPosts() {
        logger.info("Fetching popular posts sorted by likeCount in descending order.");
        return journalRepo.findAll(Sort.by(Sort.Direction.DESC, "likeCount"));
    }

    public List<JournalEntity> getRecentPosts() {
        logger.info("Fetching recent posts sorted by publishedDate in descending order.");
        return journalRepo.findAll(Sort.by(Sort.Direction.DESC, "publishedDate"));
    }

    public List<JournalEntity> searchJournalsByTitle(String query) {
        logger.info("Searching journals by title with query: {}", query);
        return journalRepo.findByTitleRegex("(?i).*" + query + ".*");
    }

    public JournalEntity getJournal(ObjectId journalId) {
        logger.info("Fetching journal with ID: {}", journalId);
        Optional<JournalEntity> journal = journalRepo.findById(journalId);
        if (journal.isPresent()) {
            logger.info("Journal found with ID: {}", journalId);
        } else {
            logger.warn("No journal found with ID: {}", journalId);
        }
        return journal.orElse(null);
    }

    public List<AnnouncementEntity> getAnnouncement() {
        logger.info("Fetching all announcements.");
        return announcementRepo.findAll();
    }

    public String summarizer(ObjectId journalId) throws JsonProcessingException {
        logger.info("Generating summary for journal with ID: {}", journalId);
        JournalEntity journal = journalRepo.findById(journalId).orElse(null);
        if (journal != null) {
            logger.info("Journal found. Sending request to Hugging Face API.");
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();

            headers.set("Content-Type", "application/json");
            headers.set("Authorization", "Bearer " + apiKey);

            String payload = "{ \"inputs\": \"" + journal.getBody() + "\" }";
            HttpEntity<String> entity = new HttpEntity<>(payload, headers);

            String response = restTemplate.postForEntity(apiUrl, entity, String.class).getBody();
            logger.debug("Response from Hugging Face API: {}", response);

            ObjectMapper objectMapper = new ObjectMapper();
            List<Map<String, String>> responseList = objectMapper.readValue(response, List.class);

            logger.info("Summary generated successfully.");
            return responseList.get(0).get("summary_text");
        }
        logger.warn("No journal found with ID: {} for summarisation.", journalId);
        return null;
    }
}