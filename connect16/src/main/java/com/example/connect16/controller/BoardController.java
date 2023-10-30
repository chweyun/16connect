package com.example.connect16.controller;

import com.example.connect16.domain.board.Board;
import com.example.connect16.domain.user.User;
import com.example.connect16.dto.board.BoardResponseDto;
import com.example.connect16.dto.board.service.BoardAddServiceRequestDto;
import com.example.connect16.dto.board.service.BoardUpdateServiceRequestDto;
import com.example.connect16.dto.general.MessageDto;
import com.example.connect16.service.BoardService;
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
@RequestMapping("/api/v1/board")
public class BoardController {
    private final BoardService boardService;

    // MBTI별 리스트 조회
    @GetMapping("/list/{category}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<BoardResponseDto>> getBoardList(@PathVariable String category) {
        List<BoardResponseDto> results;

        results = boardService.getBoardsByCategory(category)
                .stream()
                .collect(Collectors.toList());

        return ResponseEntity.ok(results);
    }

    // 게시글 상세 조회
    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<BoardResponseDto> getBoard(@PathVariable Integer id) {
        BoardResponseDto boardResponseDto = boardService.getBoard(id);
        return ResponseEntity.ok(boardResponseDto);
    }

    // 게시글 작성
    @PostMapping()
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<BoardResponseDto> addBoard(
            @RequestParam(value = "user_id", required = true) String userId,
            @RequestParam(value = "title", required = true) String title,
            @RequestParam(value = "content", required = true) String content,
            @RequestParam(value = "category", required = true) String category,
            @RequestParam(value = "img", required = false) String img
            ) {
        Board board = Board.builder()
                .title(title)
                .content(content)
                .category(category)
                .user(User.builder().id(userId).build())
                .img(img)
                .build();

        BoardAddServiceRequestDto boardAddServiceRequestDto = BoardAddServiceRequestDto.builder()
                .title(board.getTitle())
                .content(board.getContent())
                .category(board.getCategory())
                .user(board.getUser())
                .img(board.getImg())
                .build();

        BoardResponseDto boardResponseDto = boardService.addBoard(boardAddServiceRequestDto);
        return ResponseEntity.ok(boardResponseDto);
    }

    // 게시글 수정
    @PatchMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<MessageDto> updateBoard(
            @PathVariable("id") Integer id,
            @RequestBody @Valid BoardUpdateServiceRequestDto boardUpdateServiceRequestDto) {
        boardService.updateBoard(id, boardUpdateServiceRequestDto);
        return ResponseEntity.ok(new MessageDto("게시글을 성공적으로 수정했습니다."));
    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<MessageDto> deleteBoard(@PathVariable Integer id) {
        boardService.deleteBoard(id);
        return ResponseEntity.ok(new MessageDto("게시글을 성공적으로 삭제했습니다."));
    }
}
