
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ icon, className, ...props }) => {
  return (
    <div className="relative">
      {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
      <input
        className={`w-full bg-brand-gray border border-brand-light-gray text-brand-text rounded-lg py-2.5 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition duration-300 ${icon ? 'pl-10' : 'px-4'} ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
