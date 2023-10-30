package com.example.connect16.dto.myPage;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.time.LocalDateTime;

@ToString
@Getter
@AllArgsConstructor
@Builder
@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class MyCommentResponseDto {
    private Integer boardId;
    private String title;

    private Integer commentId;
    private String content;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
}
