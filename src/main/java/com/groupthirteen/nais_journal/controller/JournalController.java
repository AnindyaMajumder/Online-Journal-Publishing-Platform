package com.groupthirteen.nais_journal.controller;

import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.security.JwtUtils;
import com.groupthirteen.nais_journal.service.JournalService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/journal")
public class JournalController {
    @Autowired
    private JournalService journalService;

    @Autowired
    private JwtUtils jwtUtils;


//    public JournalController(JournalService journalService, JwtUtils jwtUtils) {
//        this.journalService = journalService;
//        this.jwtUtils = jwtUtils;
//    }

    @PutMapping("/edit-details")
    public ResponseEntity<?> editDetails(@RequestHeader("Authorization") String token, @RequestBody JournalEntity journal) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);
        boolean isUpdated = journalService.updateJournal(username, journal);
        return isUpdated ? ResponseEntity.ok("Journal updated successfully") :
                ResponseEntity.badRequest().body("Journal update failed");
    }



    @PostMapping("/add-journal")
    public ResponseEntity<?> addJournal(@RequestBody JournalEntity journal) {
        boolean isAdded = journalService.addJournal(journal);
        if (isAdded) {
            return ResponseEntity.ok("Journal added successfully");
        }
        return ResponseEntity.badRequest().body("Journal add failed");
    }

    @DeleteMapping("/delete-journal")
    public ResponseEntity<?> deleteJournal(@RequestHeader("Authorization") String token, @RequestBody JournalEntity journal) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);
        boolean isDeleted = journalService.deleteJournal(username, journal);
        return isDeleted ? ResponseEntity.ok("Journal deleted successfully") :
                ResponseEntity.badRequest().body("Journal delete failed");
    }

    @PostMapping("/like")
    public ResponseEntity<?> likeJournal(@RequestHeader("Authorization") String token, @RequestBody String journalId) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);
        try {
            ObjectId id = new ObjectId(journalId);
            boolean isLiked = journalService.likeJournal(username, id);
            return isLiked ? ResponseEntity.ok("Journal liked successfully") :
                    ResponseEntity.badRequest().body("Failed to like journal");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid journal ID format");
        }
    }

    @PostMapping("/unlike")
    public ResponseEntity<?> unlikeJournal(@RequestHeader("Authorization") String token, @RequestBody String journalId) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);
        try {
            ObjectId id = new ObjectId(journalId);
            boolean isUnliked = journalService.unlikeJournal(username, id);
            return isUnliked ? ResponseEntity.ok("Journal unliked successfully") :
                    ResponseEntity.badRequest().body("Failed to unlike journal");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid journal ID format");
        }
    }

    // Repost a journal
    @PostMapping("/repost")
    public ResponseEntity<String> repostJournal(@RequestParam ObjectId journalId, @RequestParam String username) {
        boolean isReposted = journalService.repostJournal(journalId, username);
        if (isReposted) {
            return ResponseEntity.ok("Journal reposted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to repost journal.");
        }
    }
}
