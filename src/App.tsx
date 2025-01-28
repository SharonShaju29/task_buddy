import "./App.css";
import task from "./assets/task.svg";
import google from "./assets/google.svg";
import elip1 from "./assets/ellip_1.svg";
import screen from "./assets/screen.svg"
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [signedIn,setSignedIn] = useState(true)

  return (
    <>
    { signedIn ?
    <div className="h-[100vh] w-[100vw] bg-[#FFF9F9] flex overflow-hidden">
      <div className="w-[40%] flex justify-center items-center">
        <div className="h-[180px] w-[360px] flex flex-col text-left gap-y-3">
          <div className="flex items-center w-full">
            <img src={task} />
            <span className="text-[#781984] font-semibold text-[24px]">
              TaskBuddy
            </span>
          </div>
          <div className="">
            <p className="text-[12px] w-[300px]">
              Streamline your workflow and track progress effortlessly with our
              all-in-one task management app.
            </p>
          </div>
          <div className="mt-4">
            <div className="bg-[#292929] text-white font-bold h-[48px] rounded-xl justify-center items-center flex gap-x-2 cursor-pointer">
              <img src={google} />
              Continue with Google
            </div>
          </div>
        </div>
      </div>
      <div className="w-[60%] h-[100%] relative">
        <div className="flex ">
          <img src={elip1} className="w-[100%] h-[100%] absolute top-[5%]" />
          <img
            src={elip1}
            className="w-[90%] h-[90%] absolute top-[10%] right-[5%]"
            alt="Ellipse 1"
          />
          <img
            src={elip1}
            className="w-[75%] h-[75%] absolute top-[15%] right-[10%]"
            alt="Ellipse 1"
          />
          <div className=" absolute top-[15%] h-[75%] w-[100%] right-0 justify-end flex">
          <img src={screen} className="z-10 rounded-xl w-[100%]"/>
          </div>
        </div>
      </div>
    </div>
    : <Routes>
      <Route path="/tasks" Component={}/>
      </Routes>
    } 
    </>
  );
}

export default App;
