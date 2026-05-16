package org.example.duplo.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

import java.util.List;

@Data
@Entity
@Table(name = "books")
public class Book {
    @Id
    private String id;

    @Column(nullable = false, length = 255)
    private String title;

    private String author;

    @Lob
    private String text;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bookmark> bookmarks;

}