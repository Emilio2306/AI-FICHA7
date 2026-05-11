import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:3000'

function MovieCreate() {
  const [form, setForm] = useState({
    title: '',
    genderId: '',
    description: '',
  })
  const [file, setFile] = useState(null)
  const [genders, setGenders] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${API}/list-genders/list-genders`)
      .then(res => setGenders(res.data))
      .catch(err => console.error('Erro ao buscar géneros:', err))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('genderId', form.genderId)
    formData.append('description', form.description)
    formData.append('file', file)

    try {
      await axios.post(`${API}/movies/create-movie`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      navigate('/filmes')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar filme.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1> Novo Filme</h1>
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
          <label className="form-label">Foto</label>
          <input
            type="file"
            className="form-control"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'A criar...' : 'Criar Filme'}
        </button>
      </form>
    </div>
  )
}

export default MovieCreate