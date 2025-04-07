package com.reelresume.reelresume.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reelresume.reelresume.dto.CreatePitchRequest;
import com.reelresume.reelresume.dto.PitchDTO;
import com.reelresume.reelresume.model.Pitch;
import com.reelresume.reelresume.repository.PitchRepository;
import com.reelresume.reelresume.service.PitchService;

@RestController
@RequestMapping("/api/pitch")
public class PitchController {

    @Autowired
    private PitchService pitchService;

    @PostMapping
    public ResponseEntity<PitchDTO> createPitch(@RequestBody CreatePitchRequest request) {
        Pitch pitch = pitchService.createPitchFromRequest(request);
        return ResponseEntity.status(201).body(pitchService.toDto(pitch));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PitchDTO> getPitch(@PathVariable String slug) {
        Pitch pitch = pitchService.getPitchBySlug(slug);
        return ResponseEntity.ok(pitchService.toDto(pitch));
    }
    @GetMapping("/by-session/{sessionId}")
    public ResponseEntity<PitchDTO> getPitchBySession(@PathVariable String sessionId) {
        Pitch pitch = pitchService.getPitchBySessionId(sessionId);
        if (pitch == null || !pitch.isPaid()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pitchService.toDto(pitch));
    }
    @GetMapping("/slug/{slug}")
    public ResponseEntity<PitchDTO> getBySlug(@PathVariable String slug) {
        Pitch pitch = pitchService.getPitchBySlug(slug);
        if (pitch == null || !pitch.isPaid()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pitchService.toDto(pitch));
    }
}