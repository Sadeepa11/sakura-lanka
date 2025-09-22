'use client';

import {useEffect, useRef} from 'react';

function cx(...args) {
  return args.filter(Boolean).join(' ');
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'xl',
  mobileFull = true,
  maxHeight = '90vh',
  className = '',
  bodyClassName = '',
  closeOnOverlay = true
}) {
  const ref = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.();
    }
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  const sizeClass =
    {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-3xl',
      '2xl': 'max-w-5xl',
      full: 'max-w-[95vw]'
    }[size] || 'max-w-3xl';

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={closeOnOverlay ? onClose : undefined} />
      <div className="absolute inset-0 flex items-end md:items-center justify-center p-2 md:p-6">
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cx(
            'w-full bg-white shadow-lg flex flex-col',
            'rounded-t-2xl md:rounded-xl',
            mobileFull ? 'h-[92vh] md:h-auto' : '',
            sizeClass,
            className
          )}
          style={{maxHeight}}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b px-4 py-3 bg-white">
            <h3 className="font-semibold">{title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close">✕</button>
          </div>

          <div className={cx('px-4 py-4 overflow-y-auto', bodyClassName)} style={{flex: '1 1 auto'}}>
            {children}
          </div>

          {footer && <div className="sticky bottom-0 z-10 border-t px-4 py-3 bg-white">{footer}</div>}
        </div>
      </div>
    </div>
  );
}