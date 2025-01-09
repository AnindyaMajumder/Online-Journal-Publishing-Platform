package com.groupthirteen.nais_journal.Repository;


import com.groupthirteen.nais_journal.model.AnnouncementEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AnnouncementRepo extends MongoRepository<AnnouncementEntity, ObjectId> {
    List<AnnouncementEntity> findByPublishedDateBetween(String startDate, String endDate);
}
