import { ChangeEvent, useState } from 'react';
import { Divider, NumberInput, RadioGroup, TimeInput, Toggle } from '.';
import { toMiles, toMilesPerSec } from '../calculations';

interface RunDetailsBlockProps {
  paceValue: (stride: number) => void;
}

export function RunDetailsBlock({ paceValue }: RunDetailsBlockProps) {
  const [pace, setPace] = useState(0);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [paceUnit, setPaceUnit] = useState('min per mile');
  const [distanceUnit, setDistanceUnit] = useState('miles');
  const [isSecondHalfActive, setIsSecondHalfActive] = useState(true);

  const handlePaceInput = (value: number) => {
    // console.log('pace input: ', value);
    paceCalculation(value, paceUnit);
  };

  const handlePaceUnit = (unit: string) => {
    // console.log('stride unit: ', unit);
    paceCalculation(pace, unit);
  };

  const paceCalculation = (value: number, unit: string) => {
    // console.log('logged info is: ', value, ' ', unit);
    if (unit === 'mile') {
      paceValue(value);
    } else {
      paceValue(toMilesPerSec(value));
    }
    setPace(value);
    setPaceUnit(unit);
  };

  const handleDistanceInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let valueNum = parseFloat(value);
    // console.log('dist input: ', valueNum);
    distTimeCalculation(valueNum, distanceUnit, time);
  };

  const handleDistanceUnit = (unit: string) => {
    // console.log('dist unit: ', unit);
    distTimeCalculation(distance, unit, time);
  };

  const handleTimeInput = (value: number) => {
    // console.log('time input: ', value);
    distTimeCalculation(distance, distanceUnit, value);
  };

  const distTimeCalculation = (
    distValue: number,
    unit: string,
    timeValue: number,
  ) => {
    // console.log('logged info is: ', distValue, ' ', unit, ' ', timeValue);
    if (unit === 'miles') {
      paceValue(timeValue / distValue);
    } else {
      // console.log(distValue, ' km is ', toMiles(distValue), ' miles');
      paceValue(timeValue / toMiles(distValue));
    }
    setDistance(distValue);
    setDistanceUnit(unit);
    setTime(timeValue);
  };

  const handleCheckboxChange = () => {
    setIsSecondHalfActive(!isSecondHalfActive);

    if (isSecondHalfActive) {
      // console.log('toggled to: ', pace);
      paceCalculation(pace, paceUnit);
    } else {
      // console.log('toggled to: ', distance, ' ', time);
      distTimeCalculation(distance, distanceUnit, time);
    }
  };

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
            options={['mile', 'kilometer']}
            name="pace"
            onChange={handlePaceUnit}
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
            onChange={handleDistanceUnit}
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
