import { useEffect, useState } from 'react';
import { Select } from '.';
import { timeInSeconds } from '../calculations';

interface TimeInputProps {
  hours?: boolean;
  minutes?: boolean;
  seconds?: boolean;
  onChange: (time: number) => void;
}

export function TimeInput({
  hours,
  minutes,
  seconds,
  onChange,
}: TimeInputProps) {
  const [selectedHours, setSelectedHours] = useState<number>(0);
  const [selectedMinutes, setSelectedMinutes] = useState<number>(0);
  const [selectedSeconds, setSelectedSeconds] = useState<number>(0);

  useEffect(() => {
    const timeInSecs = timeInSeconds(
      selectedHours,
      selectedMinutes,
      selectedSeconds,
    );

    onChange(timeInSecs);
  }, [selectedHours, selectedMinutes, selectedSeconds]);

  const handleHourChange = (selectedOption: number) => {
    setSelectedHours(selectedOption);
  };

  const handleMinuteChange = (selectedOption: number) => {
    setSelectedMinutes(selectedOption);
  };

  const handleSecondChange = (selectedOption: number) => {
    setSelectedSeconds(selectedOption);
  };

  return (
    <div className="flex">
      {hours && (
        <>
          <div className="form-control">
            <Select
              options={[...Array(24).keys()]}
              onChange={handleHourChange}
              value={selectedHours}
            />
            <label>hr</label>
          </div>
          <h3>&nbsp;:&nbsp;</h3>
        </>
      )}
      {minutes && (
        <>
          <div className="form-control">
            <Select
              options={[...Array(60).keys()]}
              onChange={handleMinuteChange}
              value={selectedMinutes}
            />
            <label>min</label>
          </div>
          <h3>&nbsp;:&nbsp;</h3>
        </>
      )}
      {seconds && (
        <div className="form-control">
          <Select
            options={[...Array(12).keys()].map((value) => value * 5)}
            onChange={handleSecondChange}
            value={selectedSeconds}
          />
          <label>sec</label>
        </div>
      )}
    </div>
  );
}
