//import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './contexts/ToastContext'
import Topbar from './components/layout/TopBar'
import MovieList from './pages/MovieList'
import MovieCreate from './pages/MovieCreate'
import MovieEdit from './pages/MovieEdit'
import GenderList from './pages/GenderList'
import MovieDetail from './pages/MovieDetail'

function App() {
  return (
    <ToastProvider>
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/new" element={<MovieCreate />} />
          <Route path="/movies/edit/:id" element={<MovieEdit />} />
          <Route path="/movies/get/:id" element={<MovieDetail />} />
          <Route path="/genders" element={<GenderList />} />
        </Routes>
      </Router>
    </ToastProvider>
  )
}

export default App  