import React from 'react'
import {Home , TaskList} from "../pages"
import {Route ,Routes} from "react-router-dom"
export const AllRoutes = () => {
  return (
    // <div>AllRoutes</div>



    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/tasklist' element={<TaskList/>}></Route>


    </Routes>
  )
}
