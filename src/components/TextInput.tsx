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
        className={`"input input-sm bg-white text-black rounded-lg w-full max-w-[8rem] focus:outline-none" ${addClass}`}
      />
      <span className="label-text">{labelBottom}</span>
    </div>
  );
}
