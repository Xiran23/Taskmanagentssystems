import React from 'react'
import {Home , TaskList,TaskDetails} from "../pages"
import {Route ,Routes} from "react-router-dom"
export const AllRoutes = () => {
  return (
    // <div>AllRoutes</div>



    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/tasklist' element={<TaskList/>}></Route>
        <Route path='tasklist/tasks/:id' element={<TaskDetails/>}></Route>


    </Routes>
  )
}
