import React from 'react';
import bg from '../../../assets/rose-petals.svg';
import mainBg from '../../../assets/pattern-randomized.svg';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  height?: string;
  width?: string;
  noBg?: boolean;
};

const ReusableCard: React.FC<CardProps> = ({
  children,
  className = '',
  bgColor = '#0E5D37',
  height = '300px',
  width = '350px',
  noBg = false,
}) => {
  return (
    <div
      className={`p-4 rounded-lg ${className}`}
      style={{
        backgroundImage: noBg ? `url(${mainBg})` : `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: bgColor,
        height,
        width,
      }}
    >
      {children}
    </div>
  );
};

export default ReusableCard;