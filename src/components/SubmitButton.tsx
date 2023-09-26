import { ReactNode } from 'react';

interface SubmitButtonProps {
  children: ReactNode;
}

export function SubmitButton({ children }: SubmitButtonProps) {
  return (
    <button className="btn bg-spotify text-white border-none rounded-full text-lg">
      {children}
    </button>
  );
}
