import { ReactNode } from 'react';

interface SubmitButtonProps {
  onClick?: VoidFunction;
  children?: ReactNode;
}

export function SubmitButton({ onClick, children }: SubmitButtonProps) {
  return (
    <button
      className="btn rounded-full border-none bg-spotify text-lg text-black hover:bg-spotify-accent"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
