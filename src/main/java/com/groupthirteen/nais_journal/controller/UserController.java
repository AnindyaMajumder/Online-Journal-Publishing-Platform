package com.groupthirteen.nais_journal.controller;

import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.model.UserEntity;
import com.groupthirteen.nais_journal.security.JwtUtils;
import com.groupthirteen.nais_journal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/my-info")
    public ResponseEntity<UserEntity> getInfo(@RequestHeader("Authorization") String token) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);

        UserEntity user = userService.userInfo(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("/edit-details")
    public ResponseEntity<?> editDetails(@RequestHeader("Authorization") String token, @RequestBody UserEntity user) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);

        user.setUsername(username);
        boolean isUpdated = userService.updateUser(user);
        if (isUpdated) {
            return ResponseEntity.ok("User updated successfully");
        }
        return ResponseEntity.badRequest().body("User update failed");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestHeader("Authorization") String token, @RequestBody UserEntity user) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);
        user.setUsername(username);
        boolean isDeleted = userService.deleteUser(user);
        if (isDeleted) {
            return ResponseEntity.ok("User deleted successfully");
        } else{
            return ResponseEntity.badRequest().body("User delete failed");
        }
    }

    @GetMapping("/my-posts")
    public ResponseEntity<List<JournalEntity>> getMyPosts(@RequestHeader("Authorization") String token) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);

        Optional<List<JournalEntity>> posts = userService.userPosts(username);
        return posts.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }
    @GetMapping("/liked")
    public ResponseEntity<?> like(@RequestHeader("Authorization") String token) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);

        List<JournalEntity> liked = userService.listJournals(username);
        if (liked.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(liked);
    }
    @GetMapping("reposted")
    public ResponseEntity<?> reposted(@RequestHeader("Authorization") String token) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);

        List<JournalEntity> reposted = userService.listJournals(username);
        if (reposted.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(reposted);
        }
    }
}
