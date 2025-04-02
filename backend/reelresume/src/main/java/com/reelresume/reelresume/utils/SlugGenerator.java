package com.reelresume.reelresume.utils;

import java.util.UUID;

public class SlugGenerator {
    public static String generateRandomSlug() {
        return UUID.randomUUID().toString().substring(0, 6); // e.g., "d4f8a2"
    }
}