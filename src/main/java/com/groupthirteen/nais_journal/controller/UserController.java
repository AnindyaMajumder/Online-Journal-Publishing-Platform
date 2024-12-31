package com.groupthirteen.nais_journal.controller;

import com.groupthirteen.nais_journal.model.UserEntity;
import com.groupthirteen.nais_journal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PutMapping("/edit-details")
    public ResponseEntity<?> editDetails(@RequestBody UserEntity user) {
        boolean isUpdated = userService.updateUser(user);
        if (isUpdated) {
            return ResponseEntity.ok("User updated successfully");
        }
        return ResponseEntity.badRequest().body("User update failed");
    }
}
