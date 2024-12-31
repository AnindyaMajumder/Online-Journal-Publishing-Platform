package com.groupthirteen.nais_journal.controller;

import com.groupthirteen.nais_journal.model.JournalEntity;
import com.groupthirteen.nais_journal.service.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/journal")
public class JournalController {
    @Autowired
    private JournalService journalService;

    @PutMapping("/edit-details")
    public ResponseEntity<?> editDetails(@RequestBody JournalEntity journal) {
        boolean isUpdated = journalService.updateJournal(journal);
        if (isUpdated) {
            return ResponseEntity.ok("Journal updated successfully");
        }
        return ResponseEntity.badRequest().body("Journal update failed");
    }

    @PostMapping("/add-journal")
    public ResponseEntity<?> addJournal(@RequestBody JournalEntity journal) {
        boolean isAdded = journalService.addJournal(journal);
        if (isAdded) {
            return ResponseEntity.ok("Journal added successfully");
        }
        return ResponseEntity.badRequest().body("Journal add failed");
    }

    @DeleteMapping("/delete-journal")
    public ResponseEntity<?> deleteJournal(@RequestBody JournalEntity journal) {
        boolean isDeleted = journalService.deleteJournal(journal);
        if (isDeleted) {
            return ResponseEntity.ok("Journal deleted successfully");
        }
        return ResponseEntity.badRequest().body("Journal delete failed");
    }
}
