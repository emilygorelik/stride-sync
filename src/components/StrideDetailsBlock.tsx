import { ChangeEvent } from 'react';
import { Divider, NumberInput, RadioGroup } from '.';

interface StrideDetailsBlockProps {
  onStrideChange: (stride: string) => void;
  onStrideUnitChange: (unit: string) => void;
  onHeightChange: (height: string) => void;
  onHeightUnitChange: (unit: string) => void;
}

export function StrideDetailsBlock({
  onStrideChange,
  onStrideUnitChange,
  onHeightChange,
  onHeightUnitChange,
}: StrideDetailsBlockProps) {
  const handleStrideChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onStrideChange(value);
  };

  const handleStrideUnitChange = (unit: string) => {
    onStrideUnitChange(unit);
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onHeightChange(value);
  };

  const handleHeightUnitChange = (unit: string) => {
    onHeightUnitChange(unit);
  };

  return (
    <div className="flex w-full flex-col ">
      <h3>Stride Details</h3>
      <div className="flex">
        <div className="form-control w-fit">
          <span className="label-text">Stride Length</span>
          <NumberInput dummyText="00.00" onChange={handleStrideChange} />
          <RadioGroup
            options={['inches', 'centimeters']}
            groupName="stride"
            onRadioChange={handleStrideUnitChange}
          />
        </div>
        <Divider />
        <div className="form-control w-fit">
          <span className="label-text">Height</span>
          <NumberInput dummyText="00.00" onChange={handleHeightChange} />
          <RadioGroup
            options={['inches', 'centimeters']}
            groupName="height"
            onRadioChange={handleHeightUnitChange}
          />
        </div>
      </div>
    </div>
  );
}
