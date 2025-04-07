package com.reelresume.reelresume.utils;

import org.springframework.web.multipart.MultipartFile;

public class FileValidator {

    public static boolean isValidPdf(MultipartFile file) {
        return file.getContentType().equals("application/pdf");
    }

    public static boolean isValidVideo(MultipartFile file) {
        System.out.println("Received file type: " + file.getContentType());

        return file.getContentType().startsWith("video/");
    }
}