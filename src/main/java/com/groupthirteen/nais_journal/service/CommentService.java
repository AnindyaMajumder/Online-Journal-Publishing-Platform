package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.CommentRepo;
import com.groupthirteen.nais_journal.Repository.JournalRepo;
import com.groupthirteen.nais_journal.model.CommentEntity;
import com.groupthirteen.nais_journal.model.JournalEntity;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.xml.stream.events.Comment;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private JournalRepo journalRepo;

    public boolean addComment(CommentEntity comment) {
        try{
            comment.setPublishedDate(java.time.LocalDateTime.now());

            Optional<JournalEntity> journal = journalRepo.findById(comment.getJournalId());
            if(journal.isPresent()){
                CommentEntity savedComment = commentRepo.save(comment);

                List<CommentEntity> comments = journal.get().getComments();
                comments.add(savedComment);

                journal.get().setComments(comments);
                journalRepo.save(journal.get());

                return true;
            } else {
                return false;
            }

        } catch (Exception e) {
            return false;
        }
    }

    public boolean editComment(CommentEntity comment) {
        try{
            Optional<CommentEntity> oldComment = commentRepo.findById(comment.getId());
            if(oldComment.isPresent() && oldComment.get().getAuthor().equals(comment.getAuthor())){

                if(comment.getComment() != null){
                    oldComment.get().setComment(comment.getComment());
                }

                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    public boolean deleteComment(String username, ObjectId commentid) {
        try{
            Optional<CommentEntity> comment = commentRepo.findById(commentid);
            if(comment.isPresent() && comment.get().getAuthor().equals(username)){
                Optional<JournalEntity> journal = journalRepo.findById(comment.get().getJournalId());
                if(journal.isPresent()){
                    List<CommentEntity> comments = journal.get().getComments();
                    comments.removeIf(c->c.getJournalId().equals(comment.get().getJournalId()));

                    journal.get().setComments(comments);
                    journalRepo.save(journal.get());

                    commentRepo.delete(comment.get());
                    return true;
                }
                return false;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }
}
