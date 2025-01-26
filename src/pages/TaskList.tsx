
import { TaskCard } from '../components/TaskCard';
import { fetchTask } from '../api/api';
import { useQuery, } from '@tanstack/react-query';




export const TaskList: React.FC = () => {


  interface Task {
    id: string
    title: string,
    description: string,
    date: string

  }



  const { data: postData, } = useQuery<Task[]>({ //use of arrya ty
    queryKey: ["posts"],
    queryFn: () => fetchTask()
  })



  // console.log(postData)

  return (
    <main className=''>
      <div className='flex flex-wrap justify-center gap-4 mt-10'>
        {postData?.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
    </main>







  )
}
