import task from "../assets/headerTask.svg";
import React, { useState } from "react";
import CustomSelect from "../components/CustomSelect";
import searchIcon from "../assets/search_icon.svg";
import AccordionWithTable from "../components/AccordionWithTable";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import logout from "../assets/logout_icon.svg";
import { useNavigate } from "react-router-dom";
import { updateSignin } from "../store/Reducers/main";

const options = ["Option 1", "Option 2", "Option 3"];
const data = [
  {
    id: 1,
    name: "Morning Workout",
    checked: false,
    dueOn: "Today",
    status: "TO-DO",
    category: "Work",
  },
  {
    id: 1,
    name: "Morning Workout",
    checked: false,
    dueOn: "Today",
    status: "TO-DO",
    category: "Work",
  },
  {
    id: 1,
    name: "Morning Workout",
    checked: false,
    dueOn: "Today",
    status: "TO-DO",
    category: "Work",
  },
];

const Tabs = ({ onAddTaskClick }: { onAddTaskClick: () => void }) => {
  const [activeTab, setActiveTab] = useState("List");
  const [selectedOption, setSelectedOption] = useState("");
  const userData = useSelector((state: RootState) => state.main.user) as {
    photoURL: string;
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSelect = (value: string) => {
    console.log(selectedOption);
    setSelectedOption(value);
  };

  return (
    <div className="tabs w-full relative mb-28 bg-white">
      <div className="tab-buttons flex  px-7 gap-x-4 border-b fixed top-16 z-10 bg-white w-full">
        <div
          className={`tab-button flex cursor-pointer items-center gap-x-2 pb-1 ${
            activeTab === "List" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => handleTabClick("List")}
        >
          <img src={task} height={16} width={16} />
          List
        </div>
        <div
          className={`tab-button flex cursor-pointer items-center gap-x-2 pb-1 ${
            activeTab === "Board" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => handleTabClick("Board")}
        >
          <img src={task} height={16} width={16} />
          Board
        </div>
      </div>
      <div className="tab-content mt-6 w-full">
        {activeTab === "List" && (
          <div>
            <div className="flex justify-between w-full items-center px-7">
              <div className="flex items-center gap-x-2 text-[12px]">
                <div>
                  <span>Filter by</span>
                </div>
                <CustomSelect
                  options={options}
                  onSelect={handleSelect}
                  placeholder={"Category"}
                />
                <CustomSelect
                  options={options}
                  onSelect={handleSelect}
                  placeholder={"Due Date"}
                />
              </div>
              <div
                className="flex gap-x-2 items-center"
                id="add-task"
                onClick={onAddTaskClick}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-8 pr-4 py-2 border rounded-2xl text-sm bg-white outline-none"
                    style={{ border: "1px solid #0000006B" }}
                  />
                  <img src={searchIcon} className="absolute top-2.5 left-2" />
                </div>
                <div className="text-white text-[16px] bg-[#7B1984] w-[150px] h-[42px] flex items-center justify-center rounded-3xl font-semibold ">
                  ADD TASK
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div
                id="headers"
                className="text-[#00000099] flex justify-between px-4 font-medium text-[14px]"
              >
                <div className="w-max flex pr-[16%]">Task name</div>
                <div className="w-max flex pr-[5%]">Due on</div>
                <div className="w-max flex pl-[2.5%]">Task Status</div>
                <div className="w-max flex pl-[4%]">Task Category</div>
                <div className="w-max pr-[12%]"></div>
              </div>
              <div className="gap-y-2 flex flex-col mt-2">
                <AccordionWithTable
                  header="Todo"
                  color="#FAC3FF"
                  count={3}
                  data={data}
                  arrow="#3E0344"
                />
                <AccordionWithTable
                  header="In-Progress"
                  color="#85D9F1"
                  count={3}
                  data={data}
                  arrow="#055167"
                />
                <AccordionWithTable
                  header="Completed"
                  color="#CEFFCC"
                  count={3}
                  data={data}
                  arrow="#0D7A0A"
                />
              </div>
            </div>
          </div>
        )}
        {activeTab === "Board" && <div>Content for Tab 2</div>}
      </div>
    </div>
  );
};

const Tasks = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userData = useSelector((state: RootState) => state.main.user) as {
    photoURL: string;
    displayName: string;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(updateSignin(false));
    setMenuVisible(false);
    navigate("/");
  };

  const handleAddTaskClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="w-[100vw] bg-white">
      <div className="fixed top-0 w-full px-6 flex items-center flex-col gap-y-4 bg-white z-20">
        <div className="flex justify-between w-full items-center bg-white">
          <div className="flex w-full py-4">
            <img src={task} height={24} width={24} />
            <span className="text-[#2F2F2F] font-semibold text-[24px]">
              TaskBuddy
            </span>
          </div>
          <div className="flex gap-x-1 items-center pr-8 relative">
            {userData.photoURL && (
              <img
                src={userData.photoURL}
                className="rounded-full cursor-pointer"
                height={36}
                width={36}
                onClick={toggleMenu}
              />
            )}
            <span className="min-w-full cursor-pointer" onClick={toggleMenu}>
              {userData.displayName}
            </span>
            {menuVisible && (
              <div className="absolute top-10 right-0 bg-[#FFF9F9] border rounded shadow-lg">
                <div className="flex items-center gap-x-2 p-2 cursor-pointer hover:bg-gray-100">
                  <img src={logout} height={16} width={16} />
                  <span className="font-medium" onClick={handleLogout}>
                    Logout
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute top-20 w-full">
        <div className="w-full" id="tabs">
          <Tabs onAddTaskClick={handleAddTaskClick} />
        </div>
      </div>
      <Modal
        header="Create Task"
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      >
        <div className="px-4">
          <input
            type="text"
            className="outline-none text-[14px] h-[38px] w-full rounded-md px-1 bg-[#F1F1F15C] text-[#1E212A] border border-[#00000021] bg-white"
            placeholder="Task Title"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Tasks;

interface ModalProps {
  header: string;
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ header, isVisible, onClose, children }: ModalProps) => {
  if (!isVisible) return null;

  const handleClose = (e: any) => {
    if (e.target.id === "modal-backdrop") onClose();
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div className="bg-white rounded-xl shadow-lg  relative w-[50%] h-[85%]">
        <div className="sticky top-0 px-4 py-2 w-full justify-between flex items-center border-b">
          <span className="font-medium text-[24px]">{header}</span>
          <button onClick={onClose} className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="py-2">{children}</div>
      </div>
    </div>
  );
};
