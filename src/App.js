import { Outlet } from "react-router-dom";
import InputTextarea from "./ui/InputTextarea/InputTextarea";
import "./global.css";

function App() {
  return (
    <>
      <Outlet />
      <InputTextarea />
    </>
  );
}

export default App;
