package com.groupthirteen.nais_journal.controller;

import com.groupthirteen.nais_journal.model.UserEntity;
import com.groupthirteen.nais_journal.security.JwtUtils;
import com.groupthirteen.nais_journal.service.AuthService;
import com.groupthirteen.nais_journal.service.ResetPasswordService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private ResetPasswordService resetPasswordService;
    @Autowired
    private JwtUtils jwtUtils;

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

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest req){
        String authHeader = req.getHeader("Authorization");

        if(authHeader != null && authHeader.startsWith("Bearer ")){
            String token = authHeader.substring(7);
            jwtUtils.blacklistToken(token);

            return ResponseEntity.ok("User logged out successfully");
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }

    @PostMapping("/forget-password")
    public ResponseEntity<?> forgetPassword(@RequestBody Map<String, String> req){
        String username = req.get("username");
        try {
            resetPasswordService.generateResetCode(username);
            return ResponseEntity.ok("Reset password successfully");
        } catch (MessagingException e) {
            return ResponseEntity.unprocessableEntity().body(e.getMessage());
        }
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody UserEntity user){
        String username = user.getUsername();
        String resetCode = user.getResetCode();
        String password = user.getPassword();

        try {
            resetPasswordService.resetPassword(username, resetCode, password);
            return ResponseEntity.ok("Reset password successfully");
        } catch (MessagingException e) {
            return ResponseEntity.unprocessableEntity().body(e.getMessage());
        }
    }

}
