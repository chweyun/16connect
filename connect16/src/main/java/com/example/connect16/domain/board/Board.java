package com.example.connect16.domain.board;

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
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "board")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARD_ID", nullable = false, unique = true)
    private Integer id;

    @Column(name = "BOARD_TITLE", length = 45, nullable = false)
    private String title;

    @Column(name = "BOARD_CONTENT", columnDefinition = "TEXT", nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_USER_ID", nullable = false)
    private User user;

//    @Column(name = "BOARD_CMNT_NUM", nullable = false)
//    private Integer commentNum;

    @CreatedDate
    @Column(name = "BOARD_CREATE_DTTM", updatable = false, nullable = false)
    private LocalDateTime createdDateTime;

    @Column(name = "BOARD_CATEGORY", length = 5, nullable = false)
    private String category;

    @Column(name = "BOARD_IMG", length = 500, nullable = true)
    private String img;

    public void updateBoard(Board board) {
        title = board.getTitle();
        content = board.getContent();
        category = board.getCategory();
        img = board.getImg();
    }
}
