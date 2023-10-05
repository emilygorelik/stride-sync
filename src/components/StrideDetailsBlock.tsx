import { ChangeEvent } from 'react';
import { Divider } from './Divider';
import { NumberInput } from './NumberInput';
import { RadioGroup } from './RadioGroup';

interface StrideDetailsBlockProps {
  onStrideChange: (stride: string) => void;
  onHeightChange: (height: string) => void;
}

export function StrideDetailsBlock({
  onStrideChange,
  onHeightChange,
}: StrideDetailsBlockProps) {
  const handleStrideChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onStrideChange(value);
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onHeightChange(value);
  };

  return (
    <div className="flex w-full flex-col ">
      <h3>Stride Details</h3>
      <div className="flex">
        <div className="form-control w-fit">
          <span className="label-text">Stride Length</span>
          <NumberInput dummyText="00.00" onChange={handleStrideChange} />
          <RadioGroup options={['inches', 'centimeters']} groupName="stride" />
        </div>
        <Divider />
        <div className="form-control w-fit">
          <span className="label-text">Height</span>
          <NumberInput dummyText="00.00" onChange={handleHeightChange} />
          <RadioGroup options={['inches', 'centimeters']} groupName="height" />
        </div>
      </div>
    </div>
  );
}
