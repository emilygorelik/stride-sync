import { ReactNode } from 'react';

interface SubmitButtonProps {
  onClick?: VoidFunction;
  children?: ReactNode;
}

export function SubmitButton({ onClick, children }: SubmitButtonProps) {
  return (
    <button
      className="btn bg-spotify text-black border-none rounded-full text-lg hover:bg-spotify-accent"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
