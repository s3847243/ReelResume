package com.reelresume.reelresume.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reelresume.reelresume.dto.PitchDTO;
import com.reelresume.reelresume.model.Pitch;
import com.reelresume.reelresume.repository.PitchRepository;
import com.reelresume.reelresume.service.PitchService;

@RestController
@RequestMapping("/view")
public class ViewController {

    @Autowired
    private PitchRepository pitchRepository;

    @Autowired
    private PitchService pitchService;

    @GetMapping("/{slug}")
    public ResponseEntity<PitchDTO> viewPublicPitch(@PathVariable String slug) {
        Pitch pitch = pitchRepository.findBySlug(slug)
                .filter(Pitch::isPaid)
                .orElseThrow(() -> new RuntimeException("Pitch not found or not paid"));

        return ResponseEntity.ok(pitchService.toDto(pitch));
    }
}
