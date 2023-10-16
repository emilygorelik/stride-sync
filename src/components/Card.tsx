import { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children?: ReactNode;
}
export function Card({ className, children }: CardProps) {
  return (
    <div
      className={`"flex drop-shadow-xl" flex-col items-center rounded-2xl bg-white p-6 text-center ${className}`}
    >
      {children}
    </div>
  );
}
