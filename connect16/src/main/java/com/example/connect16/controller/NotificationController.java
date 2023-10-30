package com.example.connect16.controller;

import com.example.connect16.dto.comment.CommentUpdateRequestDto;
import com.example.connect16.dto.general.MessageDto;
import com.example.connect16.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/api/v1/notification")
public class NotificationController {
    private final NotificationService notificationService;

    // 알림 확인 체크
    @PatchMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<MessageDto> isChecked(
            @PathVariable("id") Integer notifId) {
        notificationService.updateNotif(notifId);
        return ResponseEntity.ok(new MessageDto("댓글을 성공적으로 수정했습니다."));
    }
}
