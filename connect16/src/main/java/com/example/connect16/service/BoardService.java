package com.example.connect16.service;

import com.example.connect16.domain.board.Board;
import com.example.connect16.domain.board.BoardRepository;
import com.example.connect16.domain.like.BoardLikeRepository;
import com.example.connect16.domain.user.User;
import com.example.connect16.domain.user.UserRepository;
import com.example.connect16.dto.board.BoardResponseDto;
import com.example.connect16.dto.board.service.BoardAddServiceRequestDto;
import com.example.connect16.dto.board.service.BoardDeleteServiceResponseDto;
import com.example.connect16.dto.board.service.BoardUpdateServiceRequestDto;
import com.example.connect16.utils.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@RequiredArgsConstructor
@Service
public class BoardService {
    @Autowired
    private final BoardRepository boardRepository;
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final BoardLikeRepository boardLikeRepository;

    // 게시글 생성
    @Transactional
    public BoardResponseDto addBoard(BoardAddServiceRequestDto boardAddServiceRequestDto) {
        User targetUser = userRepository.findById(boardAddServiceRequestDto.getUser().getId())
                .orElseThrow(()->new CustomException("해당하는 id가 존재하지 않습니다."));

        Board targetBoard = boardAddServiceRequestDto.toEntity(targetUser);

        targetBoard.setCreatedDateTime(LocalDateTime.now());

        boardRepository.save(targetBoard);

        return new BoardResponseDto(targetBoard, 0, 0);
    }

    // 게시글 수정
    @Transactional
    public BoardResponseDto updateBoard(Integer id, BoardUpdateServiceRequestDto boardUpdateServiceRequestDto) {
        Board targetBoard = boardRepository.findById(id)
                .orElseThrow(()->new CustomException("해당하는 게시글이 존재하지 않습니다."));
        User targetUser = userRepository.findUserById(boardUpdateServiceRequestDto.getUserId())
                .orElseThrow(()->new CustomException("해당하는 id가 존재하지 않습니다."));

        targetBoard.updateBoard(boardUpdateServiceRequestDto.toEntity(id));

        Integer likeNum = boardLikeRepository.getNumByBoardId(targetBoard.getId());
        Integer commentNum = boardRepository.getCmntNumByBoardId(targetBoard.getId());

        return BoardResponseDto.builder()
                .id(targetBoard.getId())
                .title(targetBoard.getTitle())
                .content(targetBoard.getContent())
                .userId(targetUser.getId())
                .userMbti(targetUser.getMbti())
                .userBirth(targetUser.getBirth())
                .cmntNum(commentNum)
                .category(targetBoard.getCategory())
                .img(targetBoard.getImg())
                .createdDateTime(targetBoard.getCreatedDateTime())
                .likeNum(likeNum)
                .build();
    }

    // 게시글 삭제
    @Transactional
    public BoardDeleteServiceResponseDto deleteBoard(Integer id) {
        Board targetBoard = boardRepository.findById(id)
                .orElseThrow(()->new CustomException("해당하는 게시글이 존재하지 않습니다."));
        boardRepository.delete(targetBoard);

        return BoardDeleteServiceResponseDto.builder()
                .id(targetBoard.getId())
                .build();
    }

    // 게시글 조회
    @Transactional(readOnly = true)
    public BoardResponseDto getBoard(Integer id) {
        Board targetBoard = boardRepository.findById(id)
                .orElseThrow(()->new CustomException("해당하는 게시글이 존재하지 않습니다."));

        Integer likeNum = boardLikeRepository.getNumByBoardId(id);
        Integer commentNum = boardRepository.getCmntNumByBoardId(id);

        return new BoardResponseDto(targetBoard, likeNum, commentNum);
    }

    // 카테고리별 게시글 리스트 조회
    @Transactional(readOnly = true)
    public List<BoardResponseDto> getBoardsByCategory(String category) {
        char[] targetCategory = category.toCharArray();
        char[] categoryArr = new char[8];

        for (int i=0; i<8; i++) {
            if (targetCategory.length > i) {
                categoryArr[i] = targetCategory[i];
            } else {
                categoryArr[i] = 'O';
            }
        }

        if (categoryArr[0] == 'X') {
            categoryArr[0] = 'E';
            categoryArr[4] = 'I';
        }
        if (categoryArr[1] == 'X') {
            categoryArr[1] = 'S';
            categoryArr[5] = 'N';
        }
        if (categoryArr[2] == 'X') {
            categoryArr[2] = 'T';
            categoryArr[6] = 'F';
        }
        if (categoryArr[3] == 'X') {
            categoryArr[3] = 'J';
            categoryArr[7] = 'P';
        }

        List<Board> targetBoards = boardRepository.findBoardsByCategory(categoryArr[0], categoryArr[1], categoryArr[2], categoryArr[3], categoryArr[4], categoryArr[5], categoryArr[6], categoryArr[7])
                .orElseThrow(()->new CustomException("해당하는 게시글이 존재하지 않습니다."));
        List<BoardResponseDto> dtoList = new ArrayList<>();

        for (Board boards : targetBoards) {

            Integer likeNum = boardLikeRepository.getNumByBoardId(boards.getId());
            Integer commentNum = boardRepository.getCmntNumByBoardId(boards.getId());

            BoardResponseDto dto = BoardResponseDto.builder()
                    .id(boards.getId())
                    .title(boards.getTitle())
                    .content(boards.getContent())
                    .userId(boards.getUser().getId())
                    .userMbti(boards.getUser().getMbti())
                    .userBirth(boards.getUser().getBirth())
                    .cmntNum(commentNum)
                    .category(boards.getCategory())
                    .img(boards.getImg())
                    .createdDateTime(boards.getCreatedDateTime())
                    .likeNum(likeNum)
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }
}
