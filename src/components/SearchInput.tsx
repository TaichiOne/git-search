import throttle from "lodash/throttle";

import { ChangeEventHandler } from "react";

interface SearchInputProps {
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchInput = ({ handleChange }: SearchInputProps) => {
  const throttledOnChange = throttle(handleChange, 1000);

  return (
    <div className="relative">
      <div className="flex items-center border rounded-md mt-2">
        <input
          type="text"
          id="inputField"
          onChange={throttledOnChange}
          placeholder="Введите текст"
          className="w-full py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute right-3 top-2 text-gray-400 pointer-events-none"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
    </div>
  );
};

export default SearchInput;
