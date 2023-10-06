interface TextInputProps {
  placeholder?: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function NumberInput({
  placeholder,
  className,
  onChange,
}: TextInputProps) {
  return (
    <div className="form-control w-fit">
      <input
        type="number"
        placeholder={placeholder}
        onChange={onChange}
        className={`no-arrows input input-sm mb-2 w-full max-w-[8rem] rounded-lg bg-white text-black focus:outline-none ${className}`}
      />
    </div>
  );
}
