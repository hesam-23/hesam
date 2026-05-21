import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { books } from '../data/books'

export default function Reader() {
  const { id } = useParams()
  const navigate = useNavigate()
  const book = books.find((b) => b.id === Number(id))

  // ── State ────────────────────────────────────────────────────────────────
  const [selectedWord, setSelectedWord]     = useState('')
  const [isSpeaking, setIsSpeaking]         = useState(false)
  const [isPaused, setIsPaused]             = useState(false)
  const [currentSentence, setCurrentSentence] = useState(-1)
  const [grammarResult, setGrammarResult]   = useState('')
  const [exampleResult, setExampleResult]   = useState('')
  const [translation, setTranslation]       = useState('')
  const [isTranslating, setIsTranslating]   = useState(false)
  const [savedWords, setSavedWords]         = useState([])
  const [toast, setToast]                   = useState('')
  const [showMyWords, setShowMyWords]       = useState(false)

  const synthRef      = useRef(window.speechSynthesis)
  const sentencesRef  = useRef([])
  const sentenceIdxRef = useRef(0)

  // Split book content into sentences
  const [sentences, setSentences] = useState([])

useEffect(() => {
    if (book && book.content) {
      const s = book.content.match(/[^.!?]+[.!?]+/g) || [book.content]
      sentencesRef.current = s
      setSentences(s)
    }
    return () => synthRef.current.cancel()
  }, [book])

  // ── TTS — sentence by sentence ───────────────────────────────────────────
  function speakFrom(index) {

    if (index >= sentences.length) {
      setIsSpeaking(false)
      setCurrentSentence(-1)
      sentenceIdxRef.current = 0
      return
    }
    setCurrentSentence(index)
    sentenceIdxRef.current = index

    const utterance = new SpeechSynthesisUtterance(sentences[index])
    utterance.lang = 'en-US'
    utterance.rate = 0.9

    // Pick American English voice if available
    const voices = synthRef.current.getVoices()
    const usVoice = voices.find(v => v.lang === 'en-US')
    if (usVoice) utterance.voice = usVoice

    utterance.onend = () => {
      if (!synthRef.current.paused) {
        speakFrom(index + 1)
      }
    }
    synthRef.current.speak(utterance)
  }

  function handlePlay() {
    if (isPaused) {
      synthRef.current.resume()
      setIsPaused(false)
      setIsSpeaking(true)
      return
    }
    synthRef.current.cancel()
    setIsSpeaking(true)
    setIsPaused(false)
    speakFrom(sentenceIdxRef.current)
  }

  function handlePause() {
    synthRef.current.pause()
    setIsPaused(true)
    setIsSpeaking(false)
  }

  function handleStop() {
    synthRef.current.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
    setCurrentSentence(-1)
    sentenceIdxRef.current = 0
  }

  // ── Word selection ────────────────────────────────────────────────────────
  function handleTextSelect() {
    const selection = window.getSelection().toString().trim()
    if (selection.length > 0 && selection.split(' ').length <= 4) {
      setSelectedWord(selection)
      setGrammarResult('')
      setExampleResult('')
      setTranslation('')
    }
  }

  // ── Grammar ───────────────────────────────────────────────────────────────
  function handleGrammar() {
    if (!selectedWord) return
    const word = selectedWord.toLowerCase()
    let result = `Word: "${selectedWord}"\n`
    if (word.endsWith('ing'))      result += 'Form: Present participle / Gerund\nUse: Describes ongoing action'
    else if (word.endsWith('ed'))  result += 'Form: Past tense / Past participle\nUse: Describes completed action'
    else if (word.endsWith('ly'))  result += 'Form: Adverb\nUse: Describes how something is done'
    else if (word.endsWith('s') && word.length > 3) result += 'Form: Plural noun or 3rd-person verb\nUse: More than one, or he/she/it does'
    else result += 'Form: Base form\nUse: Root word — verb, noun, or adjective'
    setGrammarResult(result)
    setExampleResult('')
    setTranslation('')
  }

  // ── Example ───────────────────────────────────────────────────────────────
  function handleExample() {
    if (!selectedWord) return
    const word = selectedWord
    const examples = [
      `She looked at the ${word} carefully.`,
      `The ${word} was unlike anything he had seen before.`,
      `Every morning, she thought about the ${word}.`,
      `It was the ${word} that changed everything.`,
      `He never forgot the feeling of that ${word}.`,
    ]
    setExampleResult(examples[Math.floor(Math.random() * examples.length)])
    setGrammarResult('')
    setTranslation('')
  }

  // ── Translate ─────────────────────────────────────────────────────────────
  async function handleTranslate() {
    if (!selectedWord) return
    setIsTranslating(true)
    setTranslation('')
    setGrammarResult('')
    setExampleResult('')
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(selectedWord)}&langpair=en|fa`
      )
      const data = await res.json()
      const translated = data?.responseData?.translatedText
      setTranslation(translated || 'Translation not found.')
    } catch {
      setTranslation('Connection error. Try again.')
    } finally {
      setIsTranslating(false)
    }
  }

  // ── Save Word ─────────────────────────────────────────────────────────────
  function handleSave() {
    if (!selectedWord) return
    const already = savedWords.find(w => w.word === selectedWord)
    if (already) {
      showToast('Already saved!')
      return
    }
    setSavedWords(prev => [...prev, {
      id: Date.now(),
      word: selectedWord,
      meaning: translation || grammarResult || '—',
    }])
    showToast('Saved ✓')
  }

  function handleDelete(wordId) {
    setSavedWords(prev => prev.filter(w => w.id !== wordId))
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }

  // ── Not found ─────────────────────────────────────────────────────────────
  if (!book) {
    return (
      <div className="reader reader--not-found">
        <p>Book not found.</p>
        <button className="reader__back" onClick={() => navigate('/')}>← Back to Library</button>
      </div>
    )
  }

  const isPlaceholder = book.content === ''
  

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="reader">

      {/* Toast */}
      {toast && <div className="reader__toast">{toast}</div>}

      {/* Nav */}
      <nav className="reader__nav">
        <button className="reader__back" onClick={() => { handleStop(); navigate('/') }}>
          ← Library
        </button>
        <button
          className={`reader__mywords-btn ${showMyWords ? 'reader__mywords-btn--active' : ''}`}
          onClick={() => setShowMyWords(v => !v)}
        >
          My Words {savedWords.length > 0 && <span className="reader__badge">{savedWords.length}</span>}
        </button>
      </nav>

      {/* My Words Panel */}
      {showMyWords && (
        <div className="reader__mywords">
          <p className="reader__panel-label">My Words</p>
          {savedWords.length === 0 ? (
            <p className="reader__mywords-empty">No words saved yet.</p>
          ) : (
            <div className="reader__mywords-list">
              {savedWords.map(w => (
                <div key={w.id} className="reader__mywords-item">
                  <div>
                    <p className="reader__mywords-word">{w.word}</p>
                    <p className="reader__mywords-meaning">{w.meaning}</p>
                  </div>
                  <button className="reader__mywords-delete" onClick={() => handleDelete(w.id)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="reader__layout">

        {/* ── Left: Reading area ── */}
        <div className="reader__left">

          <header className="reader__header">
            <p className="reader__type">{book.type}</p>
            <h1 className="reader__title">{book.title}</h1>
            <p className="reader__duration">{book.duration}</p>
          </header>

          <div className="reader__summary">
            <p className="reader__summary-label">Summary</p>
            <p className="reader__summary-text">{book.summary}</p>
          </div>

          <main className="reader__text-area" onMouseUp={handleTextSelect} onTouchEnd={handleTextSelect}>
            {isPlaceholder ? (
              <div className="reader__placeholder">
                <p>This book is not available yet.</p>
                <p>Check back soon.</p>
              </div>
            ) : (
              sentences.map((sentence, i) => (
                <span
                  key={i}
                  className={`reader__sentence ${currentSentence === i ? 'reader__sentence--active' : ''}`}
                >
                  {sentence}{' '}
                </span>
              ))
            )}
          </main>

        </div>

        {/* ── Right: Tools panel ── */}
        <aside className="reader__panel">

          {/* TTS Controls */}
          <div className="reader__tts">
            <p className="reader__panel-label">Read Aloud</p>
            <div className="reader__tts-buttons">
              <button
                className={`reader__btn reader__btn--tts ${isSpeaking ? 'reader__btn--active' : ''}`}
                onClick={isSpeaking ? handlePause : handlePlay}
                disabled={isPlaceholder}
              >
                {isSpeaking ? '⏸ Pause' : isPaused ? '▶ Resume' : '🔊 Play'}
              </button>
              <button
                className="reader__btn reader__btn--stop"
                onClick={handleStop}
                disabled={!isSpeaking && !isPaused}
              >
                ⏹
              </button>
            </div>
          </div>

          <div className="reader__divider" />

          {/* Word input */}
          <div className="reader__word-section">
            <p className="reader__panel-label">Selected Word</p>
            <input
              className="reader__word-input"
              type="text"
              placeholder="Select a word from text..."
              value={selectedWord}
              onChange={(e) => {
                setSelectedWord(e.target.value)
                setGrammarResult('')
                setExampleResult('')
                setTranslation('')
              }}
            />
          </div>

          {/* Action buttons */}
          <div className="reader__actions">
            <button className="reader__btn reader__btn--action" onClick={handleGrammar} disabled={!selectedWord}>
              🧠 Grammar
            </button>
            <button className="reader__btn reader__btn--action" onClick={handleExample} disabled={!selectedWord}>
              ✍️ Example
            </button>
            <button className="reader__btn reader__btn--action" onClick={handleTranslate} disabled={!selectedWord || isTranslating}>
              {isTranslating ? '...' : '🌍 Translate'}
            </button>
            <button className="reader__btn reader__btn--save" onClick={handleSave} disabled={!selectedWord}>
              💾 Save Word
            </button>
          </div>

          {/* Result box */}
          {(grammarResult || exampleResult || translation) && (
            <div className="reader__result">
              <p className="reader__result-text">
                {translation
                  ? `🌍 ${translation}`
                  : grammarResult || exampleResult}
              </p>
            </div>
          )}

        </aside>
      </div>
    </div>
  )
}