import "./App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useEffect } from "react";

function App() {
  const signedIn = useSelector((state: RootState) => state.main.signedIn)
  const navigate = useNavigate()

  // useEffect(()=>{
  //   if(signedIn)
  //  navigate('/tasks')
  // },[signedIn])

  return (
    <Routes>
      {/* <Route path="/" element={signedIn ? <Navigate to="tasks" /> : <Navigate to="login" />} /> */}
      <Route path="login" element={<Login />} />
      {/* <Route path="/tasks" element={signedIn ? <Tasks /> : <Navigate to="/login" />} /> */}
      <Route path="/tasks" element={<Tasks />} />

    </Routes>
  );
}

export default App;
