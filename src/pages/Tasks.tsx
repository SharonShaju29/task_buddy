import task from "../assets/headerTask.svg";
import React, { useState } from "react";
import CustomSelect from "../components/CustomSelect";
import searchIcon from "../assets/search_icon.svg";
import AccordionWithTable from "../components/AccordionWithTable";

const options = ["Option 1", "Option 2", "Option 3"];
const data = [
  {
    id: 1,
    name: "Morning Workout",
    checked: false,
    dueOn: "Today",
    status: "TO-DO",
    category: "Work"

  },
  {
    id: 1,
    name: "Morning Workout",
    checked: false,
    dueOn: "Today",
    status: "TO-DO",
    category: "Work"
  },
  {
    id: 1,
    name: "Morning Workout",
    checked: false,
    dueOn: "Today",
    status: "TO-DO",
    category: "Work"
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedOption, setSelectedOption] = useState("");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSelect = (value: string) => {
    console.log(selectedOption);
    setSelectedOption(value);
  };

  return (
    <div className="tabs px-7 w-full">
      <div className="tab-buttons flex gap-x-4 border-b">
        <div
          className={`tab-button flex items-center gap-x-2 pb-1 ${
            activeTab === "List" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => handleTabClick("List")}
        >
          <img src={task} height={16} width={16} />
          List
        </div>
        <div
          className={`tab-button flex items-center gap-x-2 pb-1 ${
            activeTab === "Board" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => handleTabClick("Board")}
        >
          <img src={task} height={16} width={16} />
          Board
        </div>
      </div>
      <div className="tab-content mt-4 w-full">
        {activeTab === "List" && (
          <div>
            <div className="flex justify-between w-full items-center">
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
              <div className="flex gap-x-2 items-center">
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
  return (
    <div className="py-8 w-[100vw]">
      <div className="fixed top-6 w-full px-6 flex items-center flex-col gap-y-4">
        <div className="flex justify-between w-full items-center">
          <div className="flex w-full">
            <img src={task} height={24} width={24} />
            <span className="text-[#2F2F2F] font-semibold text-[24px]">
              TaskBuddy
            </span>
          </div>
          <div className="flex gap-x-2 items-center">
            <img src={task} className="rounded-full" />
            Aravind
          </div>
        </div>
      </div>
      <div className="absolute top-20 w-full">
        <div className="w-full" id="tabs">
          <Tabs />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
