import { NumberInput, SubmitButton } from '.';

interface BpmBlockProps {
  bpm: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: () => void;
}

export function BpmBlock({ bpm, onChange, onClick }: BpmBlockProps) {
  return (
    <div className="flex w-full flex-col items-center rounded-lg border-[1px] border-primary p-2">
      <h3>Your Calculated BPM is {bpm}</h3>
      <div className="flex items-center gap-4">
        <p>Override Calculated BPM</p>
        <NumberInput placeholder={bpm.toString()} onChange={onChange} />
      </div>
      <SubmitButton onClick={onClick}>Export Playlist</SubmitButton>
    </div>
  );
}
