package com.reelresume.reelresume.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Document(collection = "pitches")
@NoArgsConstructor
@AllArgsConstructor
public class Pitch implements Serializable {
    private static final long serialVersionUID = 1150364811077144114L;

    @Id
    private String id;
    private String videoUrl;
    private String resumeUrl;
    private String slug;
    private boolean isPaid;
    private String linkType;
    private String stripeSessionId;
    private String screenRecordingUrl;
    private LocalDateTime createdAt = LocalDateTime.now();
}
