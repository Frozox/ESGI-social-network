import { ChatIcon, CogIcon, HomeIcon, TemplateIcon } from "@heroicons/react/outline";
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";
import { whenPatternMatches } from "../utils/helpers/index";

const SideBar = () => {
  const [display, setDisplay] = useState(true)

  useEffect(() => {
    whenPatternMatches(location.pathname, [
      [/^\/login\/?$/, () => setDisplay(false)],
      [/^\/register\/?$/, () => setDisplay(false)],
    ])

    return () => {
        setDisplay(true)
    }
}, [location.pathname])

  return (
    <>
    {!display ? ('') : (
    <aside className="w-44 left-0 top-0 h-screen bg-white-700">
      <div className='max-w-[250px] border-r relative flex flex-col py-10 min-h-screen group' >
        <div className='grow'>
          <div className='my-2 ' >
            <div className='flex px-4 py-1 cursor-pointer' >
              <HomeIcon className="h-5 w-5 text-black-500" />
              <p className='mb-2 ml-2 font-bold text-black-500' >Home</p>
            </div>
            <ul className="relative">
              <li className="relative">
                <NavLink to="/chat" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                    <ChatIcon className="h-5 w-5 text-gray-500 mr-1" ></ChatIcon>
                    <span>Chat</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className='my-2' >
            <div className='flex px-4 py-1 ' >
              <TemplateIcon className="h-5 w-5 text-black-500" />
              <p className='mb-2 ml-2 font-bold text-black-500' >Dashboard</p>
            </div>
            <ul className="relative">
              <li className="relative">
                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                  <CogIcon className="h-5 w-5 text-gray-500 mr-1" />
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
    )}
    </>
  );
}

export default SideBar;