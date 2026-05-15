import React from 'react';
import { useGetBooksQuery } from '../services/booksApi';
import { Book } from '../types';

interface Props {
    onOpenBook?: (book: Book) => void;
}

export const BookList: React.FC<Props> = ({ onOpenBook }) => {
    const { data: serverBooks, isLoading, isError, refetch } = useGetBooksQuery();

    if (isLoading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                Завантаження книг із сервера...
            </div>
        );
    }

    if (isError) {
        return (
            <div style={{ padding: '1rem 0' }}>
                <p style={{ color: '#ef4444', marginBottom: '1rem', fontFamily: 'Crimson Pro, serif', fontSize: '18px' }}>
                    Не вдалося підключитись до сервера.
                </p>
                <button className="btn btn-secondary" onClick={refetch}>
                    Спробувати знову
                </button>
            </div>
        );
    }

    if (!serverBooks || serverBooks.length === 0) {
        return null;
    }

    return (
        <>
            <h2 style={{ marginBottom: '1rem', fontFamily: 'Crimson Pro, serif', fontSize: '24px' }}>
                Server Books ({serverBooks.length})
            </h2>
            <div className="library-grid">
                {serverBooks.map((serverBook) => {
                    const book: Book = {
                        id: serverBook.id,
                        title: serverBook.title,
                        author: serverBook.author,
                        text: serverBook.text,
                        createdAt: new Date(serverBook.createdAt).getTime(),
                        bookmarks: [],
                    };

                    return (
                        <div
                            key={book.id}
                            className="book-card"
                            onClick={() => onOpenBook?.(book)}
                        >
                            <div>
                                <h3>{book.title}</h3>
                                <p className="author">by {book.author || 'Anonymous'}</p>
                            </div>
                            <div className="meta">
                <span>
                  {new Date(book.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                  })}
                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};