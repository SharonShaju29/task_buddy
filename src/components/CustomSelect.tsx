import React, { useEffect, useState } from "react";

interface CustomSelectProps {
  options: string[];
  onSelect: (value: string, type: string) => void;
  placeholder?: string;
  styles?: string;
  defaultOpt?: string;
  bg?:string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  onSelect,
  defaultOpt,
  placeholder = "Select an option",
  styles,
  bg
}) => {
  const [selectedOption, setSelectedOption] = useState<
    string | null | undefined
  >(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (defaultOpt) setSelectedOption(defaultOpt);
  }, [defaultOpt]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    let type = "";
    if (placeholder === "Category") {
      type = "category";
      if (option === "All") setSelectedOption("");
    } else if (placeholder === "Due Date") type = "Due Date";

    onSelect(option, type);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block min-w-[90px]">
      <div
        className={` border border-gray-300 w-[120px] rounded-2xl p-2 cursor-pointer bg-[${bg}] flex justify-between items-center ${styles}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{background:bg}}
      >
        <span>{selectedOption || placeholder}</span>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-[100px] bg-white border text-left border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
