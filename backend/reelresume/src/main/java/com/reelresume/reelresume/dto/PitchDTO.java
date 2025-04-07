package com.reelresume.reelresume.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PitchDTO {
    private String id;
    private String videoUrl;
    private String resumeUrl;
    private String screenRecordingUrl;
    private String slug;
    private String linkType;
    private boolean isPaid;
    private LocalDateTime createdAt;
}

