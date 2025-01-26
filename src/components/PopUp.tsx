import { useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchByid, deleteByid, updateTask } from '../api/api';
import { useQueryClient } from "@tanstack/react-query";
// import { useQueryClient } from '@tanstack/react-query';



type props = {
    taskvalue: string;
}

interface TaskData {
    id: string;
    title: string;
    description: string;
    date: string;
}

export const PopUp: React.FC<props> = ({ taskvalue }) => {

    //set-up button
    const [isModelopen, setIsmodelOpen] = useState(false);
    const [editbutton, SetEditbutton] = useState(true)

    const toogleModel = () => { setIsmodelOpen(!isModelopen); SetEditbutton(true) }
    const ToogleSetEditbutton = () => { SetEditbutton(!editbutton) }

    const queryClient = useQueryClient();

    //fetch the data
    const { data: taskdata, error, isLoading } = useQuery<TaskData>({

        queryKey: ["task", taskvalue],
        queryFn: () => fetchByid(taskvalue),
        enabled: !!taskvalue
    })


    //update the data 
    const { mutate: updateTaskMutate } = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.refetchQueries({ queryKey: ['tasks'] });
        },
        onError: (error) => {
            console.error('Update error:', error);
        },
    });


    const [updatedTaskData, setUpdatedTaskData] = useState<TaskData>({
        id: " ",
        title: " ",
        description: "",
        date: ""
    });
    //store value at updatedtask once taskdata is loaded
    useEffect(() => {
        if (taskdata) {
            setUpdatedTaskData({
                id: taskdata.id ?? "",
                title: taskdata.title ?? "",
                description: taskdata.description ?? "",
                date: taskdata.date ?? ""
            });
        }
    }, [taskdata]);






    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUpdatedTaskData({ ...updatedTaskData!, [e.target.id]: e.target.value })


    }





    // set up delete mode on click 

    const { mutate } = useMutation({
        mutationFn: deleteByid,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task"] });
        },
        onError: (error) => {
            console.error("Delete error:", error);
        }
    });

    const navigate = useNavigate();
    const HandleDelete = () => {
        console.log(`23`, typeof (taskvalue)) //taskvalue is id here r

        if (taskvalue) {

            mutate(taskvalue)
            toogleModel()




        }
    }



    // handle upadate now 

    const handleUpdate = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        console.log(`update section`, updatedTaskData)
        const { title, description, date } = updatedTaskData;
        // updateTaskMutate({ id: taskvalue, task: updatedTaskData }); // same tasks value is id here 
        updateTaskMutate({ id: taskvalue, task: { title, description, date } });

    }



















    return (

        <div>
            <button onClick={toogleModel} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                View-Details
            </button>

            {isModelopen && (
                <>
                    <div className="fixed inset-0   flex items-center justify-center bg-black bg-opacity-50 w-screen h-screen  p-2.5 max-w-screen-lg mx-auto min-h-[90vh] mt-10" style={{ backdropFilter: 'blur(10px)' }}>
                        {/* Your content here */}
                    </div>








                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 border-4 border-white">


                        <div className="relative p-4 w-full max-w-md max-h-full">


                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Task Details
                                    </h3>
                                    <div>

                                        {/* set-up of button close */}
                                        <button type="button" onClick={HandleDelete} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white ">
                                            <MdDelete />
                                            <span className="sr-only">delete</span>
                                        </button>

                                        <button type="button" onClick={ToogleSetEditbutton} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white ">
                                            <FaRegEdit />
                                            <span className="sr-only">Edit</span>
                                        </button>

                                        <button type="button" onClick={toogleModel} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white ">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                </div>



                                {editbutton ? (<div>
                                    <form className=" p-4 md:p-5" >
                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            <div className="col-span-2">
                                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title-edit</label>





                                                <input value={updatedTaskData?.title} onChange={handleChange}
                                                    type="text" readOnly
                                                    // name="title" 
                                                    id="title"
                                                    className="pointer-events-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500  " placeholder="Type product name" />

                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="description"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>


                                                <textarea value={updatedTaskData?.description || ''}
                                                    onChange={handleChange}
                                                    readOnly

                                                    name='description'
                                                    id="description"
                                                    className=" pointer-events-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " ></textarea>
                                            </div>

                                        </div>


                                    </form>



                                </div>) : (<div> <form className=" p-4 md:p-5" onSubmit={handleUpdate}>
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title-edit</label>





                                            <input value={updatedTaskData?.title} onChange={handleChange}
                                                type="text"
                                                // name="title"
                                                id="title"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500  " placeholder="Type product name" />

                                        </div>

                                        <div className="col-span-2">
                                            <label htmlFor="description"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>


                                            <textarea value={updatedTaskData?.description || ''}
                                                onChange={handleChange}
                                                name='description'
                                                id="description"
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " ></textarea>
                                        </div>

                                    </div>

                                    <div>
                                        <button type='submit' className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Update</button>
                                    </div>

                                </form> </div>)}







                            </div>
                        </div>
                    </div >


                </>


            )
            }
        </div >

    )
}
