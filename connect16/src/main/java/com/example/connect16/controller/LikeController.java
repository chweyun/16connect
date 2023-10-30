package com.example.connect16.controller;

import com.example.connect16.dto.board.BoardResponseDto;
import com.example.connect16.dto.general.MessageDto;
import com.example.connect16.dto.like.LikeRequestDto;
import com.example.connect16.dto.like.LikeResponseDto;
import com.example.connect16.dto.user.UserLoginRequestDto;
import com.example.connect16.dto.user.UserSignUpResponseDto;
import com.example.connect16.service.LikeService;
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
@RequestMapping("/api/v1/like")
public class LikeController {
    private final LikeService likeService;

    // 좋아요 등록
    @PostMapping()
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<MessageDto> postLike(@RequestBody @Valid LikeRequestDto likeRequestDto) {
        likeService.postLike(likeRequestDto);
        return ResponseEntity.ok(new MessageDto("좋아요 등록에 성공했습니다."));
    }

    // 좋아요 삭제
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<MessageDto> deleteLike(
            @PathVariable("id") Integer id) {
        likeService.deleteLike(id);
        return ResponseEntity.ok(new MessageDto("좋아요 삭제에 성공했습니다."));
    }

    // 특정 게시글의 좋아요 정보 조회
    @GetMapping("/{boardId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<LikeResponseDto>> getLike(
            @PathVariable("boardId") Integer id) {
        List<LikeResponseDto> results;

        results = likeService.getLike(id)
                .stream()
                .collect(Collectors.toList());

        return ResponseEntity.ok(results);
    }
}
