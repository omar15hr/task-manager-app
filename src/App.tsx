import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import TaskBoard from "./components/taskBoard/TaskBoard";

export default function App() {
  const [show, setShow] = useState(false);

  const toggleSidebar = () => {
    setShow(!show);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={show} toggleSidebar={toggleSidebar} />
      <TaskBoard isSidebarOpen={show} />
    </div>
  );
}