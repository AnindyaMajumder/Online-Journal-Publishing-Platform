package com.groupthirteen.nais_journal.controller;

import com.groupthirteen.nais_journal.model.UserEntity;
import com.groupthirteen.nais_journal.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserEntity user){
        boolean isRegistered = authService.addUser(user);
        if(isRegistered){
            return ResponseEntity.ok("User registered successfully");
        }
        else {
            return ResponseEntity.badRequest().body("User already exists");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserEntity user){
        String token = authService.authenticate(user);
        if(!token.isBlank()){
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.badRequest().body("Invalid username or password");
    }

//    @PutMapping("/forget-pass")
//    public ResponseEntity<?> forgetPass(@RequestBody UserEntity user){
//
//    }
}
