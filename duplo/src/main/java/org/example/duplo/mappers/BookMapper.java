package org.example.duplo.mappers;

import org.example.duplo.dto.book.BookItemDTO;
import org.example.duplo.entities.Book;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookMapper {
    BookItemDTO toDto(Book entity);
}