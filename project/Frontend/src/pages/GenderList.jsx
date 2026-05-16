import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { gendersApi } from '../services/api'
import ConfirmModal from '../components/ui/ConfirmModal'
import { useToast } from '../contexts/ToastContext'

function GenderList() {
  const toast = useToast()
  const [genders, setGenders] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  // Form para adicionar
  const [newDescription, setNewDescription] = useState('')
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState(null)

  // Edição inline
  const [editingId, setEditingId] = useState(null)
  const [editingValue, setEditingValue] = useState('')
  const [editError, setEditError] = useState(null)

  // Eliminação
  const [genderToDelete, setGenderToDelete] = useState(null)

  useEffect(() => {
    fetchGenders()
  }, [])

  const fetchGenders = async () => {
    try {
      const data = await gendersApi.list()
      setGenders(data)
    } catch {
      setLoadError('Erro ao carregar géneros.')
    } finally {
      setLoading(false)
    }
  }

  // -------- CREATE --------
 const handleCreate = async (e) => {
    e.preventDefault()
    if (!newDescription.trim()) return

    setCreateError(null)
    setCreating(true)

    try {
      const created = await gendersApi.create({ description: newDescription.trim() })
      setGenders([...genders, created])
      setNewDescription('')
      toast.success(`Género "${created.description}" criado.`)
    } catch (err) {
      const message = err.response?.data?.error || 'Erro ao criar género.'
      setCreateError(message)
      toast.error(message)
    } finally {
      setCreating(false)
    }
  }
  // -------- EDIT --------
  const startEdit = (gender) => {
    setEditingId(gender.id)
    setEditingValue(gender.description)
    setEditError(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingValue('')
    setEditError(null)
  }

const saveEdit = async (id) => {
    if (!editingValue.trim()) return

    try {
      const updated = await gendersApi.update(id, { description: editingValue.trim() })
      setGenders(genders.map(g => (g.id === id ? { ...g, ...updated } : g)))
      cancelEdit()
      toast.success('Género atualizado.')
    } catch (err) {
      const message = err.response?.data?.error || 'Erro ao guardar.'
      setEditError(message)
      toast.error(message)
    }
  }

  // -------- DELETE --------
const confirmDelete = async () => {
    if (!genderToDelete) return
    const name = genders.find(g => g.id === genderToDelete)?.description || 'género'

    try {
      await gendersApi.remove(genderToDelete)
      setGenders(genders.filter(g => g.id !== genderToDelete))
      toast.success(`Género "${name}" eliminado.`)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erro ao eliminar género.')
    } finally {
      setGenderToDelete(null)
    }
  }

  // -------- RENDER --------
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner" />
        <p className="mt-3" style={{ color: 'var(--text-secondary)' }}>
          A carregar géneros...
        </p>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{loadError}</div>
      </div>
    )
  }

  return (
    <div className="container" style={{ maxWidth: '720px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">Géneros</h1>
          <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
            {genders.length} {genders.length === 1 ? 'género' : 'géneros'} no catálogo
          </p>
        </div>
        <Link to="/movies" className="btn btn-outline-secondary">← Filmes</Link>
      </div>

      {/* Form de criação inline */}
      <div className="surface mb-4">
        <form onSubmit={handleCreate}>
          <label className="form-label">Adicionar novo género</label>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Ficção Científica"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={creating || !newDescription.trim()}
              style={{ whiteSpace: 'nowrap' }}
            >
              {creating ? 'A criar...' : '+ Adicionar'}
            </button>
          </div>
          {createError && (
            <div className="alert alert-danger mt-3 mb-0">{createError}</div>
          )}
        </form>
      </div>

      {/* Lista de géneros */}
      {genders.length === 0 ? (
        <div className="empty-state">
          <p className="mb-2" style={{ fontSize: '1.1rem' }}>🎭</p>
          <p className="mb-0">Ainda não há géneros. Adiciona o primeiro acima.</p>
        </div>
      ) : (
        <div className="gender-list">
          {genders.map((gender) => (
            <div key={gender.id} className="gender-row">
              {editingId === gender.id ? (
                // Modo edição
                <div className="d-flex gap-2 align-items-center w-100">
                  <input
                    type="text"
                    className="form-control"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(gender.id)
                      if (e.key === 'Escape') cancelEdit()
                    }}
                  />
                  <button
                    onClick={() => saveEdit(gender.id)}
                    className="btn btn-sm btn-primary"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                // Modo leitura
                <>
                  <div className="d-flex align-items-center gap-3">
                    <span className="gender-id">#{gender.id}</span>
                    <span className="gender-name">{gender.description}</span>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => startEdit(gender)}
                      className="btn btn-sm btn-warning"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setGenderToDelete(gender.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {editError && (
        <div className="alert alert-danger mt-3">{editError}</div>
      )}

      <ConfirmModal
        show={genderToDelete !== null}
        title="Eliminar género"
        message="Tens a certeza? Filmes associados a este género podem ficar sem categoria."
        confirmLabel="Eliminar"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setGenderToDelete(null)}
      />
    </div>
  )
}

export default GenderList