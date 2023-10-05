import { ChangeEvent } from 'react';
import { Divider } from './Divider';
import { NumberInput } from './NumberInput';
import { RadioGroup } from './RadioGroup';
import { TimeInput } from './TimeInput';

interface RunDetailsBlockProps {
  onPaceChange: (stride: string) => void;
  onDistanceChange: (height: string) => void;
  onTimeChange: (height: string) => void;
}

export function RunDetailsBlock({
  onPaceChange,
  onDistanceChange,
  onTimeChange,
}: RunDetailsBlockProps) {
  const handlePaceChange = (value: string) => {
    onPaceChange(value);
  };

  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onDistanceChange(value);
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
          />
        </div>
        <Divider />
        <div className="form-control w-fit">
          <span className="label-text">Distance</span>
          <NumberInput dummyText="00.00" onChange={handleDistanceChange} />
          <RadioGroup options={['miles', 'kilometers']} groupName="distance" />
        </div>
        <div className="form-control ml-6 w-fit">
          <span className="label-text">Time</span>
          <TimeInput hours minutes seconds onTimeChange={handleTimeChange} />
        </div>
      </div>
    </div>
  );
}
