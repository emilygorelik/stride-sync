import { ReactNode } from 'react';

interface CardProps {
  addClass?: string;
  children?: ReactNode;
}
export function Card({ addClass, children }: CardProps) {
  return (
    <div
      className={`"flex drop-shadow-xl" flex-col items-center rounded-2xl bg-white p-6 text-center ${addClass}`}
    >
      {children}
    </div>
  );
}
