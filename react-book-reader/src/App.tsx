import { useState } from 'react';
import { BookReader } from './components/BookReader';
import { useGetBooksQuery } from './services/booksApi';
import { Book } from './types';
import { useTheme } from './hooks/useTheme';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { data: serverBooks, isLoading, isError, refetch } = useGetBooksQuery();
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [readerControlsVisible, setReaderControlsVisible] = useState(false);

  const openBook = (book: Book) => setActiveBook(book);
  const closeReader = () => setActiveBook(null);

  return (
      <div className="app">
        {!activeBook && (
            <header className="showcase-header">
              <div className="logo">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Readnice
              </div>
              <div className="header-actions">
                <button className="btn btn-secondary" onClick={toggleTheme} title="Toggle Theme">
                  {theme === 'dark' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                      </svg>
                  ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                  )}
                </button>
              </div>
            </header>
        )}

        {!activeBook && (
            <main className="main-content">
              {isLoading && (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Завантаження книг із сервера...
                  </div>
              )}

              {isError && (
                  <div style={{ padding: '2rem' }}>
                    <p style={{ color: '#ef4444', marginBottom: '1rem', fontFamily: 'Crimson Pro, serif', fontSize: '18px' }}>
                      Не вдалося підключитись до сервера.
                    </p>
                    <button className="btn btn-secondary" onClick={refetch}>
                      Спробувати знову
                    </button>
                  </div>
              )}

              {serverBooks && serverBooks.length > 0 && (
                  <>
                    <h2 style={{ marginBottom: '1rem', fontFamily: 'Crimson Pro, serif', fontSize: '24px' }}>
                      Книги ({serverBooks.length})
                    </h2>
                    <div className="library-grid">
                      {serverBooks.map((serverBook, index) => {
                        const book: Book = {
                          id: serverBook.id ?? `server-${index}`,
                          title: serverBook.title ?? 'Без назви',
                          author: serverBook.author ?? '',
                          text: serverBook.text ?? '',
                          createdAt: serverBook.createdAt
                              ? new Date(serverBook.createdAt).getTime()
                              : Date.now(),
                          bookmarks: [],
                        };

                        return (
                            <div
                                key={book.id}
                                className="book-card"
                                onClick={() => openBook(book)}
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
              )}

              {!isLoading && !isError && serverBooks?.length === 0 && (
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'Crimson Pro, serif', fontSize: '20px', color: 'var(--text-secondary)' }}>
                      На сервері поки немає книг.
                    </p>
                  </div>
              )}
            </main>
        )}

        {!activeBook && (
            <footer className="showcase-footer">
              <div className="footer-content">
                <p className="copyright">© {new Date().getFullYear()} Readnice.</p>
                <div className="footer-links">
                  <div className="promotion">
                    <span>Curated by</span>
                    <a href="https://github.com/umuterturk" target="_blank" rel="noopener noreferrer" className="promoted-user">
                      Umut Erturk
                    </a>
                  </div>
                </div>
              </div>
            </footer>
        )}

        {activeBook && (
            <div className="reader-wrapper">
              <button
                  className={`reader-close-btn ${readerControlsVisible ? 'is-visible' : ''}`}
                  onClick={closeReader}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <BookReader
                  id={activeBook.id}
                  text={activeBook.text}
                  title={activeBook.title}
                  author={activeBook.author}
                  bookmarks={[]}
                  onControlsVisibilityChange={setReaderControlsVisible}
                  theme={theme}
                  onToggleTheme={toggleTheme}
                  contentRegion={{ top: 6, bottom: 6, left: 6, right: 6 }}
              />
            </div>
        )}
      </div>
  );
}

export default App;