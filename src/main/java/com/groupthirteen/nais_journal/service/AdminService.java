package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.AnnouncementRepo;
import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.Repository.UserEntryRepo;
import com.groupthirteen.nais_journal.model.AnnouncementEntity;
import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.model.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private UserEntryRepo userEntryRepo;

    @Autowired
    private JournalRepo journalRepo;

    @Autowired
    private AnnouncementRepo announcementRepo;

    public List<UserEntity> users(String username){
        UserEntity admin = userEntryRepo.findByUsername(username);
        if(admin == null || admin.getROLE().equals("USER")){
            return null;
        }
        else {
            return userEntryRepo.findAll();
        }
    }

    public List<JournalEntity> journals(String username){
        UserEntity admin = userEntryRepo.findByUsername(username);
        if(admin == null || admin.getROLE().equals("USER")){
            return null;
        } else{
            return journalRepo.findAll();
        }
    }

    public boolean DeleteUser(String adminId, String username){
        try{
            UserEntity admin = userEntryRepo.findByUsername(adminId);
            UserEntity user = userEntryRepo.findByUsername(username);
            if (admin == null || user == null || admin.getROLE().equals("USER")) {
                return false;
            }
            List<JournalEntity> journals = user.getJournalEntries();
            if (journals != null) {
                List<JournalEntity> allJournals = journalRepo.findAll();
                for (JournalEntity journal : allJournals){
                    if (journal.getAuthor().equals(user.getUsername())){
                        journalRepo.delete(journal);
                    }
                }
                journalRepo.deleteAll(journals);
            }
            userEntryRepo.delete(user);

            return true;
        } catch (Exception e){
            return false;
        }
    }

    public boolean DeleteJournal(String adminId, ObjectId journalId){
        try{
            UserEntity adminEntity = userEntryRepo.findByUsername(adminId);
            Optional<JournalEntity> journalEntity = journalRepo.findById(journalId);
            if (journalEntity.isEmpty() || adminEntity == null || adminEntity.getROLE().equals("USER")) {
                return false;
            } else {
                journalRepo.delete(journalEntity.get());
                return true;
            }
        }catch (Exception e){
            return false;
        }
    }

    // Announcement
    public List<AnnouncementEntity> announcements(String username){
        UserEntity admin = userEntryRepo.findByUsername(username);
        if(admin == null || admin.getROLE().equals("USER")){
            return null;
        } else{
            return announcementRepo.findAll();
        }
    }
    public boolean addAnnouncement(String username, AnnouncementEntity announcement){
        UserEntity admin = userEntryRepo.findByUsername(username);
        if(admin == null || admin.getROLE().equals("USER")){
            return false;
        } else{
            announcement.setPublishedDate(LocalDateTime.now());
            announcementRepo.save(announcement);
            return true;
        }
    }
    public boolean editAnnouncement(String username, AnnouncementEntity announcement){
        UserEntity admin = userEntryRepo.findByUsername(username);
        if(admin == null || admin.getROLE().equals("USER")){
            return false;
        } else{
            Optional<AnnouncementEntity> oldAnnouncement = announcementRepo.findById(announcement.getId());
            if(oldAnnouncement.isPresent()){
                if(announcement.getBody() != null){
                    oldAnnouncement.get().setBody(announcement.getBody());
                }
                announcementRepo.save(oldAnnouncement.get());
                return true;
            } else {
                return false;
            }
        }
    }
    public boolean deleteAnnouncement(String username, ObjectId announcementId){
        UserEntity admin = userEntryRepo.findByUsername(username);
        if(admin == null || admin.getROLE().equals("USER")){
            return false;
        } else{
            Optional<AnnouncementEntity> announcement = announcementRepo.findById(announcementId);
            if(announcement.isPresent()){
                announcementRepo.delete(announcement.get());
                return true;
            } else {
                return false;
            }
        }
    }
}
