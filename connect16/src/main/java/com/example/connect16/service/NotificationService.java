package com.example.connect16.service;

import com.example.connect16.domain.comment.Comment;
import com.example.connect16.domain.notification.Notification;
import com.example.connect16.domain.notification.NotificationRepository;
import com.example.connect16.dto.comment.CommentUpdateRequestDto;
import com.example.connect16.utils.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class NotificationService {
    @Autowired
    private final NotificationRepository notificationRepository;

    @Transactional
    public void updateNotif(Integer notifId) {
        Notification targetNotif = notificationRepository.findById(notifId)
                .orElseThrow(()->new CustomException("해당하는 알림이 존재하지 않습니다."));
        targetNotif.updateNotif();
    }
}
