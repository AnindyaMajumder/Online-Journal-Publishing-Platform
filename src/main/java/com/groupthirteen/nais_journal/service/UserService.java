package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.UserEntryRepo;
import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserEntryRepo userEntryRepo;

    public boolean updateUser(UserEntity user) {
        UserEntity userEntity = userEntryRepo.findByUsername(user.getUsername());
        if(userEntity == null) {
            return false;
        }
        else {
            try {
                userEntity.setFirstName(user.getFirstName());
                userEntity.setLastName(user.getLastName());
                userEntity.setBio(user.getBio());
                userEntity.setEmail(user.getEmail());

                userEntryRepo.save(userEntity);

                return true;
            }
            catch(Exception e) {
                return false;
            }
        }
    }
    public boolean addJournals(JournalEntity journal) {
        try{
            UserEntity userEntity = userEntryRepo.findByUsername(journal.getAuthor());
            List<JournalEntity> journals = userEntity.getJournalEntries();
            if (journals == null) {
                journals = new ArrayList<JournalEntity>();
            }
            journals.add(journal);
            userEntity.setJournalEntries(journals);
            userEntryRepo.save(userEntity);

            return true;
        } catch(Exception e) {
            return false;
        }
    }

    public boolean removeJournalFromUser(JournalEntity journal) {
        try {
            // Find the user by the journal's author
            UserEntity userEntity = userEntryRepo.findByUsername(journal.getAuthor());

            if (userEntity != null) {
                // Get the user's journal entries
                List<JournalEntity> journals = userEntity.getJournalEntries();

                // Remove the specific journal
                if (journals != null && journals.removeIf(j -> j.getId().equals(journal.getId()))) {
                    // Save the updated user entity
                    userEntryRepo.save(userEntity);
                    return true;
                }
            }
            return false; // Return false if the user or journal list was not found
        } catch (Exception e) {
            return false; // Handle any exceptions
        }
    }



}
