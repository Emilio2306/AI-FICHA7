import React, { useEffect, useState } from 'react'
import { assetUrl } from '../../services/api'
import {required, minLength, maxLength, isImage, maxFileSize, validate} from '../../utils/validators'

/**
 * Formulário partilhado entre criação e edição de filmes.
 *
 * Props:
 *   - initialValues: { title, genderId, description } — opcional, para modo "edit"
 *   - currentImage: string | null — caminho da imagem atual (apenas em edit)
 *   - genders: Array<{ id, description }> — opções do select
 *   - onSubmit: (formData: FormData) => Promise<void>
 *   - submitLabel: string — texto do botão (ex: "Criar Filme", "Guardar Alterações")
 *   - submitVariant: 'primary' | 'warning' — cor do botão Bootstrap
 *   - requireImage: boolean — true em create, false em edit
 *   - error: string | null — mensagem de erro a mostrar
 *
 * O componente é "burro": não faz chamadas à API. Quem o usa é que sabe
 * para onde enviar os dados (POST /filme/create vs PUT /filme/update/:id).
 */
function MovieForm({
  initialValues = { title: '', genderId: '', description: '' },
  currentImage = null,
  genders = [],
  onSubmit,
  submitLabel = 'Submeter',
  submitVariant = 'primary',
  requireImage = false,
  error = null,
}) {
  const [form, setForm] = useState(initialValues)
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  // Sincronizar quando o componente pai carrega dados assíncronos (modo edit)
  useEffect(() => {
    setForm(initialValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues.title, initialValues.genderId, initialValues.description])

 const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    // Limpa erro do campo enquanto o user corrige
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: null })
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    if (fieldErrors.file) {
      setFieldErrors({ ...fieldErrors, file: null })
    }
  }
    const validateForm = () => {
    const errors = {
      title: validate([
        required(form.title, 'Título'),
        minLength(form.title, 2, 'Título'),
        maxLength(form.title, 100, 'Título'),
      ]),
      genderId: validate([required(form.genderId, 'Género')]),
      description: validate([
        required(form.description, 'Descrição'),
        minLength(form.description, 10, 'Descrição'),
        maxLength(form.description, 1000, 'Descrição'),
      ]),
      file: validate([
        requireImage ? required(file, 'Imagem') : null,
        isImage(file),
        maxFileSize(file, 5),
      ]),
    }

    setFieldErrors(errors)
    return Object.values(errors).every(e => e === null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('genderId', form.genderId)
    formData.append('description', form.description)
    if (file) formData.append('file', file)

    try {
      await onSubmit(formData)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          type="text"
          name="title"
          className={`form-control ${fieldErrors.title ? 'is-invalid' : ''}`}
          value={form.title}
          onChange={handleChange}
        />
        {fieldErrors.title && (
          <div className="field-error">{fieldErrors.title}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Género</label>
        <select
          name="genderId"
          className={`form-select ${fieldErrors.genderId ? 'is-invalid' : ''}`}
          value={form.genderId}
          onChange={handleChange}
        >
          <option value="">Seleciona um género...</option>
          {genders.map(g => (
            <option key={g.id} value={g.id}>{g.description}</option>
          ))}
        </select>
        {fieldErrors.genderId && (
          <div className="field-error">{fieldErrors.genderId}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Descrição</label>
        <textarea
          name="description"
          className={`form-control ${fieldErrors.description ? 'is-invalid' : ''}`}
          rows={4}
          value={form.description}
          onChange={handleChange}
        />
        <div className="d-flex justify-content-between">
          {fieldErrors.description ? (
            <div className="field-error">{fieldErrors.description}</div>
          ) : <span />}
          <small style={{ color: 'var(--text-muted)' }}>
            {form.description.length}/1000
          </small>
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label">
          {currentImage ? 'Foto atual' : 'Foto'}
        </label>

        {currentImage && (
          <div className="mb-2">
            <img
              src={assetUrl(currentImage)}
              alt="Foto atual"
              className="poster poster-md"
            />
          </div>
        )}

        <input
          type="file"
          className={`form-control ${fieldErrors.file ? 'is-invalid' : ''}`}
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleFileChange}
        />
        {fieldErrors.file ? (
          <div className="field-error">{fieldErrors.file}</div>
        ) : currentImage ? (
          <small style={{ color: 'var(--text-muted)' }}>
            Deixa em branco para manter a foto atual. Máximo 5MB.
          </small>
        ) : (
          <small style={{ color: 'var(--text-muted)' }}>
            PNG, JPG ou WEBP. Máximo 5MB.
          </small>
        )}
      </div>

      <button
        type="submit"
        className={`btn btn-${submitVariant} w-100`}
        disabled={submitting}
      >
        {submitting ? 'A processar...' : submitLabel}
      </button>
    </form>
  )
}

export default MovieForm