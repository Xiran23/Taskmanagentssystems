import axios from 'axios';
const BASE_URL = 'http://localhost:3000/posts'

const fetchTask = async(page?:number)=>{
    const response = await axios.get(`${BASE_URL}`,  {
        params: {
          _sort: '-id',
          ...(page && { _page: page, _per_page: 5 }),
        }
    }) 
    
    // console.log(response.data)
    return response.data;

}


const addTask = async(task: { title: string; description: string; date: string })=>{

    const response = await axios.post(`${BASE_URL}`, task, {
        headers: {
          "Content-Type": "application/json", // Specify JSON content
        }}) 

        return response.data;


      
}

const fetchByid = async(id:string)=>{
  const response = await axios.get(`${BASE_URL}/${id}`)
  // const response = await axios.get(`${BASE_URL}`,  ) 
  return response.data
}

const deleteByid = async(id) =>{
  const response = await axios.delete(`${BASE_URL}/${id}`)
  return response.data
}

export {fetchTask,addTask,fetchByid,deleteByid};