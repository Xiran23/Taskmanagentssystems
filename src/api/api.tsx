import axios from 'axios';
const BASE_URL = 'http://localhost:3000/posts'

// get the task
const fetchTask = async (page?: number) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      _sort: '-id',
      ...(page && { _page: page, _per_page: 5 }),
    }
  })

  // console.log(response.data)
  return response.data;

}

// add task form form 
const addTask = async (task: { id: string; title: string; description: string; date: string }) => {

  const response = await axios.post(`${BASE_URL}`, task, {
    headers: {
      "Content-Type": "application/json", // Specify JSON content
    }
  })

  return response.data;



}

// fetch by id value 


const fetchByid = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};

//delete by id 
const deleteByid = async (id: string) => {

  const response = await axios.delete(`${BASE_URL}/${id}`)
  console.log(`Delete response:`, response);
  return response.data
}


// update by id



// const updateTask = async (id: string, task: { title: string; description: string; date: string }) => {
//   const response = await axios.put(`${BASE_URL}/${id}`, task, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return response.data;
// };


const updateTask = async ({ id, task }: { id: string; task: { title: string; description: string; date: string } }) => {
  const response = await axios.put(`${BASE_URL}/${id}`, task, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};




export { fetchTask, addTask, fetchByid, deleteByid, updateTask };