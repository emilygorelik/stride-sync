interface TextInputProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function NumberInput({
  placeholder,
  className,
  onChange,
  value,
}: TextInputProps) {
  return (
    <div className="form-control w-fit">
      <input
        type="number"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`no-arrows input input-sm mb-2 w-full max-w-[8rem] rounded-lg bg-white text-black focus:outline-none ${className}`}
      />
    </div>
  );
}
