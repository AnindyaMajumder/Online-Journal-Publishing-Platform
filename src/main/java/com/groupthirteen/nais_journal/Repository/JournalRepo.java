package com.groupthirteen.nais_journal.Repository;

import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.model.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface JournalRepo extends MongoRepository<JournalEntity, ObjectId> {
//    JournalEntity findByUsername(String username);
    List<JournalEntity> findAllById(Iterable<ObjectId> ids);
}
