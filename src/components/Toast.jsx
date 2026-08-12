import React, { useState, useEffect } from 'react';
import { Icon } from './Primitives';

export function Toast() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const handleToast = (e) => {
      setMsg(e.detail);
      setTimeout(() => setMsg(''), 3000);
    };

    window.addEventListener('vantogoToast', handleToast);
    return () => window.removeEventListener('vantogoToast', handleToast);
  }, []);

  if (!msg) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'var(--go-900)',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: 'var(--r-full)',
      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '14px',
      fontWeight: '500',
      animation: 'slide-up 0.3s ease-out forwards'
    }}>
      <style>{`
        @keyframes slide-up {
          from { transform: translate(-50%, 20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
      <Icon name="check-circle" size={18} style={{ color: 'var(--amber-400)' }} />
      {msg}
    </div>
  );
}
