package com.reelresume.reelresume.controllers;

import java.util.Optional;

import org.json.JSONObject;
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
import com.stripe.model.EventDataObjectDeserializer;
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
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {
    
        Stripe.apiKey = stripeSecretKey;
    
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (SignatureVerificationException e) {
            System.out.println("❌ Webhook signature verification failed");
            return ResponseEntity.badRequest().body("Invalid signature");
        }
    
        if ("checkout.session.completed".equals(event.getType())) {
            try {
                // ✅ Extract session ID from raw JSON
                JSONObject json = new JSONObject(payload);
                String sessionId = json.getJSONObject("data").getJSONObject("object").getString("id");
    
                // ✅ Fetch full session from Stripe API
                Session session = Session.retrieve(sessionId);
                System.out.println("✅ Stripe session retrieved: " + session.getId());
    
                Pitch pitch = pitchRepository.findByStripeSessionId(session.getId());
    
                if (pitch != null) {
                    pitch.setPaid(true);
                    pitchRepository.save(pitch);
                    System.out.println("✅ Pitch marked as paid for slug: " + pitch.getSlug());
                } else {
                    System.out.println("❌ No pitch found with sessionId: " + session.getId());
                }
    
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Webhook processing failed");
            }
        }
    
        return ResponseEntity.ok("Received");
    }
}