import { ChangeEvent } from 'react';
import { Divider } from './Divider';
import { NumberInput } from './NumberInput';
import { RadioGroup } from './RadioGroup';

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
  const handlePaceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onPaceChange(value);
  };

  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onDistanceChange(value);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onTimeChange(value);
  };

  return (
    <div className="flex w-full flex-col ">
      <h3>Run Details</h3>
      <div className="flex">
        <div className="form-control w-fit">
          <span className="label-text">Pace</span>
          <NumberInput dummyText="00:00" onChange={handlePaceChange} />
          {/* <TimeInput minutes seconds onInputChange={handlePaceChange} /> */}
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
          <NumberInput dummyText="00:00:00" onChange={handleTimeChange} />
          {/* <TimeInput hours minutes seconds onInputChange={handleTimeChange} /> */}
        </div>
      </div>
    </div>
  );
}
