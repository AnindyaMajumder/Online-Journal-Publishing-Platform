package com.groupthirteen.nais_journal.model;
import com.groupthirteen.nais_journal.utils.ObjectIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "Announcements")
@Data
@NoArgsConstructor
public class AnnouncementEntity {
    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;

    private String body;
    private LocalDateTime publishedDate;
}
