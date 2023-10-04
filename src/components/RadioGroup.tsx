import { useState } from 'react';

interface RadioGroupProps {
  options: string[];
  groupName: string;
}

export function RadioGroup({ options, groupName }: RadioGroupProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleRadioChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="form-control my-2 w-fit gap-2">
      {options.map((option, index) => (
        <label className="flex cursor-pointer justify-start" key={index}>
          <input
            type="radio"
            name={groupName}
            className="radio radio-xs mr-2"
            checked={option === selectedOption}
            onChange={() => handleRadioChange(option)}
          />
          <span className="label-text">{option}</span>
        </label>
      ))}
    </div>
  );
}
