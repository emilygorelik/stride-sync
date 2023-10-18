import { ChangeEvent, useState } from 'react';
import { Divider, Info, NumberInput, RadioGroup, Toggle } from '.';
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
    const valueNum = parseFloat(value);
    strideCalculation(valueNum, strideUnit);
  };

  const handleStrideUnit = (unit: string) => {
    strideCalculation(stride, unit);
  };

  const strideCalculation = (value: number, unit: string) => {
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
    const valueNum = parseFloat(value);
    heightCalculation(valueNum, heightUnit);
  };

  const handleHeightUnit = (unit: string) => {
    heightCalculation(height, unit);
  };

  const heightCalculation = (value: number, unit: string) => {
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
      strideCalculation(stride, strideUnit);
    } else {
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
          <span className="label-text flex gap-1">
            Height <Info text="calculation may be inaccurate" />
          </span>
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
