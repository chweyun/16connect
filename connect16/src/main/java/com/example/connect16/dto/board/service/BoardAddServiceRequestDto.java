package com.example.connect16.dto.board.service;

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
public class BoardAddServiceRequestDto {
    private String title;
    private String content;
    private String category;
    private User user;
    private String img;

    public Board toEntity(User user) {
        return Board.builder()
                .title(title)
                .content(content)
                .category(category)
                .user(user)
                .img(img)
                .build();
    }
}
