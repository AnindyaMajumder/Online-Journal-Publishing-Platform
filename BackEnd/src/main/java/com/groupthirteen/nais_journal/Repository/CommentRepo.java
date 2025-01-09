package com.groupthirteen.nais_journal.Repository;

import com.groupthirteen.nais_journal.model.CommentEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepo extends MongoRepository<CommentEntity, ObjectId> {
    List<CommentEntity> findByJournalId(ObjectId id);
}
