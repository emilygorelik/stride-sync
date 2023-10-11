interface InfoProps {
  text: string;
}

export function Info({ text }: InfoProps) {
  return (
    <div className="dropdown dropdown-right dropdown-hover">
      <svg
        tabIndex={0}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-4 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div
        tabIndex={0}
        className="dropdown-content w-fit rounded bg-purple-300 p-1 text-black"
      >
        {text}
      </div>
    </div>
  );
}
