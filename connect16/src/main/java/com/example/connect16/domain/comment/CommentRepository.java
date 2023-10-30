package com.example.connect16.domain.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment,Integer> {
    @Query(value = "SELECT u FROM comment AS u WHERE u.board.id = ?1")
    Optional<List<Comment>> findAllByBoardId(Integer id);

    @Query(value = "SELECT COUNT(u) FROM comment AS u WHERE u.group = ?1 and u.depth = 1")
    Integer getChildNumByCommentId(Integer id);

    @Query(value = "SELECT u FROM comment AS u WHERE u.user.id = ?1")
    Optional<List<Comment>> findCommentsByUserId(String id);
}
