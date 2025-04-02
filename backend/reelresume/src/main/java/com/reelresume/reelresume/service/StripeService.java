package com.reelresume.reelresume.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.reelresume.reelresume.model.Pitch;
import com.reelresume.reelresume.repository.PitchRepository;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class StripeService {

    @Value("${stripe.api.secret-key}")
    private String stripeSecretKey;

    @Value("${frontend.url}")
    private String frontendUrl;

    private final PitchRepository pitchRepository;

    public StripeService(PitchRepository pitchRepository) {
        this.pitchRepository = pitchRepository;
    }

    public String createCheckoutSession(String pitchId, String linkType) throws Exception {
        Stripe.apiKey = stripeSecretKey;

        Optional<Pitch> pitchOpt = pitchRepository.findById(pitchId);
        if (pitchOpt.isEmpty()) throw new RuntimeException("Pitch not found");

        Pitch pitch = pitchOpt.get();

        long price = linkType.equals("custom") ? 150 : 50;

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(frontendUrl + "/success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(frontendUrl + "/cancel")
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("usd")
                                                .setUnitAmount(price) // cents
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("ReelResume - " + linkType + " link")
                                                                .build())
                                                .build())
                                .build())
                .build();

        Session session = Session.create(params);

        pitch.setStripeSessionId(session.getId());
        pitchRepository.save(pitch);

        return session.getUrl();
    }
}