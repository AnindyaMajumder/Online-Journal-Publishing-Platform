package com.groupthirteen.nais_journal.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Document (collection = "Journals")
@Data
@NoArgsConstructor
public class JournalEntity {
    @Id
    private ObjectId id;

    private String title;
    private String body;
    private String author;
    private List<String> tags = new ArrayList<>() ;
    private LocalDateTime publishedDate;
    private LocalDateTime updatedDate;

}
