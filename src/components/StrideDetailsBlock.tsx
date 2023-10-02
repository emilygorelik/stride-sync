import { Divider } from './Divider';
import { RadioGroup } from './RadioGroup';
import { TextInput } from './TextInput';

export function StrideDetailsBlock() {
  return (
    <div className="flex w-full flex-col ">
      <h3>Stride Details</h3>
      <div className="flex">
        <div className="form-control w-fit">
          <span className="label-text">Stride Length</span>
          <TextInput dummyText="00.00" />
          <RadioGroup options={['inches', 'centimeters']} groupName="stride" />
        </div>
        <Divider></Divider>
        <div className="form-control w-fit">
          <span className="label-text">Height</span>
          <TextInput dummyText="00.00" />
          <RadioGroup options={['inches', 'centimeters']} groupName="height" />
        </div>
      </div>
    </div>
  );
}
