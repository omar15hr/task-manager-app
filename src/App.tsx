
import { TasksList } from "./components/TasksList";
import { Sidebar } from "./components/ui/Sidebar";



function App() {

  return (
    <div className="app">
      <Sidebar />
      <TasksList />        
    </div>
  )
}

export default App
