package com.groupthirteen.nais_journal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class hello {
    @GetMapping
    public ResponseEntity<?> Hello() {
        return ResponseEntity.ok("Hello World");
    }
}
