package com.example.connect16.dto.comment;

import com.example.connect16.domain.user.User;
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
public class CommentResponseDto {
    private Integer id;
    private Integer boardId;
    private String userId;
    private String userMbti;
    private Date userBirth;

    private String content;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Integer depth;
    private Integer group;
}
