import React, { useEffect, useState } from 'react'
import { assetUrl } from '../../services/api'

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

  // Sincronizar quando o componente pai carrega dados assíncronos (modo edit)
  useEffect(() => {
    setForm(initialValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues.title, initialValues.genderId, initialValues.description])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
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
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}

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
          className="form-control"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleFileChange}
          required={requireImage}
        />

        {currentImage && (
          <small className="text-muted">
            Deixa em branco para manter a foto atual.
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