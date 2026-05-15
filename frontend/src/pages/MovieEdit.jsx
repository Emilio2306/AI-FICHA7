import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { moviesApi, gendersApi, assetUrl } from '../services/api'
import MovieForm from '../components/movie/MovieForm'

function MovieEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [initialValues, setInitialValues] = useState({
    title: '',
    genderId: '',
    description: '',
  })
  const [currentImage, setCurrentImage] = useState(null)
  const [genders, setGenders] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [submitError, setSubmitError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, gendersRes] = await Promise.all([
          moviesApi.getById(id),
          gendersApi.list()
        ])

       setInitialValues({
          title: movieRes.title,
          genderId: movieRes.genderId,
          description: movieRes.description,
        })
        setCurrentImage(movieRes.image)
        setGenders(gendersRes.data)
      } catch (err) {
        setLoadError('Erro ao carregar dados do movies.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])


  const handleSubmit = async (formData) => {
    try {
      await moviesApi.update(id, formData)
      navigate('/movies')
    } catch (err) {
      setSubmitError(err.response?.data?.error || 'Erro ao atualizar movies.')
    }
  }

  if (loading) return <p className="text-center mt-5">A carregar...</p>
  if (loadError)   return <p className="text-center mt-5 text-danger">{loadError}</p>

 return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Editar Filme</h1>
        <Link to="/movies" className="btn btn-outline-secondary">← Voltar</Link>
      </div>

      <MovieForm
        initialValues={initialValues}
        currentImage={currentImage}
        genders={genders}
        onSubmit={handleSubmit}
        submitLabel="Guardar Alterações"
        submitVariant="primary"
        requireImage={false}
        error={submitError}
      />
    </div>
  )
}

export default MovieEdit