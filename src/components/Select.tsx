interface SelectProps {
  options: number[];
  onSelectChange: (selectedOption: number) => void;
  selectedOption: number;
}

export function Select({
  options,
  onSelectChange,
  selectedOption,
}: SelectProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    onSelectChange(selectedValue);
  };

  return (
    <select
      onChange={handleSelectChange}
      value={selectedOption}
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
