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

    @GetMapping("/timeline")
    public ResponseEntity<?> getAllJournals() {
        try {
            // Fetch all journals from the service
            List<JournalEntity> journals = journalService.getAllJournals();

            // Check if the list is not empty
            if (!journals.isEmpty()) {
                return ResponseEntity.ok(journals);
            } else {
                return ResponseEntity.ok("No journals found");
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred while fetching journals");
        }
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

    // Will get all the journal User liked
    @GetMapping("/liked")
    public ResponseEntity<?> getLikedJournals(@RequestHeader("Authorization") String token) {
        try {
            // Extract username from the JWT token
            String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
            String username = jwtUtils.getUsername(jwtToken);

            // Fetch liked journals using the service
            List<JournalEntity> likedJournals = journalService.getLikedJournals(username);

            if (!likedJournals.isEmpty()) {
                return ResponseEntity.ok(likedJournals);
            } else {
                return ResponseEntity.ok("No liked journals found for the user");
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred while fetching liked journals");
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

    // Get all reposted journals for a user
    @GetMapping("/reposted")
    public ResponseEntity<List<JournalEntity>> getRepostedJournals(@RequestParam String username) {
        List<JournalEntity> repostedJournals = journalService.getRepostedJournals(username);
        return ResponseEntity.ok(repostedJournals);
    }

    // Popular posts (most liked posts in descending order of likeCount)
    @GetMapping("/popular")
    public ResponseEntity<List<JournalEntity>> getPopularPosts() {
        List<JournalEntity> popularPosts = journalService.getPopularPosts();
        return ResponseEntity.ok(popularPosts);
    }

    // Recent posts (sorted by publishedDate in descending order)
    @GetMapping("/recent")
    public ResponseEntity<List<JournalEntity>> getRecentPosts() {
        List<JournalEntity> recentPosts = journalService.getRecentPosts();
        return ResponseEntity.ok(recentPosts);
    }

    // Search journals by title (supports partial word search)
    @GetMapping("/search")
    public ResponseEntity<List<JournalEntity>> searchJournalsByTitle(@RequestParam String query) {
        List<JournalEntity> searchResults = journalService.searchJournalsByTitle(query);
        return ResponseEntity.ok(searchResults);
    }

}
