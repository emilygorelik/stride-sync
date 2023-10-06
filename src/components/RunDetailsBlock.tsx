import { ChangeEvent, useState } from 'react';
import { Divider, NumberInput, RadioGroup, TimeInput, Toggle } from '.';

interface RunDetailsBlockProps {
  paceValue: (stride: number) => void;
}

export function RunDetailsBlock({ paceValue }: RunDetailsBlockProps) {
  const [storedPace, setStoredPace] = useState(0);
  const [pace, setPace] = useState(0);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);

  const handlePaceInput = (value: number) => {
    setPace(value);
    setStoredPace(value);
  };

  const handleTimeInput = (value: number) => {
    setTime(value);
    setStoredPace(value / distance);
  };

  const handleDistanceInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDistance(parseFloat(value));
    setStoredPace(time / parseFloat(value));
  };

  const [isSecondHalfActive, setIsSecondHalfActive] = useState(true);
  const handleCheckboxChange = () => {
    setIsSecondHalfActive(!isSecondHalfActive);

    if (isSecondHalfActive) {
      setStoredPace(pace);
    } else {
      setStoredPace(time / distance);
    }
  };

  paceValue(storedPace);

  return (
    <div className="flex w-full flex-col">
      <div className="flex gap-2">
        <h3>Run Details</h3>
        <Toggle checked={isSecondHalfActive} onChange={handleCheckboxChange} />
      </div>

      <div className="flex">
        <div
          className={`form-control w-fit ${
            !isSecondHalfActive ? '' : 'pointer-events-none opacity-50'
          }`}
        >
          <span className="label-text">Pace</span>
          <TimeInput minutes seconds onChange={handlePaceInput} />
          <RadioGroup
            options={['minutes per mile', 'minutes per km']}
            name="pace"
            onChange={() => {}}
          />
        </div>
        <Divider />
        <div
          className={`form-control w-fit ${
            !isSecondHalfActive ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <span className="label-text">Distance</span>
          <NumberInput placeholder="00.00" onChange={handleDistanceInput} />
          <RadioGroup
            options={['miles', 'kilometers']}
            name="distance"
            onChange={() => {}}
          />
        </div>
        <div
          className={`form-control ml-6 w-fit ${
            !isSecondHalfActive ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <span className="label-text">Time</span>
          <TimeInput hours minutes seconds onChange={handleTimeInput} />
        </div>
      </div>
    </div>
  );
}
