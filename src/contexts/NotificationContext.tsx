// src/contexts/NotificationContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ToastConfig {
  message: string
  type?: 'success' | 'info' | 'warning' | 'error'
  duration?: number
}

interface ModalConfig {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  size?: 'small' | 'default' | 'large'
}

interface NotificationContextType {
  showToast: (config: ToastConfig) => void
  showModal: (config: ModalConfig) => void
  hideModal: () => void
  toastState: {
    isVisible: boolean
    message: string
    type: 'success' | 'info' | 'warning' | 'error'
    duration: number
  }
  modalState: {
    isOpen: boolean
    title: string
    message: string
    confirmText: string
    cancelText: string
    onConfirm?: () => void
    onCancel?: () => void
    size: 'small' | 'default' | 'large'
  }
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [toastState, setToastState] = useState({
    isVisible: false,
    message: '',
    type: 'success' as const,
    duration: 5000,
  })

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: undefined as (() => void) | undefined,
    onCancel: undefined as (() => void) | undefined,
    size: 'small' as const,
  })

  const showToast = ({ message, type = 'success', duration = 5000 }: ToastConfig) => {
    setToastState({
      isVisible: true,
      message,
      type,
      duration,
    })
  }

  const hideToast = () => {
    setToastState((prev) => ({ ...prev, isVisible: false }))
  }

  const showModal = ({
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    size = 'small',
  }: ModalConfig) => {
    setModalState({
      isOpen: true,
      title,
      message,
      confirmText,
      cancelText,
      onConfirm,
      onCancel,
      size,
    })
  }

  const hideModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false, onConfirm: undefined, onCancel: undefined }))
  }

  // Listen for custom toast events from other contexts
  useEffect(() => {
    const handleShowToast = (event: CustomEvent) => {
      showToast(event.detail)
    }

    const handleHideToast = () => {
      hideToast()
    }

    window.addEventListener('chirp-show-toast', handleShowToast as EventListener)
    window.addEventListener('chirp-hide-toast', handleHideToast)
    return () => {
      window.removeEventListener('chirp-show-toast', handleShowToast as EventListener)
      window.removeEventListener('chirp-hide-toast', handleHideToast)
    }
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        showToast,
        showModal,
        hideModal,
        toastState: { ...toastState, onClose: hideToast } as any,
        modalState,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
