package com.reelresume.reelresume.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reelresume.reelresume.model.Pitch;
import com.reelresume.reelresume.repository.PitchRepository;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;

@RestController
@RequestMapping("/webhook")
public class WebhookController {

    @Value("${stripe.api.secret-key}")
    private String stripeSecretKey;

    @Value("${stripe.api.webhook-secret}")
    private String endpointSecret;

    private final PitchRepository pitchRepository;

    public WebhookController(PitchRepository pitchRepository) {
        this.pitchRepository = pitchRepository;
    }

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
                                                      @RequestHeader("Stripe-Signature") String sigHeader) {
        Stripe.apiKey = stripeSecretKey;

        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (SignatureVerificationException e) {
            return ResponseEntity.badRequest().body("Webhook signature verification failed.");
        }

        if ("checkout.session.completed".equals(event.getType())) {
            Session session = (Session) event.getDataObjectDeserializer()
                    .getObject()
                    .orElse(null);

            if (session != null) {
                String sessionId = session.getId();
                Optional<Pitch> pitchOpt = pitchRepository.findAll().stream()
                        .filter(p -> sessionId.equals(p.getStripeSessionId()))
                        .findFirst();

                pitchOpt.ifPresent(pitch -> {
                    pitch.setPaid(true);
                    pitchRepository.save(pitch);
                });
            }
        }

        return ResponseEntity.ok("Received");
    }
}