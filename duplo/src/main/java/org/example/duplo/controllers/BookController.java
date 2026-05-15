package org.example.duplo.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.duplo.dto.book.BookItemDTO;
import org.example.duplo.services.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@Tag(name = "Books", description = "Книги")
public class BookController {
    private final BookService bookService;

    @Operation(summary = "Отримати список всіх книг")
    @GetMapping
    public ResponseEntity<List<BookItemDTO>> getAll() {
        var items = bookService.getAll();
        return ResponseEntity.ok(items);
    }
}