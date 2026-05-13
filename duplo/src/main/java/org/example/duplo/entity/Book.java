package org.example.duplo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;

    private String author;

    // Використовуємо TEXT, оскільки вміст книги буде великим
    @Column(columnDefinition = "TEXT")
    private String text;

    // Час створення у мілісекундах, як очікує frontend (number)
    private Long createdAt;

    // Зв'язок з закладками. CascadeType.ALL означає, що при збереженні/видаленні книги,
    // її закладки також будуть збережені/видалені
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bookmark> bookmarks;
}