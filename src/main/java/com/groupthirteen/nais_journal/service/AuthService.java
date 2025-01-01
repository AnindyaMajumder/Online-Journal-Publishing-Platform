package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.UserEntryRepo;
import com.groupthirteen.nais_journal.model.UserEntity;
import com.groupthirteen.nais_journal.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserEntryRepo userEntryRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;

//    public AuthService(UserEntryRepo userEntryRepo, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
//        this.userEntryRepo = userEntryRepo;
//        this.passwordEncoder = passwordEncoder;
//        this.authenticationManager = authenticationManager;
//        this.jwtUtils = jwtUtils;
//    }

    public boolean addUser(UserEntity user) {
        if(userEntryRepo.findByUsername(user.getUsername()) != null) {
            return false;
        }
        else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userEntryRepo.save(user);

            return true;
        }
    }

    public String authenticate(UserEntity user) throws AuthenticationException {

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            return jwtUtils.generateToken(authentication.getName());
    }
}
