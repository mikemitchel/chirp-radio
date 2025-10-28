// src/components/GlobalNotifications.tsx
import CrModal from '../stories/CrModal'
import CrToast from '../stories/CrToast'
import CrButton from '../stories/CrButton'
import { useNotification } from '../contexts/NotificationContext'

export default function GlobalNotifications() {
  const { toastState, modalState, hideModal } = useNotification()

  const handleModalConfirm = () => {
    if (modalState.onConfirm) {
      modalState.onConfirm()
    }
    hideModal()
  }

  const handleModalCancel = () => {
    if (modalState.onCancel) {
      modalState.onCancel()
    }
    hideModal()
  }

  return (
    <>
      {/* Global Modal */}
      <CrModal
        isOpen={modalState.isOpen}
        onClose={handleModalCancel}
        scrimOnClick={handleModalCancel}
        title={modalState.title}
        size={modalState.size}
        showCloseButton={true}
      >
        <div className="cr-modal__body">
          <p className="cr-modal__text">{modalState.message}</p>

          <div className="cr-modal__actions cr-modal__actions--space-between cr-modal__actions--gap">
            <CrButton variant="outline" color="default" size="medium" onClick={handleModalCancel}>
              {modalState.cancelText}
            </CrButton>
            <CrButton variant="solid" color="primary" size="medium" onClick={handleModalConfirm}>
              {modalState.confirmText}
            </CrButton>
          </div>
        </div>
      </CrModal>

      {/* Global Toast */}
      {toastState.isVisible && (
        <CrToast
          title={toastState.message}
          type={toastState.type}
          isVisible={toastState.isVisible}
          onClose={() => (toastState as any).onClose()}
          duration={toastState.duration}
          showDismiss={true}
        />
      )}
    </>
  )
}
