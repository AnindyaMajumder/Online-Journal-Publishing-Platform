package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.CommentRepo;
import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.model.CommentEntity;
import com.groupthirteen.nais_journal.model.JournalEntity;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private static final Logger logger = LoggerFactory.getLogger(CommentService.class);

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private JournalRepo journalRepo;

    public boolean addComment(CommentEntity comment) {
        try {
            logger.info("Adding comment with journal ID: {}", comment.getJournalId());
            comment.setPublishedDate(java.time.LocalDateTime.now());

            Optional<JournalEntity> journal = journalRepo.findById(comment.getJournalId());
            if (journal.isPresent()) {
                CommentEntity savedComment = commentRepo.save(comment);
                logger.info("Comment saved with ID: {}", savedComment.getId());

                List<CommentEntity> comments = journal.get().getComments();
                comments.add(savedComment);

                journal.get().setComments(comments);
                journalRepo.save(journal.get());
                logger.info("Comment added to journal ID: {}", comment.getJournalId());

                return true;
            } else {
                logger.warn("Journal ID: {} not found", comment.getJournalId());
                return false;
            }
        } catch (Exception e) {
            logger.error("Error adding comment: ", e);
            return false;
        }
    }

    public boolean editComment(CommentEntity comment) {
        try {
            logger.info("Editing comment with ID: {}", comment.getId());
            Optional<CommentEntity> oldComment = commentRepo.findById(comment.getId());
            if (oldComment.isPresent() && oldComment.get().getAuthor().equals(comment.getAuthor())) {

                if (comment.getComment() != null) {
                    oldComment.get().setComment(comment.getComment());
                    logger.info("Comment content updated for ID: {}", comment.getId());
                }

                return true;
            } else {
                logger.warn("Comment with ID: {} not found or author mismatch", comment.getId());
                return false;
            }
        } catch (Exception e) {
            logger.error("Error editing comment: ", e);
            return false;
        }
    }

    public boolean deleteComment(String username, ObjectId commentid) {
        try {
            logger.info("Deleting comment with ID: {} by user: {}", commentid, username);
            Optional<CommentEntity> comment = commentRepo.findById(commentid);
            if (comment.isPresent() && comment.get().getAuthor().equals(username)) {
                Optional<JournalEntity> journal = journalRepo.findById(comment.get().getJournalId());
                if (journal.isPresent()) {
                    List<CommentEntity> comments = journal.get().getComments();
                    comments.removeIf(c -> c.getJournalId().equals(comment.get().getJournalId()));

                    journal.get().setComments(comments);
                    journalRepo.save(journal.get());
                    logger.info("Comment removed from journal ID: {}", comment.get().getJournalId());

                    commentRepo.delete(comment.get());
                    logger.info("Comment with ID: {} deleted", commentid);
                    return true;
                } else {
                    logger.warn("Journal ID: {} not found for comment deletion", comment.get().getJournalId());
                    return false;
                }
            } else {
                logger.warn("Comment with ID: {} not found or author mismatch", commentid);
            }
        } catch (Exception e) {
            logger.error("Error deleting comment: ", e);
            return false;
        }
        return false;
    }
}