package com.reelresume.reelresume.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.reelresume.reelresume.utils.FileValidator;

@Service
public class UploadService {

    public String uploadResume(MultipartFile file) {
        if (!FileValidator.isValidPdf(file)) {
            throw new IllegalArgumentException("Only PDF resumes are allowed.");
        }

        // TODO: Replace with actual storage logic
        String fakeUrl = "https://example.com/resumes/" + file.getOriginalFilename();
        return fakeUrl;
    }

    public String uploadVideo(MultipartFile file) {
        if (!FileValidator.isValidVideo(file)) {
            throw new IllegalArgumentException("Invalid video file.");
        }

        // TODO: Replace with actual storage logic
        String fakeUrl = "https://example.com/videos/" + file.getOriginalFilename();
        return fakeUrl;
    }
}