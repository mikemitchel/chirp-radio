// src/contexts/NotificationContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { on } from '../utils/eventBus'

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
  const [toastState, setToastState] = useState<{
    isVisible: boolean
    message: string
    type: 'success' | 'info' | 'warning' | 'error'
    duration: number
  }>({
    isVisible: false,
    message: '',
    type: 'success',
    duration: 5000,
  })

  const [modalState, setModalState] = useState<{
    isOpen: boolean
    title: string
    message: string
    confirmText: string
    cancelText: string
    onConfirm?: () => void
    onCancel?: () => void
    size: 'small' | 'default' | 'large'
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: undefined,
    onCancel: undefined,
    size: 'small',
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

  // Listen for toast events using typed event bus
  useEffect(() => {
    const unsubscribeShow = on('chirp-show-toast', (payload) => {
      showToast(payload)
    })

    const unsubscribeHide = on('chirp-hide-toast', () => {
      hideToast()
    })

    return () => {
      unsubscribeShow()
      unsubscribeHide()
    }
  }, [])

  // Add console method for testing toasts
  useEffect(() => {
    ;(window as unknown as { showToast?: (message: string, type?: string, duration?: number) => void }).showToast = (message: string, type = 'success', duration = 5000) => {
      setToastState({
        isVisible: true,
        message,
        type,
        duration,
      })
    }
    return () => {
      delete (window as unknown as { showToast?: (message: string, type?: string, duration?: number) => void }).showToast
    }
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        showToast,
        showModal,
        hideModal,
        toastState: { ...toastState, onClose: hideToast },
        modalState,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

// Custom hook for accessing notification context
// eslint-disable-next-line react-refresh/only-export-components
export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
