import React, { useState, useEffect } from "react";
import { deleteById } from "../firebase/queries";
import actions from "../assets/actions.svg";
import edit from "../assets/edit_icon.svg";
import deleteIcon from "../assets/delete_icon.svg";
import { formatDate } from "../utils/date";

interface BoardProps {
  header: string;
  color: string;
  count: number;
  arrow: string;
  getList: () => void;
  handleEdit: (item: any) => void;
  multiselect: (id: number) => void;
  selectedTasks: string[];
  data: {
    id: number;
    task_title: string;
    checked: boolean;
    due_on: string;
    task_status: string;
    task_category: string;
  }[];
}

const Board: React.FC<BoardProps> = ({
  header,
  color,
  data,
  getList,
  handleEdit,
}) => {
  const [tableData, setTableData] = useState(data);
  const [dropdownOpen, setDropdownOpen] = useState(0);

  async function handleDelete(id: any) {
    await deleteById(id);
    getList();
    setDropdownOpen(0);
  }

  useEffect(() => {
    setTableData(data);
  }, [data]);


  return (
    <div className="accordion border rounded-2xl shadow-md w-[330px] bg-[#F1F1F1] h-[60vh] overflow-hidden">
      <div
        className={`accordion-header p-4 w-full h-full rounded-2xl flex flex-col justify-between font-semibold items-center bg-[#F1F1F1]`}
      >
        <div className="flex text-left w-full">
          <span
            className={`rounded-md text-[14px] p-1`}
            style={{ background: color }}
          >
            {header.toUpperCase()}
          </span>
        </div>

        <div className="w-full gap-y-2 mt-2 h-full overflow-y-scroll scrollbar-none">
          {tableData.map((item, index) => (
            <div
              key={index}
              className="w-full p-2 min-h-[110px] gap-y-[80px] flex flex-col bg-white rounded-lg mt-3"
            >
              <div className="flex justify-between w-full items-center">
                <div className={header==='Completed'? 'line-through':''}>{item.task_title}</div>
                <div className="relative">
                  <img
                    src={actions}
                    width={16}
                    className="cursor-pointer"
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === item.id ? 0 : item.id)
                    }
                  />
                  {dropdownOpen === item.id && (
                    <div className="absolute right-0 mt-2 w-[100px] bg-[#FFF9F9] border border-[#7B198426] rounded-xl shadow-lg z-10">
                      <ul className="text-base">
                        <li
                          className="p-2 cursor-pointer flex gap-x-2"
                          onClick={() => handleEdit(item)}
                        >
                          <img src={edit} /> Edit
                        </li>
                        <li
                          className="p-2 cursor-pointer flex gap-x-2 text-[#DA2F2F]"
                          onClick={() => handleDelete(item.id)}
                        >
                          <img src={deleteIcon} /> Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-[#00000085]">
                <div>{item.task_category}</div>
                <div>
                  {item.due_on === new Date().toISOString().split("T")[0]
                    ? "Today"
                    : formatDate(item.due_on)}
                </div>
              </div>
            </div>
          ))}

{!tableData.length && <div className="h-[180px] text-[15px] text-[#2F2F2F] flex items-center w-full justify-center">
                No Tasks in {header}
                </div>}
        </div>
      </div>
    </div>
  );
};

export default Board;
