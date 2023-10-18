import { NumberInput, SubmitButton } from '.';

interface BpmInfoProps {
  onClick: VoidFunction;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  bpm: number;
}

export function BpmInfo({ onClick, onChange, value, bpm }: BpmInfoProps) {
  return (
    <>
      <div className="flex w-full items-center gap-2">
        <SubmitButton onClick={onClick}>Calculate BPM</SubmitButton>
        {bpm !== -1 && isFinite(bpm) && <h3>Your Calculated BPM is {bpm}</h3>}
      </div>
      <div className="flex w-full items-center gap-4 rounded-lg border-[1px] border-primary pl-2 pt-2">
        <h3>Override Calculated BPM:</h3>
        <NumberInput
          placeholder={bpm !== -1 && isFinite(bpm) ? bpm.toString() : ''}
          onChange={onChange}
          value={value} // Use bpmInputValue as the input value
        />
      </div>
    </>
  );
}
