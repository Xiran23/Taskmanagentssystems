import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import Logo from "../assets/images/logo.png"
import { Search } from './Search';

export const Header = () => {
  const [hidden, setHidden] = useState<boolean>(false)

  const activeClass: string = "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
  const nonActiveCLass: string = "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
  return (
    <header>


      {/* <nav className=" bg-purple3 border-gray-200 rounded-lg dark:bg-gray-900 drop-shadow-2xl z-50 top-0   fixed inset-x-0"> */}
      <nav className="w-full bg-purple3 border-gray-200 rounded-lg dark:bg-gray-900 drop-shadow-2xl z-50 top-0 fixed">






        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-8" alt="TaskLogo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">TASK_ASSI</span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div>
              <Search ></Search>
            </div>



            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" end>Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</NavLink>
                </li>
                <li>
                  <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</NavLink>
                </li>
                <li>
                  <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</NavLink>
                </li>
              </ul>
            </div>
            <button onClick={() => setHidden(!hidden)} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className={` ${hidden ? "hidden" : " "} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-purple3 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? activeClass : nonActiveCLass} end>Home</NavLink>
              </li>

              <li>
                <NavLink to="/tasklist" className={({ isActive }) => isActive ? activeClass : nonActiveCLass} >TaskList</NavLink>
              </li>
              <li>
              </li>

            </ul>
          </div>





        </div>
      </nav>



    </header>
  )
}