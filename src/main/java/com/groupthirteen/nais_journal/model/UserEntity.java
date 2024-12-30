package com.groupthirteen.nais_journal.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document (collection = "Users")
@Data
@NoArgsConstructor
public class UserEntity {
    @Id
    private ObjectId id;

    private String firstName;
    private String lastName;

    @NonNull
    private String email;

    @NonNull
    private String password;

    @Indexed(unique = true)
    @com.mongodb.lang.NonNull
    private String username;

    // Non-Null
    private String ROLE;

    private String resetCode;
}
