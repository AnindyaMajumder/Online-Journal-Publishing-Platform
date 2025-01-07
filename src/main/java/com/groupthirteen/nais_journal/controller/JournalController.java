package com.groupthirteen.nais_journal.controller;

import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.security.JwtUtils;
import com.groupthirteen.nais_journal.service.JournalService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/journal")
public class JournalController {
    @Autowired
    private JournalService journalService;

    @Autowired
    private JwtUtils jwtUtils;

    @PutMapping("/edit-details")
    public ResponseEntity<?> editDetails(@RequestHeader("Authorization") String token, @RequestBody JournalEntity journal) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);
        boolean isUpdated = journalService.updateJournal(username, journal);
        return isUpdated ? ResponseEntity.ok("Journal updated successfully") :
                ResponseEntity.badRequest().body("Journal update failed");
    }

    @PostMapping("/add-journal")
    public ResponseEntity<?> addJournal(@RequestHeader("Authorization") String token, @RequestBody JournalEntity journal) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);
        boolean isAdded = journalService.addJournal(journal, username);
        if (isAdded) {
            return ResponseEntity.ok("Journal added successfully");
        }
        return ResponseEntity.badRequest().body("Journal add failed");
    }

    @DeleteMapping("/delete-journal")
    public ResponseEntity<?> deleteJournal(@RequestHeader("Authorization") String token, @RequestBody String journal) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);
        boolean isDeleted = journalService.deleteJournal(username, new ObjectId(journal));
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

    @PostMapping("/save-journal")
    public ResponseEntity<String> savedJournal(@RequestHeader("Authorization") String token, @RequestBody String journalId) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);
        boolean isReposted = journalService.savedJournal(new ObjectId(journalId), username);
        if (isReposted) {
            return ResponseEntity.ok("Journal saved successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to repost journal.");
        }
    }
}
