package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.Repository.UserEntryRepo;
import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.model.UserEntity;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JournalService {
    private static final Logger logger = LoggerFactory.getLogger(JournalService.class);

    @Autowired
    private JournalRepo journalRepo;

    @Autowired
    private UserEntryRepo userEntryRepo;

    @Autowired
    private UserService userService;

    public boolean updateJournal(String username, JournalEntity journal) {
        try {
            Optional<JournalEntity> journalEntityOpt = journalRepo.findById(journal.getId());

            if (journalEntityOpt.isPresent()) {
                JournalEntity existingJournal = journalEntityOpt.get();
                UserEntity user = userEntryRepo.findByUsername(username);

                if (user != null) {
                    boolean isJournalOwnedByUser = user.getJournalEntries().stream()
                            .anyMatch(j -> j.getId().equals(existingJournal.getId()));

                    if (isJournalOwnedByUser) {
                        if (!journal.getTitle().isBlank()) {
                            existingJournal.setTitle(journal.getTitle());
                        }
                        if (!journal.getBody().isBlank()) {
                            existingJournal.setBody(journal.getBody());
                        }
                        if (!journal.getTags().isEmpty()) {
                            existingJournal.setTags(journal.getTags());
                        }
                        existingJournal.setUpdatedDate(LocalDateTime.now());

                        journalRepo.save(existingJournal);
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (Exception e) {
            logger.error("Error updating journal: {}", e.getMessage(), e);
            return false;
        }
    }

    public boolean addJournal(JournalEntity journal, String username) {
        try {
            JournalEntity journalEntity = new JournalEntity();
            journalEntity.setTitle(journal.getTitle());
            journalEntity.setBody(journal.getBody());
            journalEntity.setAuthor(username);
            journalEntity.setTags(journal.getTags());
            journalEntity.setPublishedDate(LocalDateTime.now());
            journalEntity.setLikeCount(0);

            journalRepo.save(journalEntity);

            return userService.addJournals(journalEntity);
        } catch (Exception e) {
            logger.error("Error adding journal: {}", e.getMessage(), e);
            return false;
        }
    }

    public boolean deleteJournal(String username, ObjectId journalId) {
        try {
            Optional<JournalEntity> journalEntityOptional = journalRepo.findById(journalId);
            if (journalEntityOptional.isEmpty()) {
                return false;
            }

            JournalEntity journalEntity = journalEntityOptional.get();
            UserEntity owner = userEntryRepo.findByUsername(username);
            if (owner == null ||
                    owner.getJournalEntries().stream().noneMatch(j -> j.getId().equals(journalId))) {
                return false;
            }

            owner.getJournalEntries().removeIf(j -> j.getId().equals(journalId));
            userEntryRepo.save(owner);

            List<UserEntity> allUsers = userEntryRepo.findAll();
            for (UserEntity user : allUsers) {
                boolean updated = false;

                if (user.getLikedJournals().removeIf(j -> j.getId().equals(journalId))) {
                    updated = true;
                }

                if (user.getSavedJournals().removeIf(j -> j.getId().equals(journalId))) {
                    updated = true;
                }
                if (updated) {
                    userEntryRepo.save(user);
                }
            }

            journalRepo.delete(journalEntity);

            return true;
        } catch (Exception e) {
            logger.error("Error deleting journal: {}", e.getMessage(), e);
            return false;
        }
    }

    public boolean likeJournal(String username, ObjectId journalId) {
        try {
            Optional<JournalEntity> journalEntity = journalRepo.findById(journalId);
            if (journalEntity.isPresent()) {
                UserEntity user = userEntryRepo.findByUsername(username);
                if (user.getLikedJournals().stream().noneMatch(j -> j.getId().equals(journalId))) {
                    JournalEntity journal = journalEntity.get();
                    journal.setLikeCount(journal.getLikeCount() + 1);
                    user.getLikedJournals().add(journal);
                    userEntryRepo.save(user);
                    journalRepo.save(journal);
                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            logger.error("Error liking journal: {}", e.getMessage(), e);
            return false;
        }
    }

    public boolean unlikeJournal(String username, ObjectId journalId) {
        try {
            Optional<JournalEntity> journalEntity = journalRepo.findById(journalId);
            if (journalEntity.isPresent()) {
                UserEntity user = userEntryRepo.findByUsername(username);
                if (user.getLikedJournals().stream().anyMatch(j -> j.getId().equals(journalId))) {
                    JournalEntity journal = journalEntity.get();
                    journal.setLikeCount(journal.getLikeCount() - 1);
                    user.getLikedJournals().removeIf(j -> j.getId().equals(journalId));
                    userEntryRepo.save(user);
                    journalRepo.save(journal);
                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            logger.error("Error unliking journal: {}", e.getMessage(), e);
            return false;
        }
    }

    public boolean savedJournal(ObjectId journalId, String username) {
        try {
            Optional<JournalEntity> journalEntityOpt = journalRepo.findById(journalId);
            UserEntity user = userEntryRepo.findByUsername(username);

            if (journalEntityOpt.isPresent() && user != null) {
                JournalEntity journal = journalEntityOpt.get();
                if (user.getSavedJournals().contains(journal)) {
                    return false;
                }

                user.getSavedJournals().add(journal);

                userEntryRepo.save(user);

                return true;
            }

            return false;
        } catch (Exception e) {
            logger.error("Error saving journal: {}", e.getMessage(), e);
            return false;
        }
    }
}