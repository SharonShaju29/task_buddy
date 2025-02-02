import React, { useState, useEffect } from "react";
import plus from "../assets/plus.svg";
import { addUserData, deleteById, update } from "../firebase/queries";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import tickDisabled from "../assets/tick_disabled.svg";
import tickActive from "../assets/tick_active.svg";
import actions from "../assets/actions.svg"
import edit from "../assets/edit_icon.svg"
import deleteIcon from "../assets/delete_icon.svg"
import { formatDate } from "../utils/date";
import { useMediaQuery } from "@mui/material";

interface AccordionProps {
  header: string;
  color: string;
  count: number;
  arrow: string;
  getList: () => void;
  handleEdit: (item:any) => void;
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

const AccordionWithTable: React.FC<AccordionProps> = ({
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
  const [isOpen, setIsOpen] = useState(true);
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
  const [dropdownOpen,setDropdownOpen] = useState(0)
  const isMobile = useMediaQuery("(max-width:800px)");


  async function handleDelete(id:any) {
    await deleteById(id)
    getList()
    setDropdownOpen(0)
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
    <div className="accordion border rounded-2xl shadow-md">
      <div
        className={`accordion-header p-4 cursor-pointer rounded-2xl flex justify-between items-center bg-[${color}]`}
        style={
          isOpen
            ? { borderRadius: "16px 16px 0 0", background: color }
            : { background: color }
        }
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
        <div className="accordion-content p-4 bg-[#F1F1F1] min-h-[200px]">
          <table className="table-auto w-full h-full">
            <thead>
              <tr>
                <th className=""></th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody className="bg-[#F1F1F1] h-full">
              {header === "Todo" && !isMobile && (
                <>
                  <tr className="flex border-b-2 pb-1">
                    <td
                      className="w-full flex gap-x-1 pl-3 cursor-pointer"
                      id="add-task"
                      onClick={toggleAddTaskSection}
                    >
                      <img src={plus} height={24} width={24} />
                      ADD Task
                    </td>
                  </tr>
                  {isAddTaskOpen && (
                    <tr className="flex border-b-2 pb-1 w-full ">
                      <td className="w-[80%] gap-y-3 flex flex-col my-3 text-[14px]">
                        <div
                          className="flex justify-between w-full gap-y-2"
                          id="add-task-inputs"
                        >
                          <input
                            type="text"
                            placeholder="Task Name"
                            className="border-none outline-none rounded px-2 py-1 bg-inherit text-[#00000080]"
                            onChange={(e) => setTaskTitle(e.target.value)}
                          />
                          <input
                            type="date"
                            placeholder="Add Date"
                            className="border outline-none px-2 py-1 bg-inherit text-[#00000080] rounded-3xl"
                            onChange={(e) => setDueOn(e.target.value)}
                          />
                          <div className="relative w-[10%]">
                            <button
                              className="bg-gray-200 rounded-full p-2"
                              onClick={handleDropdown1Toggle}
                            >
                              {selectedStatus || (
                                <img src={plus} height={16} width={16} />
                              )}
                            </button>
                            {dropdown1Open && (
                              <div className="absolute mt-2 left-[78px] top-1 p-1 text-[12px] w-[110px] bg-[#FFF9F9] border-[#7B198426] border rounded-xl shadow-lg z-10">
                                <ul> 
                                  <li
                                    className="p-2 cursor-pointer text-left"
                                    onClick={() => handleOptionSelect1("TO-DO")}
                                  >
                                    TO-DO
                                  </li>
                                  <li
                                    className="p-2 cursor-pointer text-left"
                                    onClick={() =>
                                      handleOptionSelect1("IN-PROGRESS")
                                    }
                                  >
                                    IN-PROGRESS
                                  </li>
                                  <li
                                    className="p-2 cursor-pointer text-left"
                                    onClick={() =>
                                      handleOptionSelect1("COMPLETED")
                                    }
                                  >
                                    COMPLETED
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="relative w-[10%]">
                            <button
                              className="bg-gray-200 rounded-full p-2"
                              onClick={handleDropdown2Toggle}
                            >
                              {selectedCategory || (
                                <img src={plus} height={16} width={16} />
                              )}
                            </button>
                            {dropdown2Open && (
                              <div className="absolute mt-2 left-[78px] p-1 top-1 w-[110px] bg-[#FFF9F9] border border-[#7B198426] rounded-xl text-[12px] shadow-lg z-10">
                                <ul>
                                  <li
                                    className="p-2 cursor-pointer text-left"
                                    onClick={() => handleOptionSelect2("Work")}
                                  >
                                    Work
                                  </li>
                                  <li
                                    className="p-2 cursor-pointer text-left"
                                    onClick={() =>
                                      handleOptionSelect2("Personal")
                                    }
                                  >
                                    Personal
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="w-full flex gap-x-2 pl-3">
                          <button
                            className="bg-[#7B1984] text-white px-4 py-2 rounded-3xl"
                            onClick={handleTaskCreation}
                          >
                            Add Task
                          </button>
                          <button
                            className="text-black px-4 py-2 rounded bg-inherit border-none"
                            onClick={toggleAddTaskSection}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )}
              
              {tableData.map((item) => (
                <tr key={item.id} className="flex items-center border-b-2 ">
                  <td className="px-2 py-2 gap-x-2 flex w-3/4 items-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={selectedTasks.includes(item.id.toString())}
                      onChange={() => multiselect(item.id)}
                      style={{accentColor:arrow}}
                    />

                    <img
                      src={header === "Completed" ? tickActive : tickDisabled}
                      height={24}
                      width={24}
                    />
                    <div
                      className={header === "Completed" ? "line-through" : ""}
                    >
                      {item.task_title}
                    </div>
                  </td>
                  <td className="px-2 py-2 w-1/2 flex">
                  {!isMobile && <div>{item.due_on === new Date().toISOString().split('T')[0] ? 'Today' : formatDate(item.due_on)}</div>}
                  </td>
                  <td className="px-2 py-2 w-1/2 flex relative">
                    {!isMobile && <div
                      className="flex justify-center items-center bg-[#DDDADD] rounded-md px-2 py-1 cursor-pointer"
                      id="status"
                      onClick={() => handleStatusDropdownToggle(item.id)}
                    >
                      {item.task_status}
                    </div>}
                    {statusDropdownOpen === item.id && (
                      <div className="absolute z-10 mt-2 w-48 bg-white border rounded shadow-lg">
                        <ul>
                          <li
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleStatusSelect(item.id, "TO-DO")}
                          >
                            TO-DO
                          </li>
                          <li
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() =>
                              handleStatusSelect(item.id, "IN-PROGRESS")
                            }
                          >
                            IN-PROGRESS
                          </li>
                          <li
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() =>
                              handleStatusSelect(item.id, "COMPLETED")
                            }
                          >
                            COMPLETED
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                  <td className="px-2 py-2 w-3/5 flex">{!isMobile && item.task_category}</td>
                  <td className="px-2 py-2 w-1/10 flex">
                  {!isMobile && <div className="relative">
                      <img
                        src={actions}
                        width={36}
                        className="cursor-pointer"
                        onClick={() => setDropdownOpen(dropdownOpen === item.id ? 0 : item.id)}
                      />
                      {dropdownOpen === item.id && (
                        <div className="absolute right-0 mt-2 w-[100px] bg-[#FFF9F9] border border-[#7B198426] rounded-xl shadow-lg z-10">
                          <ul className="text-base">
                            <li
                              className="p-2 cursor-pointer flex gap-x-2"
                              onClick={() => handleEdit(item)}
                            >
                              <img src={edit}/> Edit
                            </li>
                            <li
                              className="p-2 cursor-pointer flex gap-x-2 text-[#DA2F2F]"
                              onClick={() => handleDelete(item.id)}
                            >
                             <img src={deleteIcon}/> Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>}</td>
                </tr>
              ))}

              {!tableData.length && <div className="h-[120px] text-[15px] text-[#2F2F2F] flex items-center w-full justify-center">
                No Tasks in {header}
                </div>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AccordionWithTable;
