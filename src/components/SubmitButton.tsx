import { ReactNode } from 'react';

interface SubmitButtonProps {
  onClick?: VoidFunction;
  children?: ReactNode;
}

export function SubmitButton({ onClick, children }: SubmitButtonProps) {
  return (
    <button
      className="btn bg-spotify text-white border-none rounded-full text-lg hover:bg-spotify"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
