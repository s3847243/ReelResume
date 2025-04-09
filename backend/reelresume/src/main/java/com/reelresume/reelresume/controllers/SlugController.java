package com.reelresume.reelresume.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.reelresume.reelresume.service.PitchService;

@RestController
@RequestMapping("/api/slug")
public class SlugController {
    @Autowired
    PitchService pitchService;

    @GetMapping("/check")
    public ResponseEntity<String> checkSlugAvailability(@RequestParam("value") String slug) {
        boolean isSlugPresent = pitchService.checkSlugAvailability(slug);
        if (isSlugPresent) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Slug is already taken");
        } 
        return ResponseEntity.ok("Slug is available");
    }
    
}
