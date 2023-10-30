package com.example.connect16.domain.chatList;

import com.example.connect16.domain.user.User;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "chatList")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ChatList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHATLIST_ID", nullable = false, unique = true)
    private Integer id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "USER_USER_ID", nullable = false)
//    private User from_user;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "USER_USER_ID", nullable = false)
//    private User to_user;

    @Column(name = "CHATLIST_LAST_CONTENT", length = 50, nullable = false)
    private String last_content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_USER_ID", nullable = false)
    private User last_user;

    @Column(name = "CHATLIST_LAST_CREATE_DTTM", updatable = false, nullable = false)
    private LocalDateTime last_createdDateTime;
}
