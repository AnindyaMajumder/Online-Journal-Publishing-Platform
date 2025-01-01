package com.groupthirteen.nais_journal.controller;

import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.service.PublicService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class PublicController {
    @Autowired
    PublicService publicService;

    @GetMapping
    public ResponseEntity<?> Popular() {
        try{
            List<JournalEntity> popularPosts = publicService.getPopularPosts();
            return ResponseEntity.ok(popularPosts);
        }catch(Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/recent")
    public ResponseEntity<?> Recent() {
        try {
            List<JournalEntity> recentPosts = publicService.getRecentPosts();
            return ResponseEntity.ok(recentPosts);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> Search(@RequestParam String query) {
        try{
            List<JournalEntity> searchResult = publicService.searchJournalsByTitle(query);
            return ResponseEntity.ok(searchResult);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/article")
    public ResponseEntity<?> AddArticle(@RequestBody JournalEntity journal) {
        ObjectId id = journal.getId();
        JournalEntity journalEntity = publicService.getJournal(journal.getId());
        if (journalEntity == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(journalEntity);
        }

    }
}
