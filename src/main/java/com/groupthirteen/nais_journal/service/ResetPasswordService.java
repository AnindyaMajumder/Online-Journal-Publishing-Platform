package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.UserEntryRepo;
import com.groupthirteen.nais_journal.model.UserEntity;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.VariableOperators;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class ResetPasswordService {
    private static class PasswordResetToken{
        @Getter
        private String code;
        @Getter
        private LocalDateTime expiryTime;

        public PasswordResetToken(String code, LocalDateTime expiryTime) {
            this.code = code;
            this.expiryTime = expiryTime;
        }
    }

    @Autowired
    UserEntryRepo userEntryRepo;

    @Autowired
    JavaMailSender mailSender;
    PasswordEncoder passwordEncoder;

    private final Map<String, PasswordResetToken> resetTokenStore = new HashMap<>();

    public void generateResetCode(String username) throws MessagingException {

        UserEntity user = userEntryRepo.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        String resetCode = UUID.randomUUID().toString().substring(0,6);
        LocalDateTime expire = LocalDateTime.now().plusMinutes(10);

        resetTokenStore.put(resetCode, new PasswordResetToken(resetCode, expire));

        String subject = "Reset Password Request";
        String body = """
                <p>Dear %s,</p>
                                <p>You have requested to reset your password. Use the following code to reset it:</p>
                                <h3>%s</h3>
                                <p>This code is valid for 10 minutes. If you did not request this, please ignore this email.</p>
                """.formatted(user.getUsername(), resetCode);

        sendEmail(user.getEmail(), subject, body);
    }

    private void sendEmail(String to, String subject, String body) throws MessagingException {
        try {
            MimeMessage mimeMailMessage = mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMailMessage, true);

            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(body, true);

            mailSender.send(mimeMailMessage);
        } catch (MessagingException e) {
            throw new MessagingException("Failed to send email.", e);
        }
    }
    public void resetPassword(String username, String resetCode, String password) throws MessagingException {
        PasswordResetToken token = resetTokenStore.get(username);
        if (token == null || !token.getCode().equals(resetCode)){
            throw new MessagingException("Invalid reset code");
        }
        if (token.getExpiryTime().isBefore(LocalDateTime.now())){
            throw new MessagingException("Expired token");
        }

        UserEntity user = userEntryRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        user.setPassword(passwordEncoder.encode(password));
        userEntryRepo.save(user);

        resetTokenStore.remove(user.getUsername());
    }



}
