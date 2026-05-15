package org.example.duplo.dto.book;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookItemDTO {
    private String id;
    private String title;
    private String author;
    private String text;
    private LocalDateTime createdAt;
}