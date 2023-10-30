package com.example.connect16.dto.board.service;

import com.example.connect16.domain.board.Board;
import com.example.connect16.domain.user.User;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@ToString
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class BoardUpdateServiceRequestDto {
    private String title;
    private String content;
    private String category;
    private String userId;
    private String img;

    public Board toEntity(Integer id) {
        return Board.builder()
                .id(id)
                .title(title)
                .content(content)
                .category(category)
                .user(User.builder().id(userId).build())
                .img(img)
                .build();
    }
}
