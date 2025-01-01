package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.Repository.UserEntryRepo;
import com.groupthirteen.nais_journal.model.JournalEntity;
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

    public boolean likeJournal(ObjectId journalId) {
        try {
            Optional<JournalEntity> journalEntity = journalRepo.findById(journalId);

            if (journalEntity.isPresent()) {
                JournalEntity journal = journalEntity.get();
                journal.setLikeCount(journal.getLikeCount() + 1); // Increment like count
                journalRepo.save(journal); // Save updated journal
                System.out.println("Like added successfully to journal with ID: " + journalId); // Debug log
                return true;
            }

            System.out.println("Journal not found with ID: " + journalId); // Debug log
            return false;
        } catch (Exception e) {
//            e.printStackTrace(); // Log the exception for debugging
            return false;
        }
    }



}


