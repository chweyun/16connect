package com.example.connect16.dto.user;

import com.example.connect16.domain.user.User;
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
public class UserLoginResponseDto {
    private String id;
    private Date birth;
    private String mbti;
    private String preferMbti;

    public UserLoginResponseDto(User user) {
        id = user.getId();
        birth = user.getBirth();
        mbti = user.getMbti();
        preferMbti = user.getPreferMbti();
    }
}
