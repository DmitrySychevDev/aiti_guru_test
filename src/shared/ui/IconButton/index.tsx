import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.scss';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: 'outlined' | 'ghost';
}

export function IconButton({ icon, variant = 'outlined', className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.iconButton} ${styles[variant]} ${className ?? ''}`}
      {...props}
    >
      {icon}
    </button>
  );
}
