package com.reelresume.reelresume.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.reelresume.reelresume.utils.FileValidator;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class UploadService {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket}")
    private String bucket;

    @Autowired
    public UploadService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadResume(MultipartFile file) {
        if (!FileValidator.isValidPdf(file)) {
            throw new IllegalArgumentException("Only PDF resumes are allowed.");
        }

        return uploadToS3(file, "resumes/");
    }

    public String uploadVideo(MultipartFile file) {
        if (!FileValidator.isValidVideo(file)) {
            throw new IllegalArgumentException("Invalid video file.");
        }

        return uploadToS3(file, "videos/");
    }

    private String uploadToS3(MultipartFile file, String folder) {
        try {
            String key = folder + UUID.randomUUID() + "_" + file.getOriginalFilename();
    
            // Detect MIME type
            String contentType = file.getContentType();
            if (contentType == null) {
                contentType = "application/octet-stream";
            }
    
            // Set inline display for PDFs
            String disposition = "inline";
            if (!"application/pdf".equals(contentType)) {
                disposition = "attachment"; // fallback for non-PDFs
            }
    
            PutObjectRequest putRequest = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(key)
                    .contentType(contentType)
                    .contentDisposition(disposition)
                    .build();
    
            s3Client.putObject(
                    putRequest,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize())
            );
    
            return "https://" + bucket + ".s3.amazonaws.com/" + key;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file", e);
        }
    }
}