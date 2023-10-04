interface TextInputProps {
  labelTop?: string;
  labelBottom?: string;
  dummyText?: string;
  addValue?: string;
  under?: boolean;
  addClass?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function NumberInput({
  labelTop,
  labelBottom,
  dummyText,
  addValue,
  onChange,

  addClass,
}: TextInputProps) {
  return (
    <div className="form-control w-fit">
      <span className="label-text">{labelTop}</span>
      <input
        type="number"
        placeholder={dummyText}
        value={addValue}
        onChange={onChange}
        className={`"input focus:outline-none" no-arrows input-sm w-full max-w-[8rem] rounded-lg bg-white text-black ${addClass}`}
      />
      <span className="label-text">{labelBottom}</span>
    </div>
  );
}
