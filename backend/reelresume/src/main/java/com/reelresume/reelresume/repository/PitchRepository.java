package com.reelresume.reelresume.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.reelresume.reelresume.model.Pitch;

public interface PitchRepository extends MongoRepository<Pitch,String> {
    Optional<Pitch> findBySlug(String string);
    boolean existsBySlug(String slug);
    Pitch findByStripeSessionId(String stripeSessionId); 

}
