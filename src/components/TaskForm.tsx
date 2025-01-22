
import { useRef, useEffect, useState } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {addTask} from '../api/api';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import {fetchTask} from '../api/api';
import { useQuery,  } from '@tanstack/react-query'



interface Task{
  title:string,
  description:string,
  date:string
  
} 


export const TaskForm: React.FC = () => {


  const {data:postData,} = useQuery<Task[]>({ //use of arrya ty
    queryKey : ["posts"],
    queryFn:()=>fetchTask()
  })



  const queryClient = useQueryClient()

    const [formData ,setData] = useState<Task>({
        title:'',
        description:'',
        date:''

    })
    

    //form handelchange
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const {id ,value } = e.target;
            setData({ ...formData , [id]:value})
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

              const {mutate} = useMutation({
                  mutationFn:addTask,
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                    
                      queryKey: ["posts"],
                     
                    })}
              

              })

//onsubmit events

    const handleSubmit = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        e.preventDefault()  
    // console.log(formData)
    const title  = formData.title;
    const description = formData.description
    const date = formData.date

    mutate({id: postData?.length+1 , title,description,date});
    e.target.reset();
   
    


    }



  return (
    <div> 


<form className="max-w-sm mx-auto flex flex-col align-center gap-y-1 " onSubmit={handleSubmit} >


                    {/* <span>{titleError }</span> */}
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:">Title</label>
                    <input 
                    onChange={handleChange}
                    value={formData.title}
                    type="text"
                    id="title" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"/>


                    <label htmlFor="task-description" className="block mb-2 text-sm font-medium text-gray-900 dark:">Descriptions</label>
                    <textarea 
                    id="description"
                    value={formData.description}
                    onChange={handleChange}

                    className=" h-64 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2" placeholder="..."></textarea>


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
                            {/* <input
                                type="text"
                                id="date"
                                value={formData.date}
                                onChange={handleChange}
                                ref={dateRangePickerRef}
                                // name="date"
                                placeholder="Select date range"
                             className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                                             */}


                    <button type="submit" className=" m text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

</form>


    </div>
  )
}
