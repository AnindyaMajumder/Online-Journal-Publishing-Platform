package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.AnnouncementRepo;
import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.Repository.UserEntryRepo;
import com.groupthirteen.nais_journal.model.AnnouncementEntity;
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
public class AdminService {

    private static final Logger logger = LoggerFactory.getLogger(AdminService.class);

    @Autowired
    private UserEntryRepo userEntryRepo;

    @Autowired
    private JournalRepo journalRepo;

    @Autowired
    private AnnouncementRepo announcementRepo;

    public List<UserEntity> users(String username) {
        logger.info("Fetching users for admin username: {}", username);
        UserEntity admin = userEntryRepo.findByUsername(username);
        if (admin == null || admin.getROLE().equals("USER")) {
            logger.warn("Access denied for username: {}", username);
            return null;
        } else {
            logger.info("Admin access granted for username: {}", username);
            return userEntryRepo.findAll();
        }
    }

    public List<JournalEntity> journals(String username) {
        logger.info("Fetching journals for admin username: {}", username);
        UserEntity admin = userEntryRepo.findByUsername(username);
        if (admin == null || admin.getROLE().equals("USER")) {
            logger.warn("Access denied for username: {}", username);
            return null;
        } else {
            logger.info("Admin access granted for username: {}", username);
            return journalRepo.findAll();
        }
    }

    public boolean DeleteUser(String adminId, String username) {
        logger.info("Attempting to delete user: {} by admin: {}", username, adminId);
        try {
            UserEntity admin = userEntryRepo.findByUsername(adminId);
            UserEntity user = userEntryRepo.findByUsername(username);
            if (admin == null || user == null || admin.getROLE().equals("USER")) {
                logger.warn("Delete operation denied for admin: {} or user: {} not found", adminId, username);
                return false;
            }
            List<JournalEntity> journals = user.getJournalEntries();
            if (journals != null) {
                logger.info("Deleting journals for user: {}", username);
                List<JournalEntity> allJournals = journalRepo.findAll();
                for (JournalEntity journal : allJournals) {
                    if (journal.getAuthor().equals(user.getUsername())) {
                        journalRepo.delete(journal);
                    }
                }
                journalRepo.deleteAll(journals);
            }
            userEntryRepo.delete(user);
            logger.info("Successfully deleted user: {}", username);
            return true;
        } catch (Exception e) {
            logger.error("Error while deleting user: {} by admin: {}", username, adminId, e);
            return false;
        }
    }

    public boolean DeleteJournal(String adminId, ObjectId journalId) {
        logger.info("Attempting to delete journal: {} by admin: {}", journalId, adminId);
        try {
            UserEntity adminEntity = userEntryRepo.findByUsername(adminId);
            Optional<JournalEntity> journalEntity = journalRepo.findById(journalId);
            if (journalEntity.isEmpty() || adminEntity == null || adminEntity.getROLE().equals("USER")) {
                logger.warn("Delete operation denied for admin: {} or journal: {} not found", adminId, journalId);
                return false;
            } else {
                journalRepo.delete(journalEntity.get());
                logger.info("Successfully deleted journal: {}", journalId);
                return true;
            }
        } catch (Exception e) {
            logger.error("Error while deleting journal: {} by admin: {}", journalId, adminId, e);
            return false;
        }
    }

    public List<AnnouncementEntity> announcements(String username) {
        logger.info("Fetching announcements for admin username: {}", username);
        UserEntity admin = userEntryRepo.findByUsername(username);
        if (admin == null || admin.getROLE().equals("USER")) {
            logger.warn("Access denied for username: {}", username);
            return null;
        } else {
            logger.info("Admin access granted for username: {}", username);
            return announcementRepo.findAll();
        }
    }

    public boolean addAnnouncement(String username, AnnouncementEntity announcement) {
        logger.info("Attempting to add announcement by admin: {}", username);
        UserEntity admin = userEntryRepo.findByUsername(username);
        if (admin == null || admin.getROLE().equals("USER")) {
            logger.warn("Add operation denied for username: {}", username);
            return false;
        } else {
            announcement.setPublishedDate(LocalDateTime.now());
            announcementRepo.save(announcement);
            logger.info("Successfully added announcement by admin: {}", username);
            return true;
        }
    }

    public boolean editAnnouncement(String username, AnnouncementEntity announcement) {
        logger.info("Attempting to edit announcement: {} by admin: {}", announcement.getId(), username);
        UserEntity admin = userEntryRepo.findByUsername(username);
        if (admin == null || admin.getROLE().equals("USER")) {
            logger.warn("Edit operation denied for username: {}", username);
            return false;
        } else {
            Optional<AnnouncementEntity> oldAnnouncement = announcementRepo.findById(announcement.getId());
            if (oldAnnouncement.isPresent()) {
                if (announcement.getBody() != null) {
                    oldAnnouncement.get().setBody(announcement.getBody());
                }
                announcementRepo.save(oldAnnouncement.get());
                logger.info("Successfully edited announcement: {} by admin: {}", announcement.getId(), username);
                return true;
            } else {
                logger.warn("Announcement: {} not found for editing", announcement.getId());
                return false;
            }
        }
    }

    public boolean deleteAnnouncement(String username, ObjectId announcementId) {
        logger.info("Attempting to delete announcement: {} by admin: {}", announcementId, username);
        UserEntity admin = userEntryRepo.findByUsername(username);
        if (admin == null || admin.getROLE().equals("USER")) {
            logger.warn("Delete operation denied for username: {}", username);
            return false;
        } else {
            Optional<AnnouncementEntity> announcement = announcementRepo.findById(announcementId);
            if (announcement.isPresent()) {
                announcementRepo.delete(announcement.get());
                logger.info("Successfully deleted announcement: {} by admin: {}", announcementId, username);
                return true;
            } else {
                logger.warn("Announcement: {} not found for deletion", announcementId);
                return false;
            }
        }
    }
}
