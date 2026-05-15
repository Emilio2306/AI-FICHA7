/**
 * Helpers de validação. Cada função devolve string com a mensagem de erro,
 * ou null se passou.
 */

export const required = (value, fieldName = 'Campo') =>
  !value || !String(value).trim() ? `${fieldName} é obrigatório.` : null

export const minLength = (value, min, fieldName = 'Campo') =>
  value && value.length < min
    ? `${fieldName} deve ter pelo menos ${min} caracteres.`
    : null

export const maxLength = (value, max, fieldName = 'Campo') =>
  value && value.length > max
    ? `${fieldName} deve ter no máximo ${max} caracteres.`
    : null

export const isImage = (file) => {
  if (!file) return null
  const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
  return allowed.includes(file.type)
    ? null
    : 'Formato inválido. Usa PNG, JPG ou WEBP.'
}

export const maxFileSize = (file, maxMB) => {
  if (!file) return null
  const maxBytes = maxMB * 1024 * 1024
  return file.size > maxBytes
    ? `Ficheiro demasiado grande. Máximo ${maxMB}MB.`
    : null
}

/**
 * Corre várias validações e devolve a primeira mensagem de erro (ou null).
 *   validate([
 *     required(title, 'Título'),
 *     minLength(title, 2, 'Título'),
 *   ])
 */
export const validate = (errors) => errors.find(e => e !== null) || null