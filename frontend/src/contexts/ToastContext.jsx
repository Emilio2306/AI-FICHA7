import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

/**
 * Hook para criar toasts a partir de qualquer componente.
 *   const toast = useToast()
 *   toast.success("Filme criado!")
 *   toast.error("Algo correu mal")
 *   toast.info("A processar...")
 */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast tem de ser usado dentro de <ToastProvider>')
  }
  return ctx
}

let nextId = 1

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const remove = useCallback((id) => {
    setToasts(current => current.filter(t => t.id !== id))
  }, [])

  const push = useCallback((type, message, duration = 4000) => {
    const id = nextId++
    setToasts(current => [...current, { id, type, message }])

    // Auto-dismiss
    if (duration > 0) {
      setTimeout(() => remove(id), duration)
    }
    return id
  }, [remove])

  const toast = {
    success: (msg, duration) => push('success', msg, duration),
    error:   (msg, duration) => push('error', msg, duration),
    info:    (msg, duration) => push('info', msg, duration),
    warning: (msg, duration) => push('warning', msg, duration),
    dismiss: remove,
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={remove} />
    </ToastContext.Provider>
  )
}

// -----------------------------------------------------------------------------
// Componente visual (renderiza a stack de toasts)
// -----------------------------------------------------------------------------
function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast-item toast-${t.type}`}>
          <span className="toast-icon">{iconFor(t.type)}</span>
          <span className="toast-message">{t.message}</span>
          <button
            className="toast-close"
            onClick={() => onDismiss(t.id)}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

function iconFor(type) {
  switch (type) {
    case 'success': return '✓'
    case 'error':   return '✕'
    case 'warning': return '⚠'
    default:        return 'ℹ'
  }
}