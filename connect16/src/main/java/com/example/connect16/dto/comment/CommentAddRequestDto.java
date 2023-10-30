package com.example.connect16.dto.comment;

import com.example.connect16.domain.board.Board;
import com.example.connect16.domain.user.User;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@ToString
@Getter
@AllArgsConstructor
@Builder
@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class CommentAddRequestDto {
    private Integer boardId;
    private String userId;
    private String content;
    private Integer depth;
    private Integer group;
}
