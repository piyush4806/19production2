'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  showArrow = false,
  type = 'button',
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm',
    md: 'px-5 py-2.5 text-xs sm:px-7 sm:py-3 sm:text-sm md:px-8 md:py-3.5 md:text-base',
    lg: 'px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-lg',
  };

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'bg-transparent text-white hover:text-[#ff2d2d] px-3 py-1.5 sm:px-4 sm:py-2',
  };

  const classes = `
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    rounded-lg sm:rounded-xl font-semibold inline-flex items-center justify-center gap-2
    transition-all duration-300 cursor-pointer
    ${className}
  `;

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="group">
        <motion.div
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      className={`${classes} group`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
