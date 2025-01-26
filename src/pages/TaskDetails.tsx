import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { fetchByid, deleteByid } from "../api/api"

import { useMutation, useQuery } from "@tanstack/react-query"
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useQueryClient } from '@tanstack/react-query';
// import {  toast } from 'react-toastify';

interface TaskData {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}
export const TaskDetails: React.FC = () => {


  // const notify = () =>  toast('🦄 Wow so easy!', {
  //   position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: false,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",

  //   });

  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient()


  // const {data:postDataDetails,} = useQuery({ //use of arrya ty
  //   queryKey : ["task",id],
  //   queryFn:()=>fetchByid(id!),
  //   enabled: !!id
  // })
  const { data: postDataDetails, error, isLoading } = useQuery<TaskData>({
    queryKey: ["task", id],
    queryFn: () => fetchByid(id!),
    enabled: !!id,
    onError: (err) => {
      console.error("Error fetching data:", err);
    },
    onSuccess: (data) => {
      console.log("Data fetched successfully:", data);
    },
  });

  console.log(`1`, postDataDetails)

  const { mutate } = useMutation({
    mutationFn: deleteByid,
    onSuccess: () => {
      queryClient.invalidateQueries({

        queryKey: ["task"],

      })
    }

  })



  const navigate = useNavigate();
  const HandleDelete = () => {
    console.log(id)

    if (id) {

      mutate(id)

      navigate('/tasklist');
    }







  }


  return (
    <div>
      <h1>Task Details {id}</h1>

      {postDataDetails && (
        <div>
          <h2>{postDataDetails?.title}</h2>
          <p>{postDataDetails?.description}</p>
          <p>Due Date: {postDataDetails.date}</p>

          <button onClick={HandleDelete}><MdDelete /></button>

          <button><FaRegEdit /></button>
          {/* <button onClick={HandleDelete}><MdDelete /></button> */}
        </div>
      )}
    </div>
  )
}
