import React, { useState } from "react";

interface AccordionProps {
  header: string;
  color: string;
  count: number;
  arrow: string;
  data: {
    id: number;
    name: string;
    checked: boolean;
    dueOn: string;
    status: string;
    category: string;
  }[];
}

const AccordionWithTable: React.FC<AccordionProps> = ({
  header,
  count,
  color,
  arrow,
  data,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState(data);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (id: number) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="accordion border rounded-2xl shadow-md">
      <div
        className="accordion-header p-4 cursor-pointer rounded-2xl flex justify-between items-center"
        style={{ backgroundColor: color }}
        onClick={toggleAccordion}
      >
        <span>
          {header} ({count})
        </span>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke={arrow}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="accordion-content p-4">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className=""></th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id} className="flex items-center">
                  <td className="border px-2 py-2 gap-x-2 flex w-3/4 items-center">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    {item.name}
                  </td>
                  <td className="border px-2 py-2 w-1/2 flex">{item.dueOn}</td>
                  <td className="border px-2 py-2 w-1/2 flex">
                    <div className="flex justify-center items-center bg-[#DDDADD] rounded-md px-2 py-1">{item.status}</div>
                  </td>
                  <td className="border px-2 py-2 w-3/5 flex">
                    {item.category}
                  </td>
                  <td className="border px-2 py-2 w-1/10 flex">:</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AccordionWithTable;
