import { ChangeEvent, useState } from 'react';
import { Divider, NumberInput, RadioGroup, TimeInput } from '.';

interface RunDetailsBlockProps {
  onPaceChange: (stride: string) => void;
  onPaceUnitChange: (unit: string) => void;
  onDistanceChange: (height: string) => void;
  onDistanceUnitChange: (unit: string) => void;
  onTimeChange: (height: string) => void;
}

export function RunDetailsBlock({
  onPaceChange,
  onPaceUnitChange,
  onDistanceChange,
  onDistanceUnitChange,
  onTimeChange,
}: RunDetailsBlockProps) {
  const handlePaceChange = (value: string) => {
    onPaceChange(value);
  };

  const handlePaceUnitChange = (unit: string) => {
    onPaceUnitChange(unit);
  };

  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onDistanceChange(value);
  };

  const handleDistanceUnitChange = (unit: string) => {
    onDistanceUnitChange(unit);
  };

  const handleTimeChange = (value: string) => {
    onTimeChange(value);
  };

  const [isSecondHalfActive, setIsSecondHalfActive] = useState(true);
  const handleCheckboxChange = () => {
    setIsSecondHalfActive(!isSecondHalfActive);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex gap-2">
        <h3>Run Details</h3>
        <input
          type="checkbox"
          checked={isSecondHalfActive}
          onChange={handleCheckboxChange}
          className="toggle mr-2 border-gray-200 bg-gray-200"
        />
      </div>

      <div className="flex">
        <div
          className={`form-control w-fit ${
            !isSecondHalfActive ? '' : 'pointer-events-none opacity-50'
          }`}
        >
          <span className="label-text">Pace</span>
          <TimeInput minutes seconds onTimeChange={handlePaceChange} />
          <RadioGroup
            options={['minutes per mile', 'minutes per km']}
            groupName="pace"
            onRadioChange={handlePaceUnitChange}
          />
        </div>
        <Divider />
        <div
          className={`form-control w-fit ${
            !isSecondHalfActive ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <span className="label-text">Distance</span>
          <NumberInput dummyText="00.00" onChange={handleDistanceChange} />
          <RadioGroup
            options={['miles', 'kilometers']}
            groupName="distance"
            onRadioChange={handleDistanceUnitChange}
          />
        </div>
        <div
          className={`form-control ml-6 w-fit ${
            !isSecondHalfActive ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <span className="label-text">Time</span>
          <TimeInput hours minutes seconds onTimeChange={handleTimeChange} />
        </div>
      </div>
    </div>
  );
}
