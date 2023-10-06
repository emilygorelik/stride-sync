interface SelectProps {
  options: number[];
  onChange: (selectedOption: number) => void;
  value: number;
}

export function Select({ options, onChange, value }: SelectProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    onChange(selectedValue);
  };

  return (
    <select
      onChange={handleSelectChange}
      value={value}
      className="select select-sm max-w-[4rem] bg-white text-black"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option < 10 ? `0${option}` : option}
        </option>
      ))}
    </select>
  );
}
