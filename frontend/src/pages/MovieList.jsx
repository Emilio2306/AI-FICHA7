import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:3000'

function MovieList() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API}/movies/list-movies`)
      setMovies(response.data)
    } catch (err) {
      setError('Erro ao carregar filmes.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Tens a certeza que queres eliminar este filme?')) return

    try {
      await axios.delete(`${API}/movies/delete-movie/${id}`)
      setMovies(movies.filter(movie => movie.id !== id))
    } catch (err) {
      alert('Erro ao eliminar filme.')
      console.error(err)
    }
  }

  if (loading) return <p className="text-center mt-5">A carregar filmes...</p>
  if (error)   return <p className="text-center mt-5 text-danger">{error}</p>

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1> Filmes</h1>
        <Link to="/filmes/novo" className="btn btn-primary">
          + Novo Filme
        </Link>
      </div>

      {movies.length === 0 && (
        <p className="text-muted">Nenhum filme encontrado.</p>
      )}

      {movies.length > 0 && (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>
                  <img
                    src={`${API}${movie.image}`}
                    alt={movie.title}
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                </td>
                <td>{movie.title}</td>
                <td>{movie.description?.substring(0, 80)}...</td>
                <td>
                  <Link
                    to={`/filmes/editar/${movie.id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default MovieList