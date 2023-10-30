package com.example.connect16.controller;

import com.example.connect16.dto.myPage.MyBoardResponseDto;
import com.example.connect16.dto.myPage.MyCommentResponseDto;
import com.example.connect16.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/api/v1/myPage")
public class MyPageController {
    private final MyPageService myPageService;

    // 작성한 게시글 리스트
    @GetMapping("/board/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<MyBoardResponseDto>> getMyPageBoardList(@PathVariable String id) {
        List<MyBoardResponseDto> results;

        results = myPageService.getBoardsWritedById(id)
                .stream()
                .collect(Collectors.toList());

        return ResponseEntity.ok(results);
    }

    // 작성한 댓글 리스트
    @GetMapping("/comment/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<MyCommentResponseDto>> getMyPageCommentList(@PathVariable String id) {
        List<MyCommentResponseDto> results;

        results = myPageService.getCommentsById(id)
                .stream()
                .collect(Collectors.toList());

        return ResponseEntity.ok(results);
    }

    // 좋아요한 글 리스트
    @GetMapping("/like/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<MyBoardResponseDto>> getMyPageLikeList(@PathVariable String id) {
        List<MyBoardResponseDto> results;

        results = myPageService.getBoardsLikedById(id)
                .stream()
                .collect(Collectors.toList());

        return ResponseEntity.ok(results);
    }
}
