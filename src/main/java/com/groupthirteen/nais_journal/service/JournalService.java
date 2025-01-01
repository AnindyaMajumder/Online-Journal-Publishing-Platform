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
                        existingJournal.setTitle(journal.getTitle());
                        existingJournal.setBody(journal.getBody());
                        existingJournal.setTags(journal.getTags());
                        existingJournal.setUpdatedDate(LocalDateTime.now());

                        journalRepo.save(existingJournal);
                        return true; // Successfully updated
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

    public List<JournalEntity> getAllJournals() {
        try {
            // Fetch all journal entries from the repository
            return journalRepo.findAll();
        } catch (Exception e) {
            // Log exception for debugging (if necessary) and return an empty list
            return new ArrayList<>();
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

    // Get popular posts (most liked posts in descending order of likeCount)
    public List<JournalEntity> getPopularPosts() {
        return journalRepo.findAll(Sort.by(Sort.Direction.DESC, "likeCount"));
    }

    // Get recent posts (sorted by publishedDate in descending order)
    public List<JournalEntity> getRecentPosts() {
        return journalRepo.findAll(Sort.by(Sort.Direction.DESC, "publishedDate"));
    }

    // Search journals by title (case-insensitive partial search)
    public List<JournalEntity> searchJournalsByTitle(String query) {
        return journalRepo.findByTitleRegex("(?i).*" + query + ".*");
    }

}


