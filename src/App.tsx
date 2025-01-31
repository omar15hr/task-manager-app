import { useState } from "react";
import { TasksList } from "./components/TasksList";
import { Sidebar } from "./components/Sidebar";
import { Board } from "./interfaces/types";

function App() {

  const [boardSelected, setBoardSelected] = useState<Board | null>(null);

  return (
    <div className="app">
      <Sidebar setBoardSelected={setBoardSelected} />
      <TasksList boardSelected={boardSelected} />
    </div>
  );
}

export default App;
