import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

/**
 * Custom hook to access toast notifications
 * @returns {Object} - { showToast, removeToast, clearToasts }
 */
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
