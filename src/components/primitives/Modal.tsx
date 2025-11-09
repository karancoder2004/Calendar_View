import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, ariaLabel }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
      setTimeout(() => ref.current?.focus(), 0);
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-backdropFadeIn">
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title || 'Dialog'}
        tabIndex={-1}
        className="relative z-10 w-full max-w-lg bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-6 focus:outline-none animate-modalSlideIn border border-neutral-200 dark:border-neutral-700"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all duration-200 hover:scale-110 group"
          aria-label="Close dialog"
        >
          <span className="text-neutral-600 dark:text-neutral-300 group-hover:rotate-90 transition-transform duration-200">✕</span>
        </button>

        {title && (
          <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h2>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
