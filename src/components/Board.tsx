import React, { useState, useEffect } from "react";
import plus from "../assets/plus.svg";
import { addUserData, deleteById, update } from "../firebase/queries";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import tickDisabled from "../assets/tick_disabled.svg";
import tickActive from "../assets/tick_active.svg";
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
  count,
  color,
  arrow,
  data,
  getList,
  multiselect,
  handleEdit,
  selectedTasks,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tableData, setTableData] = useState(data);
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [dropdown2Open, setDropdown2Open] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState<number | null>(
    null
  );
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueOn, setDueOn] = useState("");
  const userData = useSelector((state: RootState) => state.main.user) as {
    email: any;
    photoURL: string;
    displayName: string;
  };
  const [dropdownOpen, setDropdownOpen] = useState(0);

  async function handleDelete(id: any) {
    await deleteById(id);
    getList();
    setDropdownOpen(0);
  }

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const toggleAddTaskSection = () => {
    setIsAddTaskOpen(!isAddTaskOpen);
  };

  const handleDropdown1Toggle = () => {
    setDropdown1Open(!dropdown1Open);
  };

  const handleDropdown2Toggle = () => {
    setDropdown2Open(!dropdown2Open);
  };

  const handleOptionSelect1 = (option: string) => {
    setSelectedStatus(option);
    setDropdown1Open(false);
  };

  const handleOptionSelect2 = (option: string) => {
    setSelectedCategory(option);
    setDropdown2Open(false);
  };

  const handleStatusDropdownToggle = (id: number) => {
    setStatusDropdownOpen(statusDropdownOpen === id ? null : id);
  };

  const handleStatusSelect = async (id: number, status: string) => {
    await update(id, { task_status: status });
    getList();
    setStatusDropdownOpen(null);
  };

  const handleTaskCreation = async () => {
    let payload: {
      task_title: string;
      task_category: string | null;
      due_on: string | null;
      task_status: string | null;
      email_id: any;
      created_at: Date;
    } = {
      task_title: taskTitle,
      task_category: selectedCategory,
      due_on: taskDueOn,
      task_status: selectedStatus,
      email_id: userData.email,
      created_at: new Date(),
    };

    addUserData(payload);
    getList();
  };

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
