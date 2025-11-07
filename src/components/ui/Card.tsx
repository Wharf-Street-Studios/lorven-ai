import React from 'react';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, onClick, className = '', hover = false, style }) => {
  const baseStyles = 'bg-white rounded-2xl transition-all duration-300 shadow-soft';
  const hoverStyles = hover ? 'hover:shadow-medium cursor-pointer active:scale-[0.98] transform' : '';
  const clickableStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${hoverStyles} ${clickableStyles} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
