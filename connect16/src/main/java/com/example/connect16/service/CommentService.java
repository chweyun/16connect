package com.example.connect16.service;

import com.example.connect16.domain.board.Board;
import com.example.connect16.domain.board.BoardRepository;
import com.example.connect16.domain.comment.Comment;
import com.example.connect16.domain.comment.CommentRepository;
import com.example.connect16.domain.notification.Notification;
import com.example.connect16.domain.notification.NotificationRepository;
import com.example.connect16.domain.user.User;
import com.example.connect16.domain.user.UserRepository;
import com.example.connect16.dto.comment.CommentAddRequestDto;
import com.example.connect16.dto.comment.CommentDeleteRequestDto;
import com.example.connect16.dto.comment.CommentResponseDto;
import com.example.connect16.dto.comment.CommentUpdateRequestDto;
import com.example.connect16.utils.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentService {
    @Autowired
    private final CommentRepository commentRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final BoardRepository boardRepository;

    // 댓글 등록
    @Transactional
    public void addComment(CommentAddRequestDto commentAddRequestDto) {
        User targetUser = userRepository.findUserById(commentAddRequestDto.getUserId())
                .orElseThrow(()->new CustomException("해당하는 유저가 존재하지 않습니다."));
        Board targetBoard = boardRepository.findById(commentAddRequestDto.getBoardId())
                .orElseThrow(()->new CustomException("해당하는 게시글이 존재하지 않습니다."));

        Comment targetComment = Comment.builder()
                .content(commentAddRequestDto.getContent())
                .depth(commentAddRequestDto.getDepth())
                .group(commentAddRequestDto.getGroup())
                .user(targetUser)
                .board(targetBoard)
                .build();

        commentRepository.save(targetComment);

        if (targetComment.getGroup() == null) {
            targetComment.setGroup(targetComment.getId());
            targetComment.setDepth(0);
        }
    }

    // 게시글 별 댓글 조회
    @Transactional(readOnly = true)
    public List<CommentResponseDto> getComments(Integer id) {
        boardRepository.findBoardById(id)
                .orElseThrow(()->new CustomException("해당하는 게시글이 존재하지 않습니다."));

        List<Comment> targetComments = commentRepository.findAllByBoardId(id)
                .orElseThrow(()->new CustomException("해당하는 게시글에 달린 댓글이 존재하지 않습니다."));
        List<CommentResponseDto> dtoList = new ArrayList<>();

        for (Comment comments : targetComments) {
            CommentResponseDto dto = CommentResponseDto.builder()
                    .id(comments.getId())
                    .boardId(comments.getBoard().getId())
                    .userId(comments.getUser().getId())
                    .userMbti(comments.getUser().getMbti())
                    .userBirth(comments.getUser().getBirth())
                    .content(comments.getContent())
                    .createdTime(comments.getCreatedDateTime())
                    .updatedTime(comments.getUpdatedDateTime())
                    .depth(comments.getDepth())
                    .group(comments.getGroup())
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }

    // 댓글 수정
    @Transactional
    public void updateBoard(Integer commentId, CommentUpdateRequestDto commentUpdateRequestDto) {
        Comment targetComment = commentRepository.findById(commentId)
                .orElseThrow(()->new CustomException("해당하는 댓글이 존재하지 않습니다."));
        targetComment.updateComment(commentUpdateRequestDto);
    }

    // 댓글 삭제
    @Transactional
    public void deleteComment(Integer commentId) {
        Comment targetComment = commentRepository.findById(commentId)
                .orElseThrow(()->new CustomException("해당하는 댓글이 존재하지 않습니다."));

        if (commentRepository.getChildNumByCommentId(commentId) == 0) {
            commentRepository.delete(targetComment);
            return;
        }

        // 대댓글이 있는 경우 바로 삭제 처리하지 않고 내용만 가려주는 기능
        CommentDeleteRequestDto commentDeleteRequestDto = CommentDeleteRequestDto.builder()
                .id(targetComment.getUser().getId())
                .content("삭제된 댓글입니다.")
                .build();

        targetComment.updateComment(commentDeleteRequestDto);
    }
}
