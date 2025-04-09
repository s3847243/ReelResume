package com.reelresume.reelresume.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.reelresume.reelresume.dto.CreatePitchRequest;
import com.reelresume.reelresume.dto.PitchDTO;
import com.reelresume.reelresume.model.Pitch;
import com.reelresume.reelresume.repository.PitchRepository;
import com.reelresume.reelresume.utils.SlugGenerator;

@Service
public class PitchService {

    @Autowired
    private PitchRepository pitchRepository;
    public PitchDTO toDto(Pitch pitch) {
        return new PitchDTO(
            pitch.getId(),
            pitch.getVideoUrl(),
            pitch.getResumeUrl(),
            pitch.getScreenRecordingUrl(),
            pitch.getSlug(),
            pitch.getLinkType(),
            pitch.isPaid(),
            pitch.getCreatedAt()
        );
    }
    public Pitch createPitchFromRequest(CreatePitchRequest request) {
        Pitch pitch = new Pitch();
        pitch.setVideoUrl(request.getVideoUrl());
        pitch.setScreenRecordingUrl(request.getScreenRecordingUrl());
        pitch.setResumeUrl(request.getResumeUrl());
        pitch.setLinkType(request.getLinkType());
        pitch.setPaid(false);
        pitch.setCreatedAt(LocalDateTime.now());

        // Handle slug
        if (request.getSlug() == null || request.getSlug().isBlank()) {
            String generatedSlug;
            do {
                generatedSlug = SlugGenerator.generateRandomSlug();
            } while (pitchRepository.existsBySlug(generatedSlug));
            pitch.setSlug(generatedSlug);
        } else {
            if (pitchRepository.existsBySlug(request.getSlug())) {
                throw new IllegalArgumentException("Custom slug is already taken.");
            }
            pitch.setSlug(request.getSlug());
        }

        return pitchRepository.save(pitch);
    }

    @Cacheable(value = "pitchBySlug", key = "#slug")
    public Pitch getPitchBySlug(String slug) {
        Optional<Pitch> pitch = pitchRepository.findBySlug(slug);
        System.out.println("❗ Fetching from MongoDB...");
        return pitch.orElseThrow(() -> new RuntimeException("Pitch not found"));
    }
    public Pitch getPitchBySessionId(String sessionId) {
        return pitchRepository.findByStripeSessionId(sessionId);
    }
    public boolean checkSlugAvailability(String slug){
        return pitchRepository.existsBySlug(slug);
    }
}