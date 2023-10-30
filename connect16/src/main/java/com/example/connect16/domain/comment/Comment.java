package com.example.connect16.domain.comment;

import com.example.connect16.domain.board.Board;
import com.example.connect16.domain.user.User;
import com.example.connect16.dto.comment.CommentDeleteRequestDto;
import com.example.connect16.dto.comment.CommentUpdateRequestDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@DynamicInsert
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "comment")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMMENT_ID", nullable = false, unique = true)
    private Integer id;

    @Column(name = "COMMENT_CONTENT", columnDefinition = "TEXT", nullable = false)
    private String content;

    @CreatedDate
    @Column(name = "COMMENT_CREATE_DTTM", updatable = false, nullable = false)
    private LocalDateTime createdDateTime;

    @LastModifiedDate
    @Column(name = "COMMENT_UPDATE_DTTM", nullable = true)
    private LocalDateTime updatedDateTime;

    @Column(name = "COMMENT_DEPTH", nullable = false)
    @ColumnDefault("0")
    private Integer depth;

    @Column(name = "COMMENT_GROUP", nullable = true)
    private Integer group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_USER_ID", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_BOARD_ID", nullable = false)
    private Board board;

    public void updateComment(CommentUpdateRequestDto commentUpdateRequestDto) {
        content = commentUpdateRequestDto.getContent();
        updatedDateTime = LocalDateTime.now();
    }

    public void updateComment(CommentDeleteRequestDto commentDeleteRequestDto) {
        user = User.builder().id("anonymous").build();
        content = commentDeleteRequestDto.getContent();
        updatedDateTime = LocalDateTime.now();
    }
}
