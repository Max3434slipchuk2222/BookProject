package org.example.duplo.services;

import lombok.RequiredArgsConstructor;
import org.example.duplo.dto.book.BookItemDTO;
import org.example.duplo.mappers.BookMapper;
import org.example.duplo.repositories.IBookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {
    private final IBookRepository bookRepository;
    private final BookMapper bookMapper;

    public List<BookItemDTO> getAll() {
        return bookRepository.findAll()
                .stream()
                .map(bookMapper::toDto)
                .collect(Collectors.toList());
    }
}