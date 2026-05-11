import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MovieList from './pages/MovieList'
import MovieCreate from './pages/MovieCreate'
import MovieEdit from './pages/MovieEdit'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/filmes" />} />
        <Route path="/filmes" element={<MovieList />} />
        <Route path="/filmes/novo" element={<MovieCreate />} />
        <Route path="/filmes/editar/:id" element={<MovieEdit />} />
      </Routes>
    </Router>
  )
}

export default App