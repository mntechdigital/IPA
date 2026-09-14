import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'right' | 'upRight' | 'none';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon = 'right',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'group relative inline-flex items-center justify-center font-sans text-sm font-medium tracking-wide rounded-full transition-all duration-300 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2.5',
    lg: 'px-8 py-3.5 text-base gap-3',
  };

  const variantStyles = {
    primary: 'bg-[#0B2A20] text-[#D2F843] hover:bg-[#195642] active:bg-[#071d16] border border-[#0B2A20] font-semibold shadow-sm hover:shadow-md',
    secondary: 'bg-[#FFFFFF] text-[#0B2A20] border border-[#E2EAE4] hover:border-[#0B2A20] hover:bg-[#F6F9F4] font-semibold shadow-sm',
    ghost: 'bg-transparent text-[#0B2A20] hover:text-[#195642] underline-offset-4 hover:underline p-0 font-medium',
    dark: 'bg-[#D2F843] text-[#0B2A20] hover:bg-[#c4ea38] active:bg-[#b2d825] border border-[#D2F843] font-bold shadow-md hover:shadow-lg',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="whitespace-nowrap">{children}</span>
      {icon === 'right' && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
      {icon === 'upRight' && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </button>
  );
};
