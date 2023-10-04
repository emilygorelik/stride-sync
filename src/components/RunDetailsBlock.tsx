import { Divider } from './Divider';
import { RadioGroup } from './RadioGroup';
import { TextInput } from './TextInput';
import { TimeInput } from './TimeInput';

export function RunDetailsBlock() {
  return (
    <div className="flex w-full flex-col ">
      <h3>Run Details</h3>
      <div className="flex">
        <div className="form-control w-fit">
          <span className="label-text">Pace</span>
          <TimeInput minutes seconds />
          <RadioGroup
            options={['minutes per mile', 'minutes per km']}
            groupName="pace"
          />
        </div>
        <Divider />
        <div className="form-control w-fit">
          <span className="label-text">Distance</span>
          <TextInput labelBottom="&nbsp;" dummyText="00.00" />
          <RadioGroup options={['miles', 'kilometers']} groupName="distance" />
        </div>
        <div className="form-control ml-6 w-fit">
          <span className="label-text">Time</span>
          <TimeInput hours minutes seconds />
        </div>
      </div>
    </div>
  );
}
