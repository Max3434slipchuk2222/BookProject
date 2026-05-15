package org.example.duplo.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "bookmarks")

public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "bigint")
    private Long id;

    private Integer position;
    private String label;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(name = "created_at", nullable = false, updatable = false,
            columnDefinition = "timestamp")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}