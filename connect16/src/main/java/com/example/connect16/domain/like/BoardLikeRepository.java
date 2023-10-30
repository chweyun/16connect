package com.example.connect16.domain.like;
import com.example.connect16.domain.board.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BoardLikeRepository extends JpaRepository<BoardLike,Integer> {
    @Query(value = "SELECT COUNT(u) FROM boardLike AS u WHERE u.board.id = ?1")
    Integer getNumByBoardId(Integer id);

    @Query(value = "SELECT u FROM boardLike AS u WHERE u.board.id = ?1")
    Optional<List<BoardLike>> findBoardLikeByBoard(Integer id);

    @Query(value = "SELECT u.board.id FROM boardLike AS u WHERE u.user.id = ?1")
    Optional<List<Integer>> findBoardLikesByUser(String id);

    @Query(value = "SELECT IF(COUNT(u) = 0, 0, 1) FROM boardLike AS u WHERE u.board.id = ?1 AND u.user.id = ?2")
    Integer alreadyLiked(Integer id, String userId);
}
