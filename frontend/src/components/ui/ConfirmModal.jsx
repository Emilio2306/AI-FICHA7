import React from 'react'

/**
 * Modal de confirmação genérico
 *
 * Props:
 *   - show: boolean — controla visibilidade
 *   - title: string
 *   - message: string
 *   - confirmLabel: string — texto do botão de confirmação
 *   - confirmVariant: 'danger' | 'primary' | 'warning' — cor do botão
 *   - onConfirm: () => void
 *   - onCancel: () => void
 */
function ConfirmModal({
  show,
  title = 'Confirmar',
  message = 'Tens a certeza?',
  confirmLabel = 'Confirmar',
  confirmVariant = 'danger',
  onConfirm,
  onCancel,
}) {
  if (!show) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        onClick={onCancel}
        style={{ zIndex: 1040 }}
      />

      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onCancel}
              />
            </div>
            <div className="modal-body">
              <p className="mb-0">{message}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancel}
              >
                Cancelar
              </button>
              <button
                type="button"
                className={`btn btn-${confirmVariant}`}
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmModal