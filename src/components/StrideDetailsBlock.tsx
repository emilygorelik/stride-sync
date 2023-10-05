import { ChangeEvent, useState } from 'react';
import { Divider, NumberInput, RadioGroup } from '.';

interface StrideDetailsBlockProps {
  strideValue: (stride: number) => void;
}

export function StrideDetailsBlock({ strideValue }: StrideDetailsBlockProps) {
  const [storedStride, setStoredStride] = useState(0);
  const [stride, setStride] = useState(0);
  const [height, setHeight] = useState(0);

  const handleStrideInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStride(parseInt(value));
    setStoredStride(parseInt(value));
  };

  const handleHeightInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHeight(parseInt(value) * 0.414);
    setStoredStride(parseInt(value) * 0.414);
  };

  const [isSecondHalfActive, setIsSecondHalfActive] = useState(true);
  const handleCheckboxChange = () => {
    setIsSecondHalfActive(!isSecondHalfActive);

    if (isSecondHalfActive) {
      setStoredStride(stride);
    } else {
      setStoredStride(height);
    }
  };

  strideValue(storedStride);

  return (
    <div className="flex w-full flex-col ">
      <div className="flex gap-2">
        <h3>Stride Details</h3>
        <input
          type="checkbox"
          checked={isSecondHalfActive}
          onChange={handleCheckboxChange}
          className="toggle mr-2 border-gray-200 bg-gray-200"
        />
      </div>{' '}
      <div className="flex">
        <div
          className={`form-control w-fit ${
            !isSecondHalfActive ? '' : 'pointer-events-none opacity-50'
          }`}
        >
          {' '}
          <span className="label-text">Stride Length</span>
          <NumberInput dummyText="00.00" onChange={handleStrideInput} />
          <RadioGroup
            options={['inches', 'centimeters']}
            groupName="stride"
            onRadioChange={() => {}}
          />
        </div>
        <Divider />
        <div
          className={`form-control w-fit ${
            !isSecondHalfActive ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          {' '}
          <span className="label-text">Height</span>
          <NumberInput dummyText="00.00" onChange={handleHeightInput} />
          <RadioGroup
            options={['inches', 'centimeters']}
            groupName="height"
            onRadioChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
