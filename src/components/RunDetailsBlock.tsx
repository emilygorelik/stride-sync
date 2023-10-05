import { ChangeEvent } from 'react';
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

  return (
    <div className="flex w-full flex-col ">
      <h3>Run Details</h3>
      <div className="flex">
        <div className="form-control w-fit">
          <span className="label-text">Pace</span>
          <TimeInput minutes seconds onTimeChange={handlePaceChange} />
          <RadioGroup
            options={['minutes per mile', 'minutes per km']}
            groupName="pace"
            onRadioChange={handlePaceUnitChange}
          />
        </div>
        <Divider />
        <div className="form-control w-fit">
          <span className="label-text">Distance</span>
          <NumberInput dummyText="00.00" onChange={handleDistanceChange} />
          <RadioGroup
            options={['miles', 'kilometers']}
            groupName="distance"
            onRadioChange={handleDistanceUnitChange}
          />
        </div>
        <div className="form-control ml-6 w-fit">
          <span className="label-text">Time</span>
          <TimeInput hours minutes seconds onTimeChange={handleTimeChange} />
        </div>
      </div>
    </div>
  );
}
