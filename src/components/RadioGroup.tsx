import { useState } from 'react';

interface RadioGroupProps {
  options: string[];
  name: string;
  onChange: (selectedValue: string) => void;
}

export function RadioGroup({ options, name, onChange }: RadioGroupProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleRadioChange = (option: string) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <div className="form-control my-2 w-fit gap-2">
      {options.map((option, index) => (
        <p className="flex cursor-pointer justify-start" key={index}>
          <input
            type="radio"
            name={name}
            className="radio radio-xs mr-2"
            checked={option === selectedOption}
            onChange={() => handleRadioChange(option)}
          />
          <span className="label-text">{option}</span>
        </p>
      ))}
    </div>
  );
}
