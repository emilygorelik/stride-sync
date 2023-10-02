import { TextInput } from './TextInput';

interface TimeInputProps {
  hours?: boolean;
  minutes?: boolean;
  seconds?: boolean;
}
export function TimeInput({ hours, minutes, seconds }: TimeInputProps) {
  return (
    <div className="flex">
      {hours && (
        <>
          <div className="form-control">
            <TextInput labelBottom="hr" dummyText="00" addClass="w-16" />
          </div>
          <h3>&nbsp;:&nbsp;</h3>
        </>
      )}
      {minutes && (
        <>
          <div className="form-control">
            <TextInput labelBottom="min" dummyText="00" addClass="w-16" />
          </div>
          <h3>&nbsp;:&nbsp;</h3>
        </>
      )}
      {seconds && (
        <div className="form-control">
          <TextInput labelBottom="sec" dummyText="00" addClass="w-16" />
        </div>
      )}
    </div>
  );
}
