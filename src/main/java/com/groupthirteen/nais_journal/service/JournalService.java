package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.Repository.UserEntryRepo;
import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.model.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class JournalService {
    @Autowired
    private JournalRepo journalRepo;

    @Autowired
    private UserEntryRepo userEntryRepo;

    @Autowired
    private UserService userService;

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
                        // Update the journal
                        existingJournal.setTitle(journal.getTitle());
                        existingJournal.setBody(journal.getBody());
                        existingJournal.setTags(journal.getTags());
                        existingJournal.setUpdatedDate(LocalDateTime.now());

                        // Save the updated journal
                        journalRepo.save(existingJournal);
                        return true; // Successfully updated
                    } else {
                        System.err.println("Journal is not in the user's journal list.");
                        return false; // Journal not in the user's list
                    }
                } else {
                    System.err.println("User not found with username: " + username);
                    return false; // User not found
                }
            } else {
                System.err.println("Journal not found with ID: " + journal.getId());
                return false; // Journal not found
            }
        } catch (Exception e) {
            System.err.println("Error updating journal: " + e.getMessage());
            return false; // Exception occurred
        }
    }


    public boolean deleteJournal(String username, JournalEntity journal) {
        try {
            Optional<JournalEntity> journalEntity = journalRepo.findById(journal.getId());
            if (journalEntity.isPresent()) {
                UserEntity user = userEntryRepo.findByUsername(username);
                if (user.getLikedJournals().stream().anyMatch(j -> j.getId().equals(journal.getId()))) {
                    journalRepo.delete(journalEntity.get());
                    user.getLikedJournals().removeIf(j -> j.getId().equals(journal.getId()));
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
}
