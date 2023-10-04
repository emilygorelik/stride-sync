interface TextInputProps {
  labelTop?: string;
  labelBottom?: string;
  dummyText?: string;
  under?: boolean;
  addClass?: string;
}

export function TextInput({
  labelTop,
  labelBottom,
  dummyText,
  addClass,
}: TextInputProps) {
  return (
    <div className="form-control w-fit">
      <span className="label-text">{labelTop}</span>
      <input
        type="text"
        placeholder={dummyText}
        className={`"input focus:outline-none" input-sm w-full max-w-[8rem] rounded-lg bg-white text-black ${addClass}`}
      />
      <span className="label-text">{labelBottom}</span>
    </div>
  );
}
