package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.Repository.UserEntryRepo;
import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserService {
    @Autowired
    private UserEntryRepo userEntryRepo;

    @Autowired
    private JournalRepo journalRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean updateUser(UserEntity user) {
        UserEntity userEntity = userEntryRepo.findByUsername(user.getUsername());
        if(userEntity == null) {
            return false;
        }
        else {
            try {
                if (passwordEncoder.matches(user.getPassword(), userEntity.getPassword())){

                    if (user.getFirstName() != null) userEntity.setFirstName(user.getFirstName());
                    if (user.getLastName() != null) userEntity.setLastName(user.getLastName());
                    if (user.getBio() != null) userEntity.setBio(user.getBio());

                    userEntity.setEmail(user.getEmail());

                    userEntryRepo.save(userEntity);
                    return true;
                } else {
                    return false;
                }
            }
            catch(Exception e) {
                return false;
            }
        }
    }

    public boolean deleteUser(UserEntity user) {
        UserEntity userEntity = userEntryRepo.findByUsername(user.getUsername());
        if(userEntity == null) {
            return false;
        }else {
            if(passwordEncoder.matches(user.getPassword(), userEntity.getPassword())) {
                List<JournalEntity> journalEntities = userEntity.getJournalEntries();
                if(journalEntities != null) {
                    journalRepo.deleteAll(journalEntities);
                }
                userEntryRepo.delete(userEntity);
                return true;
            } else {
                return false;
            }

        }
    }


    // Journals Section
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
            return false;
        }
    }
}
