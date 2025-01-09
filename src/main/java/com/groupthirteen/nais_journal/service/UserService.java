package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.Repository.UserEntryRepo;
import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserEntryRepo userEntryRepo;

    @Autowired
    private JournalRepo journalRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserEntity userInfo(String username) {
        try {
            logger.info("Fetching user information for username: {}", username);
            return userEntryRepo.findByUsername(username);
        } catch (Exception e) {
            logger.error("Error while fetching user information for username: {}", username, e);
            return null;
        }
    }

    public Optional<List<JournalEntity>> userPosts(String username) {
        try {
            logger.info("Fetching user posts for username: {}", username);
            return Optional.ofNullable(userEntryRepo.findByUsername(username).getJournalEntries());
        } catch (Exception e) {
            logger.error("Error while fetching user posts for username: {}", username, e);
            return Optional.empty();
        }
    }

    public boolean updateUser(UserEntity user) {
        UserEntity userEntity = userEntryRepo.findByUsername(user.getUsername());
        if (userEntity == null) {
            logger.warn("User not found for update: {}", user.getUsername());
            return false;
        } else {
            try {
                logger.info("Updating user: {}", user.getUsername());

                if (user.getFirstName() != null) userEntity.setFirstName(user.getFirstName());
                if (user.getLastName() != null) userEntity.setLastName(user.getLastName());
                if (user.getBio() != null) userEntity.setBio(user.getBio());
                if (user.getPassword() != null) userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
                if (user.getEmail() != null) userEntity.setEmail(user.getEmail());

                userEntryRepo.save(userEntity);
                return true;
            } catch (Exception e) {
                logger.error("Error while updating user: {}", user.getUsername(), e);
                return false;
            }
        }
    }

    public boolean deleteUser(UserEntity user) {
        UserEntity userEntity = userEntryRepo.findByUsername(user.getUsername());
        if (userEntity == null) {
            logger.warn("User not found for deletion: {}", user.getUsername());
            return false;
        } else {
            if (passwordEncoder.matches(user.getPassword(), userEntity.getPassword())) {
                try {
                    logger.info("Deleting user: {}", user.getUsername());
                    List<JournalEntity> journalEntities = userEntity.getJournalEntries();
                    if (journalEntities != null) {
                        for (JournalEntity journalEntity : journalEntities) {
                            journalRepo.deleteById(journalEntity.getId());
                        }
                    }
                    userEntryRepo.delete(userEntity);
                    return true;
                } catch (Exception e) {
                    logger.error("Error while deleting user: {}", user.getUsername(), e);
                    return false;
                }
            } else {
                logger.warn("Password mismatch for user deletion: {}", user.getUsername());
                return false;
            }
        }
    }

    public boolean addJournals(JournalEntity journal) {
        try {
            logger.info("Adding journal for user: {}", journal.getAuthor());
            UserEntity userEntity = userEntryRepo.findByUsername(journal.getAuthor());
            List<JournalEntity> journals = userEntity.getJournalEntries();
            if (journals == null) {
                journals = new ArrayList<>();
            }
            journals.add(journal);
            userEntity.setJournalEntries(journals);
            userEntryRepo.save(userEntity);

            return true;
        } catch (Exception e) {
            logger.error("Error while adding journal for user: {}", journal.getAuthor(), e);
            return false;
        }
    }

    public boolean removeJournalFromUser(JournalEntity journal) {
        try {
            logger.info("Removing journal with ID: {} for user: {}", journal.getId(), journal.getAuthor());
            UserEntity userEntity = userEntryRepo.findByUsername(journal.getAuthor());

            if (userEntity != null) {
                List<JournalEntity> journals = userEntity.getJournalEntries();

                if (journals != null && journals.removeIf(j -> j.getId().equals(journal.getId()))) {
                    userEntryRepo.save(userEntity);
                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            logger.error("Error while removing journal with ID: {} for user: {}", journal.getId(), journal.getAuthor(), e);
            return false;
        }
    }

    public List<JournalEntity> listJournals(String username) {
        try {
            logger.info("Listing journals for user: {}", username);
            UserEntity userEntity = userEntryRepo.findByUsername(username);
            if (userEntity == null) {
                return null;
            } else {
                return userEntity.getLikedJournals();
            }
        } catch (Exception e) {
            logger.error("Error while listing journals for user: {}", username, e);
            return null;
        }
    }

    public List<JournalEntity> savedJournals(String username) {
        try {
            logger.info("Fetching saved journals for user: {}", username);
            UserEntity userEntity = userEntryRepo.findByUsername(username);
            if (userEntity == null) {
                return null;
            } else {
                return userEntity.getSavedJournals();
            }
        } catch (Exception e) {
            logger.error("Error while fetching saved journals for user: {}", username, e);
            return null;
        }
    }
}
