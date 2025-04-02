package com.reelresume.reelresume.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reelresume.reelresume.service.StripeService;

@RestController
@RequestMapping("/api/pay")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @PostMapping
    public ResponseEntity<?> createCheckout(@RequestBody Map<String, String> payload) throws Exception {
        String pitchId = payload.get("pitchId");
        String linkType = payload.get("linkType");

        String checkoutUrl = stripeService.createCheckoutSession(pitchId, linkType);
        return ResponseEntity.ok(Map.of("checkoutUrl", checkoutUrl));
    }
}