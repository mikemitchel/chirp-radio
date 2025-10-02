// src/components/LoginRequiredModal.tsx
import React from 'react';
import CrModal from '../stories/CrModal';
import CrButton from '../stories/CrButton';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignUp: () => void;
}

export default function LoginRequiredModal({
  isOpen,
  onClose,
  onLogin,
  onSignUp
}: LoginRequiredModalProps) {
  return (
    <CrModal
      isOpen={isOpen}
      onClose={onClose}
      scrimOnClick={onClose}
      title="Login Required"
      size="small"
    >
      <div style={{
        padding: 'var(--cr-space-4)'
      }}>
        <p style={{
          font: 'var(--cr-body-reg)',
          color: 'var(--cr-ink)',
          lineHeight: 1.6,
          marginBottom: 'var(--cr-space-6)'
        }}>
          You need to log in to your CHIRP Radio listener account to be able to add songs to your collection.
        </p>

        <div style={{
          display: 'flex',
          gap: 'var(--cr-space-4)',
          flexWrap: 'wrap'
        }}>
          <CrButton
            variant="solid"
            color="secondary"
            size="medium"
            onClick={onSignUp}
          >
            sign up
          </CrButton>
          <CrButton
            variant="outline"
            color="default"
            size="medium"
            onClick={onLogin}
          >
            log in
          </CrButton>
        </div>
      </div>
    </CrModal>
  );
}
