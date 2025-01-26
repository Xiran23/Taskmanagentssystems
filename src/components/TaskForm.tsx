
import { useRef, useEffect, useState } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { addTask } from '../api/api';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { fetchTask } from '../api/api';
import { useQuery, } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify';



interface Task {
  id: string
  title: string,
  description: string,
  date: string

}


export const TaskForm: React.FC = () => {
  const notify = () => toast("Task created");


  const { data: postData, } = useQuery<Task[]>({ //use of arrya ty
    queryKey: ["posts"],
    queryFn: () => fetchTask()
  })



  const queryClient = useQueryClient()

  const [formData, setData] = useState<Task>({
    id: "",
    title: '',
    description: '',
    date: ''

  })


  //form handelchange
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setData({ ...formData, [id]: value })
    console.log(formData)

  }

  //datereangeselector
  const dateRangePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dateRangePickerRef.current) {
      flatpickr(dateRangePickerRef.current, {
        mode: 'range', // Allows date range selection.
        dateFormat: 'Y-m-d', // Specifies the date format.
        onChange: (selectedDates, dateStr) => {
          setData((prevData) => ({ ...prevData, date: dateStr })); // Update state on selection.
        },
      });
    }
  }, []);


  //mutaions 

  const { mutate } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({

        queryKey: ["posts"],

      })
    }


  })

  //onsubmit events

  const handleSubmit = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault()
    let isvalid = true

    if (formData.title === '') {
      isvalid = false
    }

    if (formData.description === '') {
      isvalid = false
    }

    if (formData.date === '') {
      isvalid = false
    }
    // console.log(formData)
    const title = formData.title;
    const description = formData.description
    const date = formData.date


    if (isvalid) {
      console.log(isvalid)
      // let value: number = (Date.now() + 1);
      const id: string = Date.now().toString();

      // mutate({ id: parseInt(Date.now() + 1, 10), title, description, date });
      mutate({ id, title, description, date });

      notify()
      //  e.target.reset();
      setData({
        id: "",

        title: '',
        description: '',
        date: ''
      })
    } else {

      toast.warn('Fill all details', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });
    }




  }



  return (
    <div>
      <ToastContainer />

      <form className="max-w-sm mx-auto flex flex-col align-center gap-y-1 " onSubmit={handleSubmit} >


        {/* <span>{titleError }</span> */}
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:">Title</label>
        <input
          onChange={handleChange}
          value={formData.title}
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-white" />


        <label htmlFor="task-description" className="block mb-2 text-sm font-medium text-gray-900 dark:">Descriptions</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}

          className=" dark:text-white h-64 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2" placeholder="..."></textarea>


        {/* date */}




        <label htmlFor="date-range">Select Date Range:</label>




        <input
          type="text"  // Flatpickr works with text inputs.
          id="date" // Ensure this matches the key used in formData.
          value={formData.date || ''} // Prevent uncontrolled input errors.
          onChange={handleChange}
          ref={dateRangePickerRef}
          name="date" // Make this consistent with the id if needed.
          placeholder="Select date range"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />



        <button type="submit" className=" m text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

      </form>


    </div>
  )
}
