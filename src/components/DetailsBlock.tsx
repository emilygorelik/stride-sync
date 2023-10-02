import { Divider } from './Divider';
import { RadioGroup } from './RadioGroup';
import { TimeInput } from './TimeInput';

export function DetailsBlock() {
  return (
    <div className="flex w-full flex-col ">
      <h3>Run Details</h3>
      <div className="flex">
        <div className="form-control w-fit">
          <span className="label-text">Pace</span>
          <TimeInput minutes seconds></TimeInput>
          <RadioGroup
            options={['minutes per mile', 'minutes per km']}
            groupName="pace"
          />
        </div>
        <Divider></Divider>
        <div className="form-control w-fit">
          <span className="label-text">Distance</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-sm bg-white w-full max-w-xs"
          />
          <RadioGroup options={['miles', 'kilometers']} groupName="distance" />
        </div>
        <div className="form-control w-fit ml-6">
          <span className="label-text">Time</span>
          <TimeInput hours minutes seconds></TimeInput>
        </div>
      </div>
    </div>
  );
}
