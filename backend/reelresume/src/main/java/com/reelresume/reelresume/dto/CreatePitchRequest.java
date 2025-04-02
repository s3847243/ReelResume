package com.reelresume.reelresume.dto;

import lombok.Data;

@Data
public class CreatePitchRequest {
    private String videoUrl;
    private String resumeUrl;
    private String slug;      // optional (can be generated)
    private String linkType;  // "default" or "custom"
}