import task from "../assets/task.svg";
import google from "../assets/google.svg";
import elip1 from "../assets/ellip_1.svg";
import screen from "../assets/screen.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { updateUser,updateSignin } from "../store/Reducers/main";
import { useMediaQuery } from "@mui/material";
import circles from "../assets/mobileCircles.png"

function Login() {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);
  const dispatch = useDispatch();
  const myData = useSelector((state: RootState) => state.main.user) as {
    email?: string;
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('access_token') || ''
  //   const userData = localStorage.getItem('user_data') || ''
  //   if(userData) {
  //     dispatch(updateUser(JSON.parse(userData)))
  //   }
  //   if(token) {
  //     dispatch(updateSignin(true))
  //     setSignedIn(true)
  //     navigate('/tasks')
  //   } else {
  //     setSignedIn(false)
  //   }
  // }, []);

  function handleSignin() {
    signInWithGoogle()
      .then((userData: any) => {
        dispatch(updateUser(userData));
        console.log(userData)
        localStorage.setItem('access_token', userData.accessToken)
        localStorage.setItem('user_data',JSON.stringify(userData))
        setSignedIn(true)
        dispatch(updateSignin(true));
        navigate('/tasks')
      })
      .catch((error: any) => {
        console.error("Error signing in with Google: ", error);
      });
  }

  const isMobile = useMediaQuery("(max-width:800px)");

  return (
        <div className="h-[100vh] w-[100vw] bg-[#FFF9F9] relative flex overflow-hidden">
          <div className="w-full md:w-[40%] flex justify-center items-center">
            <div className="h-[180px] w-full md:w-[360px] flex flex-col items-center md:text-left gap-y-3">
              <div className="flex items-center w-full justify-center md:justify-normal">
                <img src={task} />
                <span className="text-[#781984] font-semibold text-[24px]">
                  TaskBuddy
                </span>
              </div>
              <div className="w-full flex justify-center md:block">
                <p className="text-[12px] w-[80%] md:w-[300px]">
                  Streamline your workflow and track progress effortlessly with
                  our all-in-one task management app.
                </p>
              </div>
              <div className="mt-4 w-[80%] md:w-full">
                <div
                  className="bg-[#292929] text-white font-bold h-[48px] rounded-2xl justify-center items-center flex gap-x-2 cursor-pointer"
                  onClick={handleSignin}
                >
                  <img src={google} />
                  Continue with Google
                </div>
              </div>
            </div>
          </div>
          {!isMobile && <div className="w-[60%] h-[100%] relative">
            <div className="flex ">
              <img
                src={elip1}
                className="w-[100%] h-[100%] absolute top-[5%]"
              />
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
             {!isMobile && <div className=" absolute top-[15%] h-[75%] w-[100%] right-0 justify-end flex">
                <img src={screen} className="z-10 rounded-xl w-[100%]" />
              </div>}
            </div>
          </div>}


          {
            isMobile && <div className="absolute bottom-12 left-[15%] h-[25%] w-[70%]">

              <img src={circles}/>
              </div>
          }
           {
            isMobile && <div className="absolute -top-28 -right-28 h-[25%] w-[70%]">

              <img src={circles}/>
              </div>
          }
           {
            isMobile && <div className="absolute top-12 -left-48  h-[25%] w-[70%]">

              <img src={circles}/>
              </div>
          }
        </div>
  );
}

export default Login;
