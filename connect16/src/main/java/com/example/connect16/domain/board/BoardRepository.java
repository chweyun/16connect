package com.example.connect16.domain.board;

import com.example.connect16.domain.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board,Integer> {
    Optional<Board> findBoardById(Integer id);
    @Query(value = "SELECT u FROM board AS u " +
        "WHERE (u.category LIKE concat(?1,'%') or u.category LIKE concat(?5,'%') or u.category LIKE concat('X','%')) and " +
        "(u.category LIKE concat('_',?2,'__') or u.category LIKE concat('_',?6,'__') or u.category LIKE concat('_','X','__')) and " +
        "(u.category LIKE concat('__',?3,'_') or u.category LIKE concat('__',?7,'_') or u.category LIKE concat('__','X','_')) and " +
        "(u.category LIKE concat('%',?4) or u.category LIKE concat('%',?8) or u.category LIKE concat('%','X'))")
    Optional<List<Board>> findBoardsByCategory(char EI, char SN, char TF, char JP, char EX, char SX, char TX, char JX);

    @Query(value = "SELECT u FROM board AS u WHERE u.user.id = ?1")
    Optional<List<Board>> findBoardsByUserId(String id);

    @Query(value = "SELECT COUNT(u) FROM comment AS u WHERE u.board.id = ?1")
    Integer getCmntNumByBoardId(Integer id);
}