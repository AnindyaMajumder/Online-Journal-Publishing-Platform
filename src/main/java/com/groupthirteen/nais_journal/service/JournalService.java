package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.Repository.UserEntryRepo;
import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.model.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
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

    public boolean updateJournal(JournalEntity journal) {

        Optional<JournalEntity> journalEntity = journalRepo.findById(journal.getId());
        try {
            journalEntity.get().setTitle(journal.getTitle());
            journalEntity.get().setBody(journal.getBody());
            journalEntity.get().setTags(journal.getTags());
            journalEntity.get().setUpdatedDate(LocalDateTime.now());

            journalRepo.save(journalEntity.get());

            return true;

        } catch (Exception e) {
            return false;
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


    public boolean deleteJournal(JournalEntity journal) {
        try {
            // Find the journal entity by its ID
            Optional<JournalEntity> journalEntity = journalRepo.findById(journal.getId());

            if (journalEntity.isPresent()) {
                // Remove the journal from the user's journal list
                boolean isRemovedFromUser = userService.removeJournalFromUser(journalEntity.get());

                // If successful, delete the journal entity from the repository
                if (isRemovedFromUser) {
                    journalRepo.delete(journalEntity.get());
                    return true; // Return true if deletion was successful
                } else {
                    return false; // Return false if it could not be removed from the user's journal list
                }
            } else {
                return false; // Return false if the journal was not found
            }
        } catch (Exception e) {
            // Handle any exceptions during deletion
            return false;
        }
    }

    public List<JournalEntity> getAllJournals() {
        try {
            // Fetch all journal entries from the repository
            return journalRepo.findAll();
        } catch (Exception e) {
            // Log exception for debugging (if necessary) and return an empty list
            return new ArrayList<>();
        }
    }


    public boolean likeJournal(ObjectId journalId, String username) {
        try {
            // Retrieve journal and user entities
            Optional<JournalEntity> journalEntityOpt = journalRepo.findById(journalId);
            UserEntity user = userEntryRepo.findByUsername(username);

            if (journalEntityOpt.isPresent() && user != null) {
                JournalEntity journal = journalEntityOpt.get();

                // Check if the user has already liked the journal
                if (user.getLikedJournals().contains(journal)) {
                    return false; // User already liked this journal
                }

                // Increment like count and update user's liked journals
                journal.setLikeCount(journal.getLikeCount() + 1);
                user.getLikedJournals().add(journal);

                // Save changes to database
                journalRepo.save(journal);
                userEntryRepo.save(user);

                return true;
            }

            return false; // Journal or user not found
        } catch (Exception e) {
            return false;
        }
    }

    public boolean unlikeJournal(ObjectId journalId, String username) {
        try {
            // Retrieve journal and user entities
            Optional<JournalEntity> journalEntityOpt = journalRepo.findById(journalId);
            UserEntity user = userEntryRepo.findByUsername(username);

            if (journalEntityOpt.isPresent() && user != null) {
                JournalEntity journal = journalEntityOpt.get();

                // Check if the user has not liked the journal
                if (!user.getLikedJournals().contains(journal)) {
                    return false; // Journal was not liked by this user
                }

                // Decrement like count and update user's liked journals
                journal.setLikeCount(journal.getLikeCount() - 1);
                user.getLikedJournals().remove(journal);

                // Save changes to database
                journalRepo.save(journal);
                userEntryRepo.save(user);

                return true;
            }

            return false; // Journal or user not found
        } catch (Exception e) {
            return false;
        }
    }

    public List<JournalEntity> getLikedJournals(String username) {
        try {
            // Find the user entity by username
            UserEntity user = userEntryRepo.findByUsername(username);

            if (user != null && !user.getLikedJournals().isEmpty()) {
                // Fetch all liked journal IDs and retrieve corresponding journals
                List<JournalEntity> likedJournalIds = user.getLikedJournals();
                return journalRepo.findAllById(likedJournalIds);
            }

            return new ArrayList<>(); // Return empty list if user or liked journals not found
        } catch (Exception e) {
            // Log the exception if needed and return an empty list
            return new ArrayList<>();
        }
    }

    // Repost a journal
    public boolean repostJournal(ObjectId journalId, String username) {
        try {
            Optional<JournalEntity> journalEntityOpt = journalRepo.findById(journalId);
            UserEntity user = userEntryRepo.findByUsername(username);

            if (journalEntityOpt.isPresent() && user != null) {
                if (user.getRepostedJournals().contains(journalId)) {
                    return false; // Already reposted
                }

                // Add journal to user's repost list
                user.getRepostedJournals().add(journalId);
                userEntryRepo.save(user);

                return true;
            }

            return false; // Journal or user not found
        } catch (Exception e) {
            return false;
        }
    }

    // Get reposted journals
    public List<JournalEntity> getRepostedJournals(String username) {
        try {
            UserEntity user = userEntryRepo.findByUsername(username);

            if (user != null && !user.getRepostedJournals().isEmpty()) {
                List<ObjectId> repostedJournalIds = user.getRepostedJournals();
                return journalRepo.findAllById(repostedJournalIds);
            }

            return new ArrayList<>(); // Return empty list if none found
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }



}


