import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BadgePercent,
  Briefcase,
  CalendarCheck,
  Check,
  CheckCircle,
  ChevronDown,
  Cog,
  Compass,
  Download,
  Edit,
  FileText,
  Gauge,
  Globe,
  Heart,
  Info,
  Mail,
  MapPin,
  Menu,
  PartyPopper,
  Phone,
  RotateCw,
  Search,
  SearchCode,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  TentTree,
  Users,
  Volleyball,
  X,
} from 'lucide-react';

const ICONS = {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BadgePercent,
  Briefcase,
  CalendarCheck,
  Check,
  CheckCircle,
  ChevronDown,
  Cog,
  Compass,
  Download,
  Edit,
  FileText,
  Gauge,
  Globe,
  Heart,
  Info,
  Mail,
  MapPin,
  Menu,
  PartyPopper,
  Phone,
  RotateCw,
  Search,
  SearchCode,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  TentTree,
  Users,
  Volleyball,
  X,
};

export function Icon({ name, size = 20, color, stroke = 2, className, style }) {
  // Convert kebab-case to PascalCase
  const pascalName = name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  const LucideIcon = ICONS[pascalName] || ICONS[name];
  
  if (!LucideIcon) return null;
  
  return <LucideIcon size={size} color={color} strokeWidth={stroke} className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color, ...style }} />;
}

export function Mark({ height = 40, body = '#16753F', glass = '#FAF6EE', hub, wheel = '#16201A', bg }) {
  const hubColor = hub || glass;
  return (
    <svg height={height} viewBox="0 0 82 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }} aria-hidden="true">
      <path d="M7 11 Q7 8 10 8 L56 8 Q60 8 62.5 10.5 L71 19.5 Q74 22.5 74 27 L74 35 L65 35 A6.2 6.2 0 0 0 52.6 35 L31 35 A6.2 6.2 0 0 0 18.6 35 L10 35 Q7 35 7 32 Z" fill={body} />
      <path d="M55 12.5 L61 12.5 L68.5 19.4 L55 19.4 Z" fill={glass} />
      <path d="M12 12.6 Q12 12 12.8 12 L51 12 Q51.8 12 51.8 12.8 L51.8 19 Q51.8 19.6 51 19.6 L12.8 19.6 Q12 19.6 12 19 Z" fill={glass} />
      <rect x="24.5" y="12" width="2.4" height="7.6" fill={body} />
      <rect x="37.5" y="12" width="2.4" height="7.6" fill={body} />
      {bg && <circle cx="24.8" cy="36" r="7.5" fill={bg} />}
      <circle cx="24.8" cy="36" r="6.2" fill={wheel} /><circle cx="24.8" cy="36" r="2.4" fill={hubColor} />
      {bg && <circle cx="58.8" cy="36" r="7.5" fill={bg} />}
      <circle cx="58.8" cy="36" r="6.2" fill={wheel} /><circle cx="58.8" cy="36" r="2.4" fill={hubColor} />
    </svg>
  );
}

export function Logo({ markHeight = 36, fontSize = 24, dark = false, bg, onClick, href = '/' }) {
  return (
    <a className="brand-lockup" href={href} onClick={onClick} aria-label="VanToGo kezdőlap">
      <Mark
        height={markHeight}
        body={dark ? '#E7A634' : '#16753F'}
        glass={dark ? '#0E3B28' : '#FAF6EE'}
        hub={dark ? '#FAF6EE' : undefined}
        wheel="#16201A"
        bg={dark ? (bg || '#0E3B28') : undefined}
      />
      <span className="wm" style={{ fontSize, color: dark ? '#fff' : undefined }}>VanToGo<span className="bang">!</span></span>
    </a>
  );
}

export function Button({ variant = 'primary', size, icon, iconRight, children, onClick, type, className = '', ...buttonProps }) {
  const cls = ['btn', `btn--${variant}`, size ? `btn--${size}` : '', className].filter(Boolean).join(' ');
  return (
    <button type={type || 'button'} className={cls} onClick={onClick} {...buttonProps}>
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
