import { ChangeEvent, useState } from 'react';
import { Divider, NumberInput, RadioGroup, Toggle } from '.';
import { heightToStride, toInches } from '../calculations';

interface StrideDetailsBlockProps {
  strideValue: (stride: number) => void;
}

export function StrideDetailsBlock({ strideValue }: StrideDetailsBlockProps) {
  const [stride, setStride] = useState(0);
  const [height, setHeight] = useState(0);
  const [strideUnit, setStrideUnit] = useState('inches');
  const [heightUnit, setHeightUnit] = useState('inches');
  const [isSecondHalfActive, setIsSecondHalfActive] = useState(true);

  const handleStrideInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let valueNum = parseFloat(value);
    console.log('stride input: ', valueNum);
    strideCalculation(valueNum, strideUnit);
  };

  const handleStrideUnit = (unit: string) => {
    console.log('stride unit: ', unit);
    strideCalculation(stride, unit);
  };

  const strideCalculation = (value: number, unit: string) => {
    console.log('logged info is: ', value, ' ', unit);
    if (unit === 'inches') {
      strideValue(value);
    } else {
      strideValue(toInches(value));
    }
    setStride(value);
    setStrideUnit(unit);
  };

  const handleHeightInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let valueNum = parseFloat(value);
    console.log('height input: ', valueNum);
    heightCalculation(valueNum, heightUnit);
  };

  const handleHeightUnit = (unit: string) => {
    console.log('height unit: ', unit);
    heightCalculation(height, unit);
  };

  const heightCalculation = (value: number, unit: string) => {
    console.log('logged info is: ', value, ' ', unit);
    if (unit === 'inches') {
      strideValue(heightToStride(value));
    } else {
      strideValue(toInches(heightToStride(value)));
    }
    setHeight(value);
    setHeightUnit(unit);
  };

  const handleCheckboxChange = () => {
    setIsSecondHalfActive(!isSecondHalfActive);

    if (isSecondHalfActive) {
      console.log('toggled to: ', stride);
      strideCalculation(stride, strideUnit);
    } else {
      console.log('toggled to: ', height);
      heightCalculation(height, heightUnit);
    }
  };

  return (
    <div className="flex w-full flex-col ">
      <div className="flex gap-2">
        <h3>Stride Details</h3>
        <Toggle checked={isSecondHalfActive} onChange={handleCheckboxChange} />
      </div>
      <div className="flex">
        <div
          className={`form-control w-fit ${
            !isSecondHalfActive ? '' : 'pointer-events-none opacity-50'
          }`}
        >
          <span className="label-text">Stride Length</span>
          <NumberInput placeholder="00.00" onChange={handleStrideInput} />
          <RadioGroup
            options={['inches', 'centimeters']}
            name="stride"
            onChange={handleStrideUnit}
          />
        </div>
        <Divider />
        <div
          className={`form-control w-fit ${
            !isSecondHalfActive ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <span className="label-text">Height</span>
          <NumberInput placeholder="00.00" onChange={handleHeightInput} />
          <RadioGroup
            options={['inches', 'centimeters']}
            name="height"
            onChange={handleHeightUnit}
          />
        </div>
      </div>
    </div>
  );
}
