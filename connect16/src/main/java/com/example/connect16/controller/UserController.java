package com.example.connect16.controller;

import com.example.connect16.domain.user.User;
import com.example.connect16.dto.user.*;
import com.example.connect16.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/api/v1/auth")
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable String id) {
        User targetUser = userService.getUser(id);
        return ResponseEntity.ok(new UserResponseDto(targetUser));
    }

    // 로그인
    @PostMapping( "/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<UserLoginResponseDto> login(@RequestBody @Valid UserLoginRequestDto userLoginRequestDto){
        User targetUser = userService.login(userLoginRequestDto);
        return ResponseEntity.ok(new UserLoginResponseDto(targetUser));
    }

    // 회원가입
    @PostMapping("/signup")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<UserSignUpResponseDto> signup(@RequestBody @Valid UserRegisterRequestDto userRegisterRequestDto) {
        String targetId = userService.signup(userRegisterRequestDto);
        return ResponseEntity.ok(new UserSignUpResponseDto(targetId));
    }

    // 아이디 중복확인
    @GetMapping("/signup/exists/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Boolean> checkIdDuplicated(@PathVariable String id) {
        return ResponseEntity.ok(userService.checkIdDuplicated(id));
    }

    // 회원 정보 수정
    @PatchMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<UserSignUpResponseDto> updateUser(
            @PathVariable("id") String id,
            @RequestBody @Valid UserUpdateRequestDto userUpdateRequestDto) {
        userService.updateById(id, userUpdateRequestDto);
        return ResponseEntity.ok(new UserSignUpResponseDto(id));
    }

    // 회원 탈퇴
    @DeleteMapping()
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<UserSignUpResponseDto> deleteUser(
            @RequestBody UserLoginRequestDto userLoginRequestDto) {
        String targetId = userService.deleteUser(userLoginRequestDto);
        return ResponseEntity.ok(new UserSignUpResponseDto(targetId));
    }

    // 로그아웃
//    @PostMapping("/logout")
//    public ResponseEntity<UserResponseDto> logout(
//            @RequestBody UserLoginRequestDto userLoginRequestDto) {
//
//    }


}