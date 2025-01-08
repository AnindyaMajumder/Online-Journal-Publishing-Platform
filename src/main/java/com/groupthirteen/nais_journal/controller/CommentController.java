package com.groupthirteen.nais_journal.controller;

import com.groupthirteen.nais_journal.model.CommentEntity;
import com.groupthirteen.nais_journal.security.JwtUtils;
import com.groupthirteen.nais_journal.service.CommentService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/add-comment")
    public ResponseEntity<?> addComment(@RequestHeader("Authorization") String token, @RequestBody CommentEntity comment) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);

        comment.setAuthor(username);
        boolean isAdded = commentService.addComment(comment);
        if (isAdded) {
            return ResponseEntity.ok("Comment added successfully");
        } else{
            return ResponseEntity.badRequest().body("Comment add failed");
        }
    }

    @PutMapping("/edit-comment")
    public ResponseEntity<?> editComment(@RequestHeader("Authorization") String token, @RequestBody CommentEntity comment) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);

        comment.setAuthor(username);
        boolean isEdited = commentService.editComment(comment);
        if (isEdited) {
            return ResponseEntity.ok("Comment edited successfully");
        } else{
            return ResponseEntity.badRequest().body("Comment edit failed");
        }
    }

    @DeleteMapping("/delete-comment")
    public ResponseEntity<?> deleteComment(@RequestHeader("Authorization") String token, @RequestBody String commentId) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtUtils.getUsername(jwtToken);

        boolean isDeleted = commentService.deleteComment( username, new ObjectId(commentId));
        if (isDeleted) {
            return ResponseEntity.ok("Comment deleted successfully");
        } else{
            return ResponseEntity.badRequest().body("Comment delete failed");
        }
    }
}
