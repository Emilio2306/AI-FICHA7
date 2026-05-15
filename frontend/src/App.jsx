//import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Topbar from './components/layout/TopBar'
import MovieList from './pages/MovieList'
import MovieCreate from './pages/MovieCreate'
import MovieEdit from './pages/MovieEdit'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/new" element={<MovieCreate />} />
        <Route path="/movies/edit/:id" element={<MovieEdit />} />
      </Routes>
    </Router>
  )
}

export default App  