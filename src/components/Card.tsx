import { ReactNode } from 'react';

interface CardProps {
  children?: ReactNode;
}
export function Card({ children }: CardProps) {
  return (
    <div className="flex flex-col bg-white w-fit h-min p-6 rounded-2xl text-center items-center drop-shadow-xl">
      {children}
    </div>
  );
}
