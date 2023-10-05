import { useEffect, useState } from 'react';
import { Select } from './Select';

interface TimeInputProps {
  hours?: boolean;
  minutes?: boolean;
  seconds?: boolean;
  onTimeChange: (time: string) => void;
}

export function TimeInput({
  hours,
  minutes,
  seconds,
  onTimeChange,
}: TimeInputProps) {
  const [selectedHours, setSelectedHours] = useState<number>(0);
  const [selectedMinutes, setSelectedMinutes] = useState<number>(0);
  const [selectedSeconds, setSelectedSeconds] = useState<number>(0);

  useEffect(() => {
    // Format the time string as "hh:mm:ss"
    const formattedTime = `${selectedHours
      .toString()
      .padStart(2, '0')}:${selectedMinutes
      .toString()
      .padStart(2, '0')}:${selectedSeconds.toString().padStart(2, '0')}`;

    onTimeChange(formattedTime);
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
              onSelectChange={handleHourChange}
              selectedOption={selectedHours}
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
              onSelectChange={handleMinuteChange}
              selectedOption={selectedMinutes}
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
            onSelectChange={handleSecondChange}
            selectedOption={selectedSeconds}
          />
          <label>sec</label>
        </div>
      )}
    </div>
  );
}
