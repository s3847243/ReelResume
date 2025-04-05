package com.reelresume.reelresume.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.reelresume.reelresume.service.UploadService;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    @Autowired
    private UploadService uploadService;

    @PostMapping("/resume")
    public ResponseEntity<Map<String, String>> uploadResume(@RequestParam("file") MultipartFile file) {
        String resumeUrl = uploadService.uploadResume(file);
        return ResponseEntity.ok(Map.of("resumeUrl", resumeUrl));
    }

    @PostMapping("/video")
    public ResponseEntity<Map<String, String>> uploadVideo(@RequestParam("file") MultipartFile file) {
        String videoUrl = uploadService.uploadVideo(file);
        return ResponseEntity.ok(Map.of("videoUrl", videoUrl));
    }
    @PostMapping("/screen")
    public ResponseEntity<Map<String, String>> uploadScreenRecording(@RequestParam("file") MultipartFile file) {
        String screenUrl = uploadService.uploadVideo(file); // Reuse same logic
        return ResponseEntity.ok(Map.of("screenRecordingUrl", screenUrl));
    }

}