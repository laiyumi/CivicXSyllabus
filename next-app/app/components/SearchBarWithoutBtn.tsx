interface SearchBarWithoutBtnProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBarWithoutBtn({
  value,
  onChange,
}: SearchBarWithoutBtnProps) {
  return (
    <div className="form-control max-xs:w-full">
      <div className="relative w-full flex">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="indent-8 input input-bordered xs:input-sm lg:input-md  flex-1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
