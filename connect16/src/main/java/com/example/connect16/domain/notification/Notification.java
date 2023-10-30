package com.example.connect16.domain.notification;

import com.example.connect16.domain.board.Board;
import com.example.connect16.domain.comment.Comment;
import com.example.connect16.domain.user.User;
import com.example.connect16.dto.comment.CommentDeleteRequestDto;
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
@Entity(name = "notification")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTIF_ID", nullable = false, unique = true)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_USER_ID", nullable = false)
    private User receiver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_WRITER_ID", nullable = false)
    private User writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_BOARD_ID", nullable = false)
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMMENT_COMMENT_ID", nullable = false)
    private Comment comment;

    @Column(name = "NOTIF_TYPE", length = 10, nullable = false)
    private String type;

    @Column(name = "NOTIF_CHECKED", nullable = false)
    private Integer isChecked;

    @CreatedDate
    @Column(name = "NOTIF_CREATE_DTTM", updatable = false, nullable = false)
    private LocalDateTime createdDateTime;

    public void updateNotif() {
        isChecked = 1;
    }
}
