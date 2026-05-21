import { useNavigate } from 'react-router-dom'

export default function BookCard({ book }) {
  const navigate = useNavigate()
  const isReal = book.content !== ''

  return (
    <div
      className={`book-card ${!isReal ? 'book-card--placeholder' : ''}`}
      onClick={() => navigate(`/reader/${book.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/reader/${book.id}`)}
      aria-label={`Open ${book.title}`}
    >
      {/* Book Cover / Image Area */}
      <div className="book-card__cover">
        <div className="book-card__cover-inner">
          {isReal ? (
            <span className="book-card__cover-icon">📖</span>
          ) : (
            <span className="book-card__cover-icon book-card__cover-icon--dim">○</span>
          )}
        </div>
      </div>

      {/* Book Info */}
      <div className="book-card__info">
        <p className="book-card__type">{book.type}</p>
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__duration">{book.duration}</p>
      </div>
    </div>
  )
}