package com.example.connect16.dto.user;

import com.example.connect16.domain.user.User;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.util.Date;

@ToString
@Getter
@AllArgsConstructor
@Builder
@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class UserUpdateRequestDto {
    @Pattern(regexp = "[a-zA-Z0-9]{10,18}",
            message = "비밀번호는 영문, 숫자만 가능하며 10-18자리까지 가능합니다.")
    private String pw;

    @Past
    private Date birth;

    private String mbti;

    private String preferMbti;

    public User toEntity() {
        return User.builder()
                .pw(pw)
                .birth(birth)
                .mbti(mbti)
                .preferMbti(preferMbti)
                .build();
    }
}
