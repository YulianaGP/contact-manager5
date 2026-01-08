import { useEffect } from 'react';

/**
 * Toast notification component
 * @param {string} message - The message to display
 * @param {string} type - Type of toast: 'success', 'error', 'warning', 'info'
 * @param {Function} onClose - Callback when toast closes
 * @param {number} duration - Duration in ms before auto-close (default: 4000)
 */
export default function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Color schemes for different toast types
  const typeStyles = {
    success: {
      bg: 'bg-green-500',
      icon: '✓',
      iconBg: 'bg-green-600'
    },
    error: {
      bg: 'bg-red-500',
      icon: '✕',
      iconBg: 'bg-red-600'
    },
    warning: {
      bg: 'bg-yellow-500',
      icon: '⚠',
      iconBg: 'bg-yellow-600'
    },
    info: {
      bg: 'bg-blue-500',
      icon: 'ℹ',
      iconBg: 'bg-blue-600'
    }
  };

  const style = typeStyles[type] || typeStyles.info;

  return (
    <div
      className={`${style.bg} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md animate-slide-in-right`}
      role="alert"
    >
      {/* Icon */}
      <div className={`${style.iconBg} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold`}>
        {style.icon}
      </div>

      {/* Message */}
      <p className="flex-1 text-sm font-medium">{message}</p>

      {/* Close button */}
      <button
        onClick={onClose}
        className="text-white hover:bg-white/20 rounded-full w-6 h-6 flex items-center justify-center transition-colors flex-shrink-0"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
