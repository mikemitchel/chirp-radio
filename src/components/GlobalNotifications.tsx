// src/components/GlobalNotifications.tsx
import React from 'react';
import CrModal from '../stories/CrModal';
import CrToast from '../stories/CrToast';
import CrButton from '../stories/CrButton';
import { useNotification } from '../contexts/NotificationContext';

export default function GlobalNotifications() {
  const { toastState, modalState, hideModal } = useNotification();

  const handleModalConfirm = () => {
    if (modalState.onConfirm) {
      modalState.onConfirm();
    }
    hideModal();
  };

  const handleModalCancel = () => {
    if (modalState.onCancel) {
      modalState.onCancel();
    }
    hideModal();
  };

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
        <div style={{ padding: 'var(--cr-space-4)' }}>
          <p style={{
            font: 'var(--cr-body-reg)',
            color: 'var(--cr-ink)',
            lineHeight: 1.6,
            marginBottom: 'var(--cr-space-6)'
          }}>
            {modalState.message}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 'var(--cr-space-4)'
          }}>
            <CrButton
              variant="outline"
              color="default"
              size="medium"
              onClick={handleModalCancel}
            >
              {modalState.cancelText}
            </CrButton>
            <CrButton
              variant="solid"
              color="primary"
              size="medium"
              onClick={handleModalConfirm}
            >
              {modalState.confirmText}
            </CrButton>
          </div>
        </div>
      </CrModal>

      {/* Global Toast */}
      {toastState.isVisible && (
        <CrToast
          message={toastState.message}
          type={toastState.type}
          isVisible={toastState.isVisible}
          onClose={() => (toastState as any).onClose()}
          duration={toastState.duration}
        />
      )}
    </>
  );
}
