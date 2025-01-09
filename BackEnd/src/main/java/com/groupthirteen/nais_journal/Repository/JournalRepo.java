package com.groupthirteen.nais_journal.Repository;

import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.model.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface JournalRepo extends MongoRepository<JournalEntity, ObjectId> {
//    JournalEntity findByUsername(String username);
    List<JournalEntity> findAllById(Iterable<ObjectId> ids);

    // Custom query to search titles with regex
    @Query("{ 'title': { $regex: ?0, $options: 'i' } }")
    List<JournalEntity> findByTitleRegex(String regex);
}
