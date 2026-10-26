import type { ButtonHTMLAttributes } from 'react';
import './BigButton.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

export function BigButton({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`big-btn big-btn-${variant} ${className}`} {...props} />;
}
