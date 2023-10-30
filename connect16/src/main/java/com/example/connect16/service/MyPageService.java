package com.example.connect16.service;

import com.example.connect16.domain.board.Board;
import com.example.connect16.domain.board.BoardRepository;
import com.example.connect16.domain.comment.Comment;
import com.example.connect16.domain.comment.CommentRepository;
import com.example.connect16.domain.like.BoardLikeRepository;
import com.example.connect16.dto.myPage.MyBoardResponseDto;
import com.example.connect16.dto.myPage.MyCommentResponseDto;
import com.example.connect16.utils.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MyPageService {
    @Autowired
    private final BoardRepository boardRepository;

    @Autowired
    private final BoardLikeRepository boardLikeRepository;

    @Autowired
    private final CommentRepository commentRepository;

    // 작성한 게시글 조회
    @Transactional(readOnly = true)
    public List<MyBoardResponseDto> getBoardsWritedById(String id) {

        List<Board> targetBoards = boardRepository.findBoardsByUserId(id)
                .orElseThrow(()->new CustomException("해당하는 게시글이 존재하지 않습니다."));
        List<MyBoardResponseDto> dtoList = new ArrayList<>();

        for (Board boards : targetBoards) {
            Integer likeNum = boardLikeRepository.getNumByBoardId(boards.getId());
            Integer commentNum = boardRepository.getCmntNumByBoardId(boards.getId());

            MyBoardResponseDto dto = MyBoardResponseDto.builder()
                    .id(boards.getId())
                    .title(boards.getTitle())
                    .userId(boards.getUser().getId())
                    .userMbti(boards.getUser().getMbti())
                    .userBirth(boards.getUser().getBirth())
                    .cmntNum(commentNum)
                    .category(boards.getCategory())
                    .img(boards.getImg())
                    .likeNum(likeNum)
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }

    // 작성한 댓글 조회
    @Transactional(readOnly = true)
    public List<MyCommentResponseDto> getCommentsById(String id) {

        List<Comment> targetComment = commentRepository.findCommentsByUserId(id)
                .orElseThrow(()->new CustomException("해당하는 댓글이 존재하지 않습니다."));
        List<MyCommentResponseDto> dtoList = new ArrayList<>();

        for (Comment comments : targetComment) {
            MyCommentResponseDto dto = MyCommentResponseDto.builder()
                    .boardId(comments.getBoard().getId())
                    .title(comments.getBoard().getTitle())
                    .commentId(comments.getId())
                    .content(comments.getContent())
                    .createdTime(comments.getCreatedDateTime())
                    .updatedTime(comments.getUpdatedDateTime())
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }

    // 좋아요 한 게시글 조회
    @Transactional(readOnly = true)
    public List<MyBoardResponseDto> getBoardsLikedById(String id) {

        List<Integer> targetBoardsId = boardLikeRepository.findBoardLikesByUser(id)
                .orElseThrow(()->new CustomException("좋아요 한 게시글이 존재하지 않습니다."));

        List<MyBoardResponseDto> dtoList = new ArrayList<>();

        for (Integer boardIds : targetBoardsId) {
            Board targetBoard = boardRepository.findBoardById(boardIds)
                    .orElseThrow(()->new CustomException("해당하는 게시글이 존재하지 않습니다."));
            Integer likeNum = boardLikeRepository.getNumByBoardId(targetBoard.getId());
            Integer commentNum = boardRepository.getCmntNumByBoardId(targetBoard.getId());

            MyBoardResponseDto dto = MyBoardResponseDto.builder()
                    .id(targetBoard.getId())
                    .title(targetBoard.getTitle())
                    .userId(targetBoard.getUser().getId())
                    .userMbti(targetBoard.getUser().getMbti())
                    .userBirth(targetBoard.getUser().getBirth())
                    .cmntNum(commentNum)
                    .category(targetBoard.getCategory())
                    .img(targetBoard.getImg())
                    .likeNum(likeNum)
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }

}
