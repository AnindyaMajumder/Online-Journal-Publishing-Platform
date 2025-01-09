package com.groupthirteen.nais_journal.controller;

import com.groupthirteen.nais_journal.model.AnnouncementEntity;
import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.model.UserEntity;
import com.groupthirteen.nais_journal.security.JwtUtils;
import com.groupthirteen.nais_journal.service.AdminService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/users")
    public ResponseEntity<List<UserEntity>> getAllUsers(@RequestHeader("Authorization") String token) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String admin_username = jwtUtils.getUsername(jwtToken);

        List<UserEntity> users = adminService.users(admin_username);
        if (users == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("/journals")
    public ResponseEntity<List<JournalEntity>> getAllJournals(@RequestHeader("Authorization") String token) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String admin_username = jwtUtils.getUsername(jwtToken);
        List<JournalEntity> journals = adminService.journals(admin_username);
        if (journals == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(journals);
    }

    @PostMapping("/remove-user")
    public ResponseEntity<String> removeUser(@RequestHeader("Authorization") String token, @RequestBody String username) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String admin_username = jwtUtils.getUsername(jwtToken);
        boolean isDeleted = adminService.DeleteUser(admin_username, username);

        if (isDeleted) {
            return ResponseEntity.ok("User deleted successfully");
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("remove-journal")
    public ResponseEntity<String> removeJournal(@RequestHeader("Authorization") String token, @RequestBody String journalID) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String admin_username = jwtUtils.getUsername(jwtToken);
        boolean isDeleted = adminService.DeleteJournal(admin_username, new ObjectId(journalID));
        if (isDeleted) {
            return ResponseEntity.ok("Journal deleted successfully");
        } else{
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/announcements")
    public ResponseEntity<List<AnnouncementEntity>> getAllAnnouncements(@RequestHeader("Authorization") String token) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String admin_username = jwtUtils.getUsername(jwtToken);
        List<AnnouncementEntity> announcements = adminService.announcements(admin_username);
        if (announcements == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(announcements);
    }
    @PostMapping("/add-announcement")
    public ResponseEntity<String> addAnnouncement(@RequestHeader("Authorization") String token, @RequestBody AnnouncementEntity announcement) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String admin_username = jwtUtils.getUsername(jwtToken);
        boolean isAdded = adminService.addAnnouncement(admin_username, announcement);
        if (isAdded) {
            return ResponseEntity.ok("Announcement added successfully");
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    @PutMapping("/edit-announcement")
    public ResponseEntity<String> editAnnouncement(@RequestHeader("Authorization") String token, @RequestBody AnnouncementEntity announcement) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String admin_username = jwtUtils.getUsername(jwtToken);
        boolean isEdited = adminService.editAnnouncement(admin_username, announcement);
        if (isEdited) {
            return ResponseEntity.ok("Announcement edited successfully");
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    @DeleteMapping("/remove-announcement")
    public ResponseEntity<String> removeAnnouncement(@RequestHeader("Authorization") String token, @RequestBody String announcementID) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String admin_username = jwtUtils.getUsername(jwtToken);
        boolean isDeleted = adminService.deleteAnnouncement(admin_username, new ObjectId(announcementID));
        if (isDeleted) {
            return ResponseEntity.ok("Announcement deleted successfully");
        } else {
            return ResponseEntity.noContent().build();
        }
    }
}