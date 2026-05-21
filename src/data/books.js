// ─── Data Structure for Books ───────────────────────────────────────────────
// Each book has: id, title, type, duration, content, summary
// Currently: 1 real book + 11 placeholders

export const books = [
  // ── Real Book ────────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'The Lost Garden',
    type: 'Story',
    duration: '5 min read',
    content: `Once upon a time, there was a small garden hidden behind an old stone wall. Nobody remembered who had planted it, but every spring, roses bloomed there in deep red and pale white.

A young girl named Lily discovered it one afternoon while chasing a butterfly. She pushed open the rusty gate and stepped inside. The air smelled of rain and sweet flowers.

In the center of the garden stood a stone bench, and on it lay an old book. Lily sat down and opened it carefully. The pages were yellow with age, but the words were clear:

"To whoever finds this place — this garden belongs to you now. Take care of it, and it will take care of you."

Lily smiled and looked around at the roses, the old trees, and the soft green moss on the walls. She had found something quiet and beautiful in the middle of a busy world.

She came back every day after that. And the garden, just as the book had promised, always made her feel better.`,
    summary: 'A girl discovers a hidden garden and finds peace in its quiet beauty.',
  },

  // ── Placeholders ─────────────────────────────────────────────────────────
  {
    id: 2,
    title: 'Morning Light',
    type: 'Story',
    duration: '4 min read',
    content: '',
    summary: 'Coming soon.',
  },
  {
    id: 3,
    title: 'The Old Bridge',
    type: 'Story',
    duration: '6 min read',
    content: '',
    summary: 'Coming soon.',
  },
  {
    id: 4,
    title: 'Blue Notebook',
    type: 'Journal',
    duration: '3 min read',
    content: '',
    summary: 'Coming soon.',
  },
  {
    id: 5,
    title: 'Quiet Town',
    type: 'Story',
    duration: '7 min read',
    content: '',
    summary: 'Coming soon.',
  },
  {
    id: 6,
    title: 'One Summer',
    type: 'Story',
    duration: '5 min read',
    content: '',
    summary: 'Coming soon.',
  },
  {
    id: 7,
    title: 'The Letter',
    type: 'Story',
    duration: '4 min read',
    content: '',
    summary: 'Coming soon.',
  },
  {
    id: 8,
    title: 'Green Hills',
    type: 'Nature',
    duration: '6 min read',
    content: '',
    summary: 'Coming soon.',
  },
  {
    id: 9,
    title: 'First Snow',
    type: 'Story',
    duration: '5 min read',
    content: '',
    summary: 'Coming soon.',
  },
  {
    id: 10,
    title: 'The Clock Tower',
    type: 'Story',
    duration: '8 min read',
    content: '',
    summary: 'Coming soon.',
  },
  {
    id: 11,
    title: 'Paper Boats',
    type: 'Story',
    duration: '3 min read',
    content: '',
    summary: 'Coming soon.',
  },
  {
    id: 12,
    title: 'Wild Flowers',
    type: 'Nature',
    duration: '4 min read',
    content: '',
    summary: 'Coming soon.',
  },
]

export const realBooksCount = books.filter((b) => b.content !== '').length