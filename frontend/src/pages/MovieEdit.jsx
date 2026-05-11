import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:3000'

function MovieEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    genderId: '',
    description: '',
  })
  const [file, setFile] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [genders, setGenders] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, gendersRes] = await Promise.all([
          axios.get(`${API}/movies/movie/${id}`),
          axios.get(`${API}/list-genders/list-genders`)
        ])

        const movie = movieRes.data
        setForm({
          title: movie.title,
          genderId: movie.genderId,
          description: movie.description,
        })
        setCurrentImage(movie.image)
        setGenders(gendersRes.data)
      } catch (err) {
        setError('Erro ao carregar dados do filme.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('genderId', form.genderId)
    formData.append('description', form.description)
    if (file) formData.append('file', file)

    try {
      await axios.put(`${API}/movies/update-movie/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      navigate('/filmes')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao atualizar filme.')
      console.error(err)
    }
  }

  if (loading) return <p className="text-center mt-5">A carregar...</p>
  if (error)   return <p className="text-center mt-5 text-danger">{error}</p>

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1> Editar Filme</h1>
        <Link to="/filmes" className="btn btn-outline-secondary">← Voltar</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Género</label>
          <select
            name="genderId"
            className="form-select"
            value={form.genderId}
            onChange={handleChange}
            required
          >
            <option value="">Seleciona um género...</option>
            {genders.map(g => (
              <option key={g.id} value={g.id}>{g.description}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            name="description"
            className="form-control"
            rows={4}
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Foto atual</label>
          {currentImage && (
            <div className="mb-2">
              <img
                src={`${API}${currentImage}`}
                alt="Foto atual"
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
          )}
          <input
            type="file"
            className="form-control"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleFileChange}
          />
          <small className="text-muted">Deixa em branco para manter a foto atual.</small>
        </div>

        <button type="submit" className="btn btn-warning w-100">
          Guardar Alterações
        </button>
      </form>
    </div>
  )
}

export default MovieEdit