package com.example.connect16.dto.myPage;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.util.Date;

@ToString
@Getter
@AllArgsConstructor
@Builder
@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class MyBoardResponseDto {
    private Integer id;
    private String title;
    private String userId;
    private String userMbti;
    private Date userBirth;
    private int likeNum;
    private int cmntNum;
    private String category;
    private String img;
}
