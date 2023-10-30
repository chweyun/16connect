package com.example.connect16.service;

import com.example.connect16.domain.board.Board;
import com.example.connect16.domain.board.BoardRepository;
import com.example.connect16.domain.like.BoardLike;
import com.example.connect16.domain.like.BoardLikeRepository;
import com.example.connect16.domain.user.User;
import com.example.connect16.domain.user.UserRepository;
import com.example.connect16.dto.board.BoardResponseDto;
import com.example.connect16.dto.like.LikeRequestDto;
import com.example.connect16.dto.like.LikeResponseDto;
import com.example.connect16.utils.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.Like;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class LikeService {
    @Autowired
    private final BoardLikeRepository boardLikeRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final BoardRepository boardRepository;

    // 좋아요 등록
    @Transactional
    public void postLike(LikeRequestDto likeRequestDto) {
        User targetUser = userRepository.findUserById(likeRequestDto.getUserId())
                .orElseThrow(()->new CustomException("해당하는 유저가 존재하지 않습니다."));
        Board targetBoard = boardRepository.findById(likeRequestDto.getBoardId())
                .orElseThrow(()->new CustomException("해당하는 게시글이 존재하지 않습니다."));

        // 자신의 글에 좋아요를 누르는 경우 예외 처리
        if (likeRequestDto.getUserId() == targetBoard.getUser().getId()) {
            throw new CustomException("자신의 게시글에는 좋아요를 누를 수 없습니다.");
        }

        // 중복 등록 시 예외 처리
        if (boardLikeRepository.alreadyLiked(likeRequestDto.getBoardId(), likeRequestDto.getUserId()) == 1) {
            throw new CustomException("중복으로 좋아요를 누를 수 없습니다.");
        }
        boardLikeRepository.save(likeRequestDto.toEntity(targetUser, targetBoard));
    }

    // 좋아요 삭제
    @Transactional
    public void deleteLike(Integer id) {
        BoardLike targetLike = boardLikeRepository.findById(id)
                .orElseThrow(()->new CustomException("해당하는 좋아요 정보가 존재하지 않습니다."));
        boardLikeRepository.delete(targetLike);
    }

    // 특정 게시글의 좋아요 정보 조회
    @Transactional (readOnly = true)
    public List<LikeResponseDto> getLike(Integer id) {
        List<BoardLike> targetLikes = boardLikeRepository.findBoardLikeByBoard(id)
                .orElseThrow(()->new CustomException("해당하는 게시글이 존재하지 않습니다."));
        List<LikeResponseDto> dtoList = new ArrayList<>();

        for (BoardLike boardLikes : targetLikes) {
            LikeResponseDto dto = LikeResponseDto.builder()
                    .id(boardLikes.getId())
                    .userId(boardLikes.getUser().getId())
                    .boardId(boardLikes.getBoard().getId())
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }

}
