import { NumberInput } from './NumberInput';

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
            <NumberInput
              labelBottom="hr"
              dummyText="00"
              addClass="max-w-[4rem]"
            />
          </div>
          <h3>&nbsp;:&nbsp;</h3>
        </>
      )}
      {minutes && (
        <>
          <div className="form-control">
            <NumberInput
              labelBottom="min"
              dummyText="00"
              addClass="max-w-[4rem]"
            />
          </div>
          <h3>&nbsp;:&nbsp;</h3>
        </>
      )}
      {seconds && (
        <div className="form-control">
          <NumberInput
            labelBottom="sec"
            dummyText="00"
            addClass="max-w-[4rem]"
          />
        </div>
      )}
    </div>
  );
}
