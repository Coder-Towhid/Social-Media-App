import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Timeline from "./pages/timeline/Timeline";

function App() {

  const {user} =  useContext(AuthContext)
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={ user? <Home /> : <Register/>} />
        <Route path="/profile/:username" element={<Timeline />} />
        <Route path="/login" element={ user ? <Navigate to="/" />  : <Login />} />
        <Route path="/register" element={ <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
