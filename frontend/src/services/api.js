import axios from 'axios'

// Base URL vem do .env (VITE_API_URL). Fallback para localhost em dev.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

/**
 * Cliente axios partilhado por toda a aplicação.
 * Centraliza baseURL, headers e tratamento de erros.
 */
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

// Interceptor de resposta: log centralizado de erros.
// No futuro podemos fazer aqui redirect para login em 401, toast em 500, etc.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Servidor respondeu com status fora do range 2xx
      console.error(
        `[API] ${error.response.status} ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        error.response.data
      )
    } else if (error.request) {
      // Pedido foi feito mas sem resposta (servidor offline, CORS, etc.)
      console.error('[API] Sem resposta do servidor:', error.message)
    } else {
      console.error('[API] Erro:', error.message)
    }
    return Promise.reject(error)
  }
)

// ============================================================================
// movies
// ============================================================================
export const moviesApi = {
  /** GET /movies/list */
  list: () => apiClient.get('/movies/list').then(r => r.data),

  /** GET /movies/get/:id */
  getById: (id) => apiClient.get(`/movies/get/${id}`).then(r => r.data),

  /** GET /movies/gender/:genderId */
  getByGender: (genderId) =>
    apiClient.get(`/movies/gender/${genderId}`).then(r => r.data),

  /** POST /movies/create — espera FormData com title, genderId, description, file */
  create: (formData) =>
    apiClient
      .post('/movies/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(r => r.data),

  /** PUT /movies/update/:id — espera FormData */
  update: (id, formData) =>
    apiClient
      .put(`/movies/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(r => r.data),

  /** DELETE /movies/delete/:id */
  remove: (id) => apiClient.delete(`/movies/delete/${id}`).then(r => r.data),
}

// ============================================================================
// GÉNEROS
// ============================================================================
export const gendersApi = {
  /** GET /genders/list */
  list: () => apiClient.get('/genders/list').then(r => r.data),

  /** GET /genders/get/:id */
  getById: (id) => apiClient.get(`/genders/get/${id}`).then(r => r.data),
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Constrói URL absoluta para um asset servido pela API (ex: imagens de uploads).
 * Uso: <img src={assetUrl(movie.image)} />
 */
export const assetUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${BASE_URL}${path}`
}

export default apiClient