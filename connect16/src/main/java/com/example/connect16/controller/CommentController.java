package com.example.connect16.controller;

import com.example.connect16.dto.comment.CommentAddRequestDto;
import com.example.connect16.dto.comment.CommentResponseDto;
import com.example.connect16.dto.comment.CommentUpdateRequestDto;
import com.example.connect16.dto.general.MessageDto;
import com.example.connect16.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/api/v1/comment")
public class CommentController {
    private final CommentService commentService;

    // 댓글 등록
    @PostMapping()
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<MessageDto> addComment (@RequestBody @Valid CommentAddRequestDto commentAddRequestDto) {
        commentService.addComment(commentAddRequestDto);
        return ResponseEntity.ok(new MessageDto("댓글 등록이 완료되었습니다."));
    }

    // 게시글 별 댓글 조회
    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<CommentResponseDto>> getCommentList (@PathVariable  Integer id) {
        List<CommentResponseDto> results;
        results = commentService.getComments(id)
                .stream()
                .collect(Collectors.toList());
        return ResponseEntity.ok(results);
    }

    // 댓글 수정
    @PatchMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<MessageDto> updateComment(
            @PathVariable("id") Integer commentId,
            @RequestBody @Valid CommentUpdateRequestDto commentUpdateRequestDto) {
        commentService.updateBoard(commentId, commentUpdateRequestDto);
        return ResponseEntity.ok(new MessageDto("댓글을 성공적으로 수정했습니다."));
    }

    // 댓글 삭제
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<MessageDto> deleteComment(@PathVariable("id") Integer commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok(new MessageDto("댓글을 성공적으로 삭제했습니다."));
    }
}
