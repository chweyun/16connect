package com.example.connect16.dto.like;

import com.example.connect16.domain.board.Board;
import com.example.connect16.domain.like.BoardLike;
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
public class LikeRequestDto {
    private String userId;
    private Integer boardId;

    public BoardLike toEntity(User user, Board board) {
        return BoardLike.builder()
                .user(user)
                .board(board)
                .build();
    }
}
