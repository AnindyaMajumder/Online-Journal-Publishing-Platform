package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.Repository.UserEntryRepo;
import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.model.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JournalService {
    @Autowired
    private JournalRepo journalRepo;

    @Autowired
    private UserEntryRepo userEntryRepo;

    @Autowired
    private UserService userService;

    public boolean updateJournal(String username, JournalEntity journal) {
        try {
            // Fetch the journal by ID
            Optional<JournalEntity> journalEntityOpt = journalRepo.findById(journal.getId());

            if (journalEntityOpt.isPresent()) {
                JournalEntity existingJournal = journalEntityOpt.get();

                // Fetch the user by username
                UserEntity user = userEntryRepo.findByUsername(username);

                if (user != null) {
                    // Ensure the journal exists in the user's journal list
                    boolean isJournalOwnedByUser = user.getJournalEntries().stream()
                            .anyMatch(j -> j.getId().equals(existingJournal.getId()));

                    if (isJournalOwnedByUser) {
                        if(!journal.getTitle().isBlank()) {
                            existingJournal.setTitle(journal.getTitle());
                        }
                        if(!journal.getBody().isBlank()) {
                            existingJournal.setBody(journal.getBody());
                        }
                        if (!journal.getTags().isEmpty()) {
                            existingJournal.setTags(journal.getTags());
                        }
                        existingJournal.setUpdatedDate(LocalDateTime.now());

                        journalRepo.save(existingJournal);
                        return true;
                    } else {
                        return false; // Journal not in the user's list
                    }
                } else {
                    return false; // User not found
                }
            } else {
                return false; // Journal not found
            }
        } catch (Exception e) {
            return false; // Exception occurred
        }
    }

    public boolean addJournal(JournalEntity journal) {
        try {
            // Create a new JournalEntity and populate fields
            JournalEntity journalEntity = new JournalEntity();
            journalEntity.setTitle(journal.getTitle());
            journalEntity.setBody(journal.getBody());
            journalEntity.setAuthor(journal.getAuthor());
            journalEntity.setTags(journal.getTags());
            journalEntity.setPublishedDate(LocalDateTime.now());
            journalEntity.setLikeCount(0); // Initialize like count to 0

            // Save the journal to the database
            journalRepo.save(journalEntity);

            // Return the result of adding to the user's list
            return userService.addJournals(journalEntity);
        } catch (Exception e) {
            // Log the exception for debugging purposes
//            e.printStackTrace();
            return false;
        }
    }

    public boolean deleteJournal(String username, ObjectId journal) {
        try {
            Optional<JournalEntity> journalEntity = journalRepo.findById(journal);
            if (journalEntity.isPresent()) {
                UserEntity user = userEntryRepo.findByUsername(username);
                if (user.getLikedJournals().stream().anyMatch(j -> j.getId().equals(journal))) {
                    journalRepo.delete(journalEntity.get());
                    user.getLikedJournals().removeIf(j -> j.getId().equals(journal));
                    userEntryRepo.save(user); // Save updated user
                    return true;
                }
            }
            return false; // Journal not found or not liked by user
        } catch (Exception e) {
            System.err.println("Error deleting journal: " + e.getMessage());
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
            return false; // Journal not found or already liked by user
        } catch (Exception e) {
            System.err.println("Error liking journal: " + e.getMessage());
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
            return false; // Journal not found or not liked by user
        } catch (Exception e) {
            System.err.println("Error unliking journal: " + e.getMessage());
            return false;
        }
    }

    // Repost a journal
    public boolean repostJournal(ObjectId journalId, String username) {
        try {
            Optional<JournalEntity> journalEntityOpt = journalRepo.findById(journalId);
            UserEntity user = userEntryRepo.findByUsername(username);

            if (journalEntityOpt.isPresent() && user != null) {
                JournalEntity journal = journalEntityOpt.get();
                if (user.getRepostedJournals().contains(journal)) {
                    return false; // Already reposted
                }

                user.getRepostedJournals().add(journal);

                userEntryRepo.save(user);

                return true; // Successfully reposted
            }

            // Return false if either the journal or user is not found
            return false;
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();

            // Return false in case of any exceptions
            return false;
        }
    }

}


