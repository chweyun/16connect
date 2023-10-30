package com.example.connect16.domain.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.util.Date;

@NoArgsConstructor
@DynamicInsert
@Getter
@Setter
@ToString
@AllArgsConstructor
@Builder
@Entity(name = "user")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class User {
    @Id
    @Column(name = "USER_ID", length = 15, nullable = false, unique = true)
    private String id;

    @Column(name = "USER_PW", length = 20, nullable = false)
    private String pw;

    @Column(name = "USER_BIRTH", nullable = false)
    private Date birth;

    @Column(name = "USER_MBTI", length = 5, nullable = false)
    private String mbti;

    @Column(name = "USER_PREFER_MBTI", length = 5)
    @ColumnDefault("XXXX")
    private String preferMbti;

    public void updateUser(User user) {
        pw = user.getPw();
        birth = user.getBirth();
        mbti = user.getMbti();
        preferMbti = user.getPreferMbti();
    }
}
