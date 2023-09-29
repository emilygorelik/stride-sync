import { ReactNode } from 'react';

interface CardProps {
  addClass?: string;
  children?: ReactNode;
}
export function Card({ addClass, children }: CardProps) {
  return (
    <div
      className={`"flex flex-col bg-white p-6 rounded-2xl text-center items-center drop-shadow-xl" ${addClass}`}
    >
      {children}
    </div>
  );
}
