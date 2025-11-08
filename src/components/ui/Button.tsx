import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
}) => {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-30';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 shadow-strong hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-primary-700 focus:ring-primary-300',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 shadow-medium hover:shadow-strong border-2 border-gray-300 hover:border-gray-400 focus:ring-gray-300',
    outline: 'bg-white border-2 border-gray-400 text-gray-900 hover:border-gray-600 hover:bg-gray-50 active:bg-gray-100 shadow-medium hover:shadow-strong focus:ring-gray-300',
  };

  const sizeStyles = {
    small: 'px-4 py-2.5 text-sm',
    medium: 'px-6 py-3.5 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles}`}
    >
      {children}
    </button>
  );
};

export default Button;
