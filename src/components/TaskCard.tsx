import { Link } from "react-router-dom"
import { PopUp } from "./PopUp";
interface Task {
  id: string
  title: string;
  description: string;
  date: string;
}

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {

  // const taskvalue:string = task.id

  return (



    <div className="max-w-sm w-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify break-all   "> {task.description}</p>
        <p>{task.date}</p>

        {/* <PopUp taskvalue={task.id} /> */}

        <PopUp taskvalue={task.id} />

      </div>
    </div>

  )
}



