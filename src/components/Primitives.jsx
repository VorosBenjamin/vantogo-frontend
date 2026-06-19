import React from 'react';
import * as LucideIcons from 'lucide-react';

export function Icon({ name, size = 20, color, stroke = 2, className, style }) {
  // Convert kebab-case to PascalCase
  const pascalName = name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  const LucideIcon = LucideIcons[pascalName] || LucideIcons[name];
  
  if (!LucideIcon) return null;
  
  return <LucideIcon size={size} color={color} strokeWidth={stroke} className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color, ...style }} />;
}

export function Mark({ height = 40, body = '#16753F', glass = '#FAF6EE', wheel = '#16201A' }) {
  return (
    <svg height={height} viewBox="0 0 116 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M6 39 L4 38 Q2 37 2.2 33 L3 27 Q3.4 21 9 18.6 L13 17.2 L23 9.9 Q24.6 8 28 8 L101 8 Q107 8 107.6 13.6 L108 34 Q108 37.6 104 37.6 L99.6 37.6 A8.6 8.6 0 0 0 84.4 37.6 L34.6 37.6 A8.6 8.6 0 0 0 19.4 37.6 L8 37.6 Q6 37.8 6 39 Z" fill={body} />
      <path d="M31 10.6 L99.5 10.6 Q101 10.6 101 12.1 L101 18.8 L24.6 18.8 Q23.6 14 31 10.6 Z" fill={glass} />
      <rect x="43.4" y="10.6" width="2.5" height="8.2" fill={body} />
      <rect x="66" y="10.6" width="2.5" height="8.2" fill={body} />
      <rect x="88.4" y="10.6" width="2.5" height="8.2" fill={body} />
      <rect x="24.6" y="20.4" width="76.4" height="1.5" rx="0.75" fill={glass} opacity="0.5" />
      <circle cx="27" cy="37.6" r="7.6" fill={wheel} /><circle cx="27" cy="37.6" r="3.7" fill={glass} /><circle cx="27" cy="37.6" r="1.3" fill={wheel} />
      <circle cx="92" cy="37.6" r="7.6" fill={wheel} /><circle cx="92" cy="37.6" r="3.7" fill={glass} /><circle cx="92" cy="37.6" r="1.3" fill={wheel} />
    </svg>
  );
}

export function Logo({ markHeight = 36, fontSize = 24, dark = false, onClick }) {
  return (
    <div className="brand-lockup" onClick={onClick}>
      <Mark height={markHeight} body={dark ? '#FAF6EE' : '#16753F'} glass={dark ? '#16753F' : '#FAF6EE'} wheel={dark ? '#0A2A1D' : '#16201A'} />
      <span className="wm" style={{ fontSize, color: dark ? '#fff' : undefined }}>VanToGo<span className="bang">!</span></span>
    </div>
  );
}

export function Button({ variant = 'primary', size, icon, iconRight, children, onClick, type, className = '' }) {
  const cls = ['btn', `btn--${variant}`, size ? `btn--${size}` : '', className].filter(Boolean).join(' ');
  return (
    <button type={type || 'button'} className={cls} onClick={onClick}>
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 19} className="ic" />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 16 : 19} className="ic" />}
    </button>
  );
}

export function Badge({ variant = '', icon, children }) {
  const cls = ['badge', variant && `badge--${variant}`].filter(Boolean).join(' ');
  return <span className={cls}>{icon && <Icon name={icon} size={14} className="ic" />}{children}</span>;
}

export function Spec({ icon, children }) {
  return <span className="spec"><span className="spec-ic"><Icon name={icon} size={15} /></span>{children}</span>;
}

export function SpecStat({ icon, label, value }) {
  return (
    <div className="spec-stat">
      <span className="si"><Icon name={icon} size={22} /></span>
      <span><span className="k" style={{ display: 'block' }}>{label}</span><span className="val">{value}</span></span>
    </div>
  );
}
