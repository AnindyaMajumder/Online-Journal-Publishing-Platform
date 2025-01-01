package com.groupthirteen.nais_journal.service;


import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.model.JournalEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicService {
    @Autowired
    JournalRepo journalRepo;

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
}
