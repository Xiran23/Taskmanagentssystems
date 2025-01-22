import axios from 'axios';

const fetchTask = async(page?:number)=>{
    const response = await axios.get('http://localhost:3000/posts' ,  {
        params: {
          _sort: '-id',
          ...(page && { _page: page, _per_page: 5 }),
        }
    }) 
    
    console.log(response.data)
    return response.data;

}


const addTask = async(task: { title: string; description: string; date: string })=>{

    const response = await axios.post("http://localhost:3000/posts", task, {
        headers: {
          "Content-Type": "application/json", // Specify JSON content
        }})

        return response.data;

}

export {fetchTask,addTask};