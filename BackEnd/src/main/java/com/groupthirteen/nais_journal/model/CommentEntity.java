package com.groupthirteen.nais_journal.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.groupthirteen.nais_journal.utils.ObjectIdSerializer;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "Comments")
@Data
@NoArgsConstructor
public class CommentEntity {
    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;
    @NonNull
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId journalId;

    private String comment;
    private String author;
    private LocalDateTime publishedDate;
}
