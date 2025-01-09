package com.groupthirteen.nais_journal.Repository;

import com.groupthirteen.nais_journal.model.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserEntryRepo extends MongoRepository<UserEntity, ObjectId> {
    UserEntity findByUsername(String username);
}
