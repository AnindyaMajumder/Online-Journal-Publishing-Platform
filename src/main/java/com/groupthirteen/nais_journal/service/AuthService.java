package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.UserEntryRepo;
import com.groupthirteen.nais_journal.model.UserEntity;
import com.groupthirteen.nais_journal.security.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserEntryRepo userEntryRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    public boolean addUser(UserEntity user) {
        logger.info("Attempting to add user: {}", user.getUsername());
        if (userEntryRepo.findByUsername(user.getUsername()) != null) {
            logger.warn("User already exists: {}", user.getUsername());
            return false;
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userEntryRepo.save(user);
            logger.info("User added successfully: {}", user.getUsername());
            return true;
        }
    }

    public String authenticate(UserEntity user) throws AuthenticationException {
        try {
            logger.info("Authenticating user: {}", user.getUsername());
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );
            String token = jwtUtils.generateToken(authentication.getName());
            logger.info("Authentication successful for user: {}", user.getUsername());
            return token;
        } catch (AuthenticationException e) {
            logger.error("Authentication failed for user: {}", user.getUsername(), e);
            throw e;
        }
    }
}