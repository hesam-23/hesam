import { books, realBooksCount } from '../data/books'
import BookCard from '../components/BookCard'

export default function Library() {
  const safeBooks = Array.isArray(books) ? books : []

  return (
    <div className="library">
      {/* Header */}
      <header className="library__header">
        <div className="library__header-inner">
          <h1 className="library__title">Library</h1>
          <p className="library__count">
            Books available: <span>{realBooksCount ?? safeBooks.length}</span>
          </p>
        </div>
      </header>

      {/* Grid */}
      <main className="library__main">
        <div className="library__grid">
          {safeBooks.length === 0 ? (
            <p>No books found.</p>
          ) : (
            safeBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))
          )}
        </div>
      </main>
    </div>
  )
}