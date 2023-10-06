interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="toggle mr-2 border-gray-200 bg-gray-200"
    />
  );
}
