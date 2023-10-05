import { useEffect, useState } from 'react';

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

  const handleHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHours(parseInt(event.target.value, 10));
  };

  const handleMinuteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMinutes(parseInt(event.target.value, 10));
  };

  const handleSecondChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeconds(parseInt(event.target.value, 10));
  };

  return (
    <div className="flex">
      {hours && (
        <>
          <div className="form-control">
            <select
              onChange={handleHourChange}
              value={selectedHours}
              className="select select-sm max-w-[4rem] bg-white text-black"
            >
              {[...Array(24)].map((_, index) => (
                <option key={index} value={index}>
                  {index < 10 ? `0${index}` : index}
                </option>
              ))}
            </select>
            <label>hr</label>
          </div>
          <h3>&nbsp;:&nbsp;</h3>
        </>
      )}
      {minutes && (
        <>
          <div className="form-control">
            <select
              onChange={handleMinuteChange}
              value={selectedMinutes}
              className="select select-sm max-w-[4rem] bg-white text-black"
            >
              {[...Array(60)].map((_, index) => (
                <option key={index} value={index}>
                  {index < 10 ? `0${index}` : index}
                </option>
              ))}
            </select>
            <label>min</label>
          </div>
          <h3>&nbsp;:&nbsp;</h3>
        </>
      )}
      {seconds && (
        <div className="form-control">
          <select
            onChange={handleSecondChange}
            value={selectedSeconds}
            className="select select-sm max-w-[4rem] bg-white text-black"
          >
            {[...Array(12)].map((_, index) => (
              <option key={index} value={index * 5}>
                {index * 5 < 10 ? `0${index * 5}` : index * 5}
              </option>
            ))}
          </select>
          <label>sec</label>
        </div>
      )}
    </div>
  );
}
