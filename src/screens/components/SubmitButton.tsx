interface SubmitButtonProps {
  text: string;
}

export function SubmitButton({ text }: SubmitButtonProps) {
  return (
    <button className="btn bg-spotify text-white border-none rounded-full text-lg">
      {text}
    </button>
  );
}
