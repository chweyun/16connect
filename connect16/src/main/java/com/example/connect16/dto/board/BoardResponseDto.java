package com.example.connect16.dto.board;

import com.example.connect16.domain.board.Board;
import com.example.connect16.domain.board.BoardRepository;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@ToString
@Getter
@AllArgsConstructor
@Builder
@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class BoardResponseDto {
    private Integer id;
    private String title;
    private String content;
    private String userId;
    private String userMbti;
    private Date userBirth;
    private int cmntNum;
    private String category;
    private String img;
    private LocalDateTime createdDateTime;

    private int likeNum;

    public BoardResponseDto(Board board, Integer likeNumber, Integer commentNumber) {
        id = board.getId();
        title = board.getTitle();
        content = board.getContent();
        userId = board.getUser().getId();
        userMbti = board.getUser().getMbti();
        userBirth = board.getUser().getBirth();
        cmntNum = commentNumber;
        category = board.getCategory();
        img = board.getImg();
        createdDateTime = board.getCreatedDateTime();
        likeNum = likeNumber;
    }
}
