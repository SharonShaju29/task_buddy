import task from "../assets/headerTask.svg";
import React, { useEffect, useState } from "react";
import CustomSelect from "../components/CustomSelect";
import searchIcon from "../assets/search_icon.svg";
import AccordionWithTable from "../components/AccordionWithTable";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import logout from "../assets/logout_icon.svg";
import { useNavigate } from "react-router-dom";
import { updateSignin } from "../store/Reducers/main";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addUserData, deleteMany, get, update, updateMany } from "../firebase/queries";
import multiselect from "../assets/multiselect.svg";
import list from "../assets/list.svg";
import board from "../assets/board.svg";
import Board from "../components/Board";
import { useMediaQuery } from "@mui/material";

const optionsCategory = ["All", "Work", "Personal"];

const Tabs = ({
  onAddTaskClick,
  todoList,
  inProgressList,
  completedList,
  getList,
  handleEdit,
}: {
  onAddTaskClick: () => void;
  handleEdit: (item: any) => void;
  todoList: any[];
  inProgressList: any[];
  completedList: any[];
  getList: any;
}) => {
  const [activeTab, setActiveTab] = useState("List");
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [filteredTodoList, setFilteredTodoList] = useState<any>(todoList);
  const [filteredInProgressList, setFilteredInProgressList] =
    useState<any>(inProgressList);
  const [filteredCompletedList, setFilteredCompletedList] =
    useState<any>(completedList);
  const userData = useSelector((state: RootState) => state.main.user) as {
    photoURL: string;
  };
  const [selectedTasks, setSelectedTasks] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [searchQuery, setSearchQuery] = useState("");
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  const isMobile = useMediaQuery("(max-width:800px)");

  useEffect(() => {
    setFilteredTodoList(todoList);
  }, [todoList]);

  useEffect(() => {
    setFilteredInProgressList(inProgressList);
  }, [inProgressList]);

  useEffect(() => {
    setFilteredCompletedList(completedList);
  }, [completedList]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSearch = (query: string) => {
    if (query) {
      const regex = new RegExp(query, "i");
      setFilteredTodoList(
        filteredTodoList.filter((val: any) => regex.test(val.task_title))
      );
      setFilteredInProgressList(
        filteredInProgressList.filter((val: any) => regex.test(val.task_title))
      );
      setFilteredCompletedList(
        filteredCompletedList.filter((val: any) => regex.test(val.task_title))
      );
    } else {
      setFilteredTodoList(todoList);
      setFilteredInProgressList(inProgressList);
      setFilteredCompletedList(completedList);
    }
  };

  const handleSelect = (value: string, type: string) => {
    let state = selectedFilter;
    if (type === "category") {
      if (value === "All") setSelectedCategory("Category");
      if (value === "All") setFilteredTodoList(todoList);
      else
        setFilteredTodoList(
          todoList.filter((val) => val.task_category === value)
        );

      if (value === "All") setFilteredInProgressList(inProgressList);
      else
        setFilteredInProgressList(
          inProgressList.filter((val) => val.task_category === value)
        );

      if (value === "All") setFilteredCompletedList(completedList);
      else
        setFilteredCompletedList(
          completedList.filter((val) => val.task_category === value)
        );
      state.task_category = value;
    } else if (type === "Due Date") {
      if (value === "") setFilteredTodoList(todoList);
      else setFilteredTodoList(todoList.filter((val) => val.due_on === value));

      if (value === "") setFilteredInProgressList(inProgressList);
      else
        setFilteredInProgressList(
          inProgressList.filter((val) => val.due_on === value)
        );

      if (value === "") setFilteredCompletedList(completedList);
      else
        setFilteredCompletedList(
          completedList.filter((val) => val.due_on === value)
        );
      state.due_on = value;
    }

    setSelectedFilter(state);
  };

  const [status, setStatus] = useState<string>("");

  const handleStatusChange = (status: string) => {
    setShowStatusOptions(false);
    setStatus(status);
  };

  const handleSelectedTasks = (id: any) => {
    setSelectedTasks((prevTasks) =>
      prevTasks.includes(id)
        ? prevTasks.filter((taskId) => taskId !== id)
        : [...prevTasks, id]
    );
  };

  const [showMultiSelectBox, setShowMultiSelectBox] = useState(false);

  useEffect(() => {
    setShowMultiSelectBox(Boolean(selectedTasks.length));
  }, [selectedTasks]);

  const updateUsingMultiselect = async () => {
    await updateMany(selectedTasks, { task_status: status });
    setSelectedTasks([]);
    setShowMultiSelectBox(false);
    setShowStatusOptions(false);
    getList();
  };

  const deleteTasks = async () => {
    await deleteMany(selectedTasks);
    setSelectedTasks([]);
    setShowMultiSelectBox(false);
    setShowStatusOptions(false);
    getList();
  };

  return (
    <div className="tabs w-full relative mb-28 bg-white scrollbar-none">
      {!isMobile && <div className="tab-buttons flex  px-7 gap-x-4 border-b fixed top-16 z-10 bg-white w-full">
        <div
          className={`tab-button flex cursor-pointer items-center gap-x-2 pb-1 ${
            activeTab === "List" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => handleTabClick("List")}
        >
          <img src={list} height={16} width={16} />
          List
        </div>
        <div
          className={`tab-button flex cursor-pointer items-center gap-x-2 pb-1 ${
            activeTab === "Board" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => handleTabClick("Board")}
        >
          <img src={board} height={16} width={16} />
          Board
        </div>
      </div>}
      <div className="tab-content mt-8 w-full relative scrollbar-none">
        {activeTab === "List" && (
          <div className="relative"> 
              
            <div className="fixed top-[56px] md:top-[94px] z-20 pt-3 pb-2 bg-white flex flex-col md:flex-row md:justify-between w-full md:items-center px-4 gap-y-2 md:gap-y-0 md:px-7">
            {isMobile && <div className="bg-white w-[96vw] flex fixed px-3 justify-between"><div></div><div
                  className="text-white cursor-pointer text-[10px] bg-[#7B1984] w-[86px] h-[32px] md:h-[42px] flex items-center justify-center rounded-3xl font-semibold "
                  onClick={onAddTaskClick}
                >
                  ADD TASK
                </div></div>}
              <div className="flex flex-col md:flex-row items-start mt-8 md:mt-0 gap-y-2 md:gap-y-0 md:items-center gap-x-2 text-[12px]">
                <div>
                  <span>Filter by:</span>
                </div>
                <div className="flex gap-x-2">
                <CustomSelect
                  options={optionsCategory}
                  onSelect={(value) => handleSelect(value, "category")}
                  placeholder={"Category"}
                />
                <input
                  type="date"
                  placeholder="Due Date"
                  className="pl-2 pr-4 py-2 h-[34px] border rounded-2xl text-sm bg-white outline-none"
                  style={{ border: "1px solid #0000006B" }}
                  onChange={(e) => handleSelect(e.target.value, "Due Date")}
                />
                </div>
              </div>
              <div className="flex gap-x-2 items-center" id="add-task">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-8 pr-4 py-2 border rounded-2xl text-sm bg-white outline-none w-[90vw] md:w-auto"
                    style={{ border: "1px solid #0000006B" }}
                  />
                  <img src={searchIcon} className="absolute top-2.5 left-2" />
                </div>
                {!isMobile && <div
                  className="text-white cursor-pointer text-[16px] bg-[#7B1984] w-[150px] h-[42px] flex items-center justify-center rounded-3xl font-semibold "
                  onClick={onAddTaskClick}
                >
                  ADD TASK
                </div>}
              </div>
            </div>
            <div className="mt-36 md:mt-24 px-3 md:px-8 z-10">
             { !isMobile && <div
                id="headers"
                className="text-[#00000099] flex justify-between px-8 font-medium text-[14px]"
              >
                <div className="w-max flex pr-[16%]">Task name</div>
                <div className="w-max flex pr-[5%]">Due on</div>
                <div className="w-max flex pl-[2.5%]">Task Status</div>
                <div className="w-max flex pl-[4%]">Task Category</div>
                <div className="w-max pr-[12%]"></div>
              </div>}
              <div className="gap-y-4 flex flex-col mt-2">
                <AccordionWithTable
                  header="Todo"
                  color="#FAC3FF"
                  count={filteredTodoList.length}
                  data={filteredTodoList}
                  arrow="#3E0344"
                  getList={getList}
                  multiselect={handleSelectedTasks}
                  selectedTasks={selectedTasks}
                  handleEdit={handleEdit}
                />
                <AccordionWithTable
                  header="In-Progress"
                  color="#85D9F1"
                  count={filteredInProgressList.length}
                  data={filteredInProgressList}
                  arrow="#055167"
                  getList={getList}
                  multiselect={handleSelectedTasks}
                  selectedTasks={selectedTasks}
                  handleEdit={handleEdit}
                />
                <AccordionWithTable
                  header="Completed"
                  color="#CEFFCC"
                  count={filteredCompletedList.length}
                  data={filteredCompletedList}
                  arrow="#0D7A0A"
                  getList={getList}
                  multiselect={handleSelectedTasks}
                  selectedTasks={selectedTasks}
                  handleEdit={handleEdit}
                />
              </div>
            </div>
          </div>
        )}
        {activeTab === "Board" && 
           <div>
           <div className="fixed top-[100px] z-20 pt-3 pb-2 bg-white flex justify-between w-full items-center px-7">
             <div className="flex items-center gap-x-2 text-[12px]">
               <div>
                 <span>Filter by</span>
               </div>
               <CustomSelect
                 options={optionsCategory}
                 onSelect={(value) => handleSelect(value, "category")}
                 placeholder={"Category"}
               />
               <input
                 type="date"
                 placeholder="Due Date"
                 className="pl-2 pr-4 py-2 border rounded-2xl text-sm bg-white outline-none"
                 style={{ border: "1px solid #0000006B" }}
                 onChange={(e) => handleSelect(e.target.value, "Due Date")}
               />
             </div>
             <div className="flex gap-x-2 items-center" id="add-task">
               <div className="relative">
                 <input
                   type="text"
                   placeholder="Search"
                   onChange={(e) => handleSearch(e.target.value)}
                   className="pl-8 pr-4 py-2 border rounded-2xl text-sm bg-white outline-none"
                   style={{ border: "1px solid #0000006B" }}
                 />
                 <img src={searchIcon} className="absolute top-2.5 left-2" />
               </div>
               <div
                 className="text-white cursor-pointer text-[16px] bg-[#7B1984] w-[150px] h-[42px] flex items-center justify-center rounded-3xl font-semibold "
                 onClick={onAddTaskClick}
               >
                 ADD TASK
               </div>
             </div>
           </div>
           <div className="mt-24 px-5">
            <div className="flex gap-x-4">
            <Board
                  header="Todo"
                  color="#FAC3FF"
                  count={filteredTodoList.length}
                  data={filteredTodoList}
                  arrow="#3E0344"
                  getList={getList}
                  multiselect={handleSelectedTasks}
                  selectedTasks={selectedTasks}
                  handleEdit={handleEdit}
                />
                <Board
                  header="In-Progress"
                  color="#85D9F1"
                  count={filteredInProgressList.length}
                  data={filteredInProgressList}
                  arrow="#055167"
                  getList={getList}
                  multiselect={handleSelectedTasks}
                  selectedTasks={selectedTasks}
                  handleEdit={handleEdit}
                />
                <Board
                  header="Completed"
                  color="#CEFFCC"
                  count={filteredCompletedList.length}
                  data={filteredCompletedList}
                  arrow="#0D7A0A"
                  getList={getList}
                  multiselect={handleSelectedTasks}
                  selectedTasks={selectedTasks}
                  handleEdit={handleEdit}
                />
              </div>
           </div>
           </div>

        }
      </div>

      {showMultiSelectBox ? (
        <div className="h-[52px] fixed bottom-4 left-[35vw] w-[30vw] flex justify-center">
          <div className="h-[52px] w-[30vw] flex items-center justify-between px-3 bg-[#1A1C20] rounded-xl z-20">
            <div className="flex items-center gap-x-2">
              <div className="h-[28px] w-[136px] flex items-center justify-center border rounded-xl border-white text-white gap-x-2 px-1 text-[12px]">
                {selectedTasks.length} Task(s) Selected{" "}
                <span
                  className="text-[14px] cursor-pointer flex items-center"
                  onClick={() => setSelectedTasks([])}
                >
                  x
                </span>
              </div>
              <img
                src={multiselect}
                alt=""
                className="cursor-pointer"
                onClick={updateUsingMultiselect}
              />
            </div>
            <div className="flex gap-x-2 text-[12px]">
              <div className="relative ">
                <div
                  className="min-w-[60px] h-[28px] flex items-center justify-center text-white rounded-3xl bg-[#8D8A8A24] border-[0.2px] px-1 cursor-pointer border-white"
                  onClick={() => setShowStatusOptions(!showStatusOptions)}
                >
                  {status ? status : "Status"}
                </div>
                {showStatusOptions && (
                  <div className="absolute bottom-9 flex font-medium pl-1 justify-center flex-col text-white mb-2 w-[100px] h-[100px] text-left text-[12px] bg-[#1A1C20] border rounded-xl shadow-lg">
                    <div
                      className="px-2 py-1 cursor-pointer text-left"
                      onClick={() => handleStatusChange("TO-DO")}
                    >
                      TO-DO
                    </div>
                    <div
                      className="px-2 py-1 cursor-pointer text-left"
                      onClick={() => handleStatusChange("IN-PROGRESS")}
                    >
                      IN-PROGRESS
                    </div>
                    <div
                      className="px-2 py-1 cursor-pointer text-left"
                      onClick={() => handleStatusChange("COMPLETED")}
                    >
                      COMPLETED
                    </div>
                  </div>
                )}
              </div>
              <div
                className="text-[#E13838] w-[60px] h-[28px] flex items-center justify-center rounded-3xl bg-[#FF353524] border-[0.2px] cursor-pointer border-[#E13838]"
                onClick={deleteTasks}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const Tasks = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userData = useSelector((state: RootState) => state.main.user) as {
    email: any;
    photoURL: string;
    displayName: string;
  };

  const isMobile = useMediaQuery("(max-width:800px)");

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

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [taskStatus, setTaskStatus] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState("");

  const [todoTasks, setTodoTasks] = useState<any[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<any[]>([]);
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const [modalHeader, setModalHeader] = useState("Create Task");
  const [actionButtonText, setActionButtonText] = useState("Create");
  const [defaultOpt,setDefaultOpt] = useState('')
  const [updateObjId,setUpdateObjID] = useState('')

  const handleEditModal = (item: any) => {
    setModalHeader("Edit Task");
    setIsModalVisible(true);
    setActionButtonText("Update");
    setTaskTitle(item.task_title)
    setDueDate(item.due_on)
    setEditorContent(item.task_description)
    setSelectedCategory(item.task_category)
    setDefaultOpt(item.task_status)
    setUpdateObjID(item.id)
  };

  async function handleEditCloseModal() {}

  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  async function handleTask(type:string) {
    let payload: {
      task_title: string;
      task_category: string | null;
      due_on: string | null;
      task_status: string;
      email_id: any;
      task_description?: string;
      created_at: Date;
    } = {
      task_title: taskTitle,
      task_category: selectedCategory,
      due_on: dueDate,
      task_status: taskStatus,
      email_id: userData.email,
      created_at: new Date(),
    };

    if (editorContent) {
      payload.task_description = editorContent;
    }

    if(type === 'create') {
    await addUserData(payload) }
    else if(type === 'update') {
    await update(updateObjId,payload)
    }

    getTaskList()
    setIsModalVisible(false)
    
  }

  async function getTaskList() {
    console.log(userData.email);
    const response = await get(userData.email);

    const todo = response.filter((task: any) => task.task_status === "TO-DO");
    const inProgress = response.filter(
      (task: any) => task.task_status === "IN-PROGRESS"
    );
    const completed = response.filter(
      (task: any) => task.task_status === "COMPLETED"
    );

    setTodoTasks(todo);
    setInProgressTasks(inProgress);
    setCompletedTasks(completed);

    console.log(response);
  }

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <div className="w-[100vw] bg-[#FAEEFC] md:bg-white">
      <div className="fixed top-0 w-full px-6 flex items-center flex-col gap-y-4 bg-[#FAEEFC] md:bg-white z-20">
        <div className="flex justify-between w-full items-center">
          <div className="flex w-full py-4">
            {!isMobile && <img src={task} height={24} width={24} />}
            <span className="text-[#2F2F2F] md:font-semibold md:text-[24px]">
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
           { !isMobile && <span className="min-w-full cursor-pointer" onClick={toggleMenu}>
              {userData.displayName}
            </span>}
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
          <Tabs
            onAddTaskClick={handleAddTaskClick}
            todoList={todoTasks}
            inProgressList={inProgressTasks}
            completedList={completedTasks}
            getList={getTaskList}
            handleEdit={handleEditModal}
          />
        </div>
      </div>
      <Modal
        header={modalHeader}
        isVisible={isModalVisible}
        onClose={ handleCloseModal
        }
        actionButtonText={actionButtonText}
        onAction={()=>
          actionButtonText === "Create" ? handleTask('create') : handleTask('update')
        }
      >
        <div className="overflow-hidden h-full">
          <div className="overflow-y-auto h-full">
            <div className="px-4">
              <input
                type="text"
                className="outline-none text-[14px] h-[38px] w-full rounded-md px-1 bg-[#F1F1F15C] text-[#1E212A] border border-[#00000021]"
                placeholder="Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            <div id="text-editor" className="px-4 py-3 ">
              <ReactQuill
                value={editorContent}
                onChange={handleEditorChange}
                className="bg-[#F1F1F15C] text-[#1E212A] rounded-2xl"
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline"],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "list",
                  "bullet",
                  "bold",
                  "italic",
                  "underline",
                ]}
              />
            </div>
            <div
              id="add-task-row"
              className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row justify-between mt-4 text-[12px] text-left px-4 w-full"
            >
              <div className="flex flex-col w-[30%]">
                <label className="font-medium text-[#00000099] pb-1">
                  Task Category<span className="text-[#00000099]">*</span>
                </label>
                <div className="flex gap-x-2">
                  <button
                    className={`px-4 py-2 w-[80px] md:w-[40%] border-[#00000030] rounded-3xl ${
                      selectedCategory === "Work" ? "bg-[#7B1984] text-white" : "bg-white"
                    }`}
                    onClick={() => handleCategoryClick("Work")}
                  >
                    Work
                  </button>
                  <button
                    className={`px-4 py-2 w-[80px] md:w-[40%] border-[#00000030] rounded-3xl ${
                      selectedCategory === "Personal" ? "bg-[#7B1984] text-white" : "bg-white"
                    }`}
                    onClick={() => handleCategoryClick("Personal")}
                  >
                    Personal
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-[35%] md:w-[30%]">
                <label className="font-medium text-[#00000099] pb-1">
                  Due On<span className="text-[#00000099]">*</span>
                </label>
                <input
                  type="date"
                  value={dueDate || ""}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="outline-none text-[14px] h-[38px] w-full rounded-md px-1 bg-[#F1F1F15C] text-[#1E212A] border border-[#00000021]"
                />
              </div>
              <div className="flex flex-col w-[30%]">
                <label className="font-medium text-[#00000099] pb-1">
                  Task Status<span className="text-[#00000099]">*</span>
                </label>
                <CustomSelect
                  options={["TO-DO", "IN-PROGRESS", "COMPLETED"]}
                  onSelect={setTaskStatus}
                  placeholder={"Select Status"}
                  styles={"bg-[#F1F1F15C] text-[#0000007A] rounded-md"}
                  defaultOpt={defaultOpt}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col text-left mx-4 mt-3 text-[12px]">
                <label className="font-medium text-[#00000099] pb-1">
                  Attachment
                </label>
                <div className="bg-[#F1F1F15C] border rounded-lg border-[#00000021] h-[42px] flex items-center justify-center w-full">
                  Drop your files here or&nbsp;
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        console.log("File selected:", file.name);
                      }
                    }}
                  />
                  <label
                    htmlFor="file-upload"
                    className="text-blue-500 underline cursor-pointer"
                  >
                    Update
                  </label>
                </div>
              </div>
            </div>
          </div>
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

const Modal = ({
  header,
  isVisible,
  onClose,
  children,
  actionButtonText,
  onAction,
}: ModalProps & { actionButtonText: string; onAction: () => void }) => {
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
      <div className="bg-white rounded-t-3xl -bottom-[10%] md:rounded-xl shadow-lg relative w-full h-[80%]  md:w-[70%] md:h-[85%]">
        <div className="sticky top-0 px-4 py-2 w-full justify-between flex items-center border-b">
          <span className="font-medium text-[24px]">{header}</span>
          <button onClick={onClose} className="rounded-full bg-white">
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
        <div className="py-2 flex-grow overflow-hidden h-[80%]">{children}</div>
        <div className="absolute bottom-0 px-4 py-2 w-full flex justify-end border-t bg-white rounded-lg">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-200 rounded-3xl"
          >
            Cancel
          </button>
          <button
            onClick={onAction}
            className="px-4 py-2 bg-[#7B1984] text-white rounded-3xl"
          >
            {actionButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};
