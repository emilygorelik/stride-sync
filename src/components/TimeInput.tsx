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
            <input
              type="text"
              placeholder="00"
              className="input input-bordered input-sm focus:outline-none w-16 bg-white text-black"
            />
            <span className="label-text">hr</span>
          </div>
          <h3>&nbsp;:&nbsp;</h3>
        </>
      )}
      {minutes && (
        <>
          <div className="form-control">
            <input
              type="text"
              placeholder="00"
              className="input input-bordered input-sm focus:outline-none w-16 bg-white text-black"
            />
            <span className="label-text">min</span>
          </div>
          <h3>&nbsp;:&nbsp;</h3>
        </>
      )}
      {seconds && (
        <div className="form-control">
          <input
            type="text"
            placeholder="00"
            className="input input-bordered input-sm focus:outline-none w-16 bg-white text-black"
          />
          <span className="label-text">sec</span>
        </div>
      )}
    </div>
  );
}
