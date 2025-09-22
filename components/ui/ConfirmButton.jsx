'use client';
import {useEffect, useState} from 'react';
import Button from './Button'; // <-- was ../Button

export default function ConfirmButton({
  onConfirm,
  label = 'Logout',
  confirmLabel = 'Confirm',
  variant = 'danger-outline',
  confirmVariant = 'danger',
  timeoutMs = 4000,
  className = ''
}) {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const t = setTimeout(() => setConfirming(false), timeoutMs);
    return () => clearTimeout(t);
  }, [confirming, timeoutMs]);

  if (!confirming) {
    return (
      <Button variant={variant} className={className} onClick={() => setConfirming(true)}>
        {label}
      </Button>
    );
  }
  return (
    <Button variant={confirmVariant} className={`${className} animate-pulse`} onClick={onConfirm}>
      {confirmLabel}
    </Button>
  );
}