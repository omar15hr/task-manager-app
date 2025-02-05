import { Board } from "./components/board/Board";
import { Sidebar } from "./components/sidebar/Sidebar";

export default function App() {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <Board />
    </div>
  );
}






