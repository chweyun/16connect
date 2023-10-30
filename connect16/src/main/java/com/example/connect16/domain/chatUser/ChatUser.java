package com.example.connect16.domain.chatUser;

import com.example.connect16.domain.board.Board;
import com.example.connect16.domain.chatList.ChatList;
import com.example.connect16.domain.user.User;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "chatUser")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ChatUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHATUSER_ID", nullable = false, unique = true)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_USER_ID", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHATLIST_CHATLIST_ID", nullable = false)
    private ChatList chatList;
}
