import { ChangeEvent, useEffect, useState } from 'react';
import { Divider, NumberInput, RadioGroup, Toggle } from '.';
import { calculateStride, toInches } from '../calculations';

interface StrideDetailsBlockProps {
  strideValue: (stride: number) => void;
}

export function StrideDetailsBlock({ strideValue }: StrideDetailsBlockProps) {
  const [storedStride, setStoredStride] = useState(0);
  const [stride, setStride] = useState(0);
  const [height, setHeight] = useState(0);
  const [storedUnit, setStoredUnit] = useState('inches');
  const [strideUnit, setStrideUnit] = useState('inches');
  const [heightUnit, setHeightUnit] = useState('inches');

  const handleStrideInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let valueNum = parseFloat(value);
    if (strideUnit != 'inches') valueNum = toInches(valueNum);
    setStride(valueNum);
    setStoredStride(valueNum);
  };

  const handleHeightInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let valueNum = parseFloat(value);
    if (heightUnit != 'inches') valueNum = toInches(valueNum);
    const conversion = calculateStride(valueNum);
    setHeight(conversion);
    setStoredStride(conversion);
  };

  const handleStrideUnit = (unit: string) => {
    setStrideUnit(unit);
  };

  const handleHeightUnit = (unit: string) => {
    setHeightUnit(unit);
  };

  useEffect(() => {
    if (strideUnit === 'inches') {
      setStoredStride(stride);
    } else {
      setStoredStride(toInches(stride));
    }
  }, [stride, strideUnit]);

  useEffect(() => {
    if (heightUnit === 'inches') {
      setStoredStride(height);
    } else {
      setStoredStride(toInches(height));
    }
  }, [height, heightUnit]);

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
