import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Library from './pages/Library'
import Reader from './pages/Reader'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/reader/:id" element={<Reader />} />
      </Routes>
    </BrowserRouter>
  )
}