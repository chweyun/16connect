package com.example.connect16.domain.message;

import com.example.connect16.domain.chatList.ChatList;
import com.example.connect16.domain.user.User;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "message")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MESSAGE_ID", nullable = false, unique = true)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_USER_ID", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHATLIST_CHATLIST_ID", nullable = false)
    private ChatList chatList;

    @Column(name = "MESSAGE_CONTENT", length = 50, nullable = false)
    private String content;

    @CreatedDate
    @Column(name = "MESSAGE_CREATE_DTTM", updatable = false, nullable = false)
    private LocalDateTime createdDateTime;
}