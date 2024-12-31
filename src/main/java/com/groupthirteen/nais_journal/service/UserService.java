package com.groupthirteen.nais_journal.service;

import com.groupthirteen.nais_journal.Repository.UserEntryRepo;
import com.groupthirteen.nais_journal.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserEntryRepo userEntryRepo;

    public boolean updateUser(UserEntity user) {
        UserEntity userEntity = userEntryRepo.findByUsername(user.getUsername());
        if(userEntity == null) {
            return false;
        }
        else {
            try {
                userEntity.setFirstName(user.getFirstName());
                userEntity.setLastName(user.getLastName());
                userEntity.setBio(user.getBio());
                userEntity.setEmail(user.getEmail());

                userEntryRepo.save(userEntity);

                return true;
            }
            catch(Exception e) {
                return false;
            }
        }
    }
}
