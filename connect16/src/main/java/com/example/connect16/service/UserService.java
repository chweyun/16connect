package com.example.connect16.service;

import com.example.connect16.domain.user.User;
import com.example.connect16.domain.user.UserRepository;
import com.example.connect16.dto.user.UserLoginRequestDto;
import com.example.connect16.dto.user.UserRegisterRequestDto;
import com.example.connect16.dto.user.UserUpdateRequestDto;
import com.example.connect16.utils.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@RequiredArgsConstructor
@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    // 로그인
    @Transactional(readOnly = true)
    public User login(UserLoginRequestDto userLoginRequestDto){
        User targetUser = userRepository.findUserById(userLoginRequestDto.getId())
                .orElseThrow(()->new CustomException("해당하는 id가 없습니다. id를 다시 확인해주세요!"));

        if(!Objects.equals(targetUser.getPw(), userLoginRequestDto.getPw())){
            throw new CustomException("비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해주세요!");
        }
        return targetUser;
    }

    @Transactional
    public User getUser(String id) {
        User targetUser = userRepository.findUserById(id)
                .orElseThrow(()->new CustomException("해당하는 id를 가진 사용자가 없습니다."));
        return targetUser;
    }

    // 회원가입
    @Transactional
    public String signup(UserRegisterRequestDto userRegisterRequestDto){
        return userRepository.save(userRegisterRequestDto.toEntity()).getId();
    }

    // 아이디 중복확인
    @Transactional
    public Boolean checkIdDuplicated(String id) {
        return userRepository.existsUserById(id);
    }

    // 회원정보 수정
    @Transactional
    public String updateById(String id, UserUpdateRequestDto userUpdateRequestDto) {
        User targetUser = userRepository.findUserById(id)
                .orElseThrow(()->new CustomException("해당하는 유저가 존재하지 않습니다."));

        targetUser.updateUser(userUpdateRequestDto.toEntity());
        return userRepository.save(targetUser).getId();
    }

    // 회원 탈퇴
    @Transactional
    public String deleteUser(UserLoginRequestDto userLoginRequestDto) {
        User targetUser = userRepository.findUserById(userLoginRequestDto.getId())
                .orElseThrow(()->new CustomException("해당하는 id가 없습니다. id를 다시 확인해주세요!"));

        if(!Objects.equals(targetUser.getPw(), userLoginRequestDto.getPw())){
            throw new CustomException("비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해주세요!");
        }

        userRepository.delete(targetUser);
        return targetUser.getId();
    }

}
