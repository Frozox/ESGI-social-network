import { ChatIcon, CogIcon, HomeIcon, TemplateIcon, LogoutIcon } from "@heroicons/react/outline";
import { NavLink, Path, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { whenPatternMatches } from "../utils/helpers/index";
import { useStoreContext } from "../utils/context/StoreContext";
import { Avatar } from "./Avatar";
import { authLogoutRequest } from "../utils/context/actions/auth";
interface navBarProps {
  children: React.ReactNode,
  location: Path
}
const SideBar = ({ children, location }: navBarProps) => {
  const [display, setDisplay] = useState(true)
  const { dispatch, state: { myUser: { firstName, lastName } } } = useStoreContext()
  const navigate = useNavigate()

  useEffect(() => {
    whenPatternMatches(location.pathname, [
      [/^\/login\/?$/, () => setDisplay(false)],
      [/^\/register\/?$/, () => setDisplay(false)],
    ])

    return () => {
      setDisplay(true)
    }
  }, [location.pathname])

  const NavItem = ({ link, name, icon }: any) => {
    const active = location.pathname === link;
    return (
      <NavLink to={link} className={`${active ? 'bg-gray-100 text-gray-900' : ''} flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out`} data-mdb-ripple="true" data-mdb-ripple-color="dark">
        <span className="h-5 w-5 mr-1" >{icon}</span>
        <span>{name}</span>
      </NavLink>
    )
  }
  // const handleLogout = () => {
  //   localStorage.removeItem('token')
  //   authLogoutRequest(dispatch, navigate)
  // }
  return (
    <>
      <div className="flex">
        {!display ? ('') : (
          <aside className="w-44 left-0 top-0 h-screen bg-white-700 fixed ">
            <div className='max-w-[250px] border-r relative flex flex-col py-10 min-h-screen group' >
              <div className='grow'>
                <div className='my-2 mb-6' >
                  <div className='flex px-4 py-1 cursor-pointer items-center' >
                    <Avatar initial={firstName + ' ' + lastName} displayName />
                  </div>
                </div>
                <div className='my-2 ' >
                  <div className='flex px-4 py-1 cursor-pointer' >
                    <HomeIcon className="h-5 w-5 text-black-500" />
                    <p className='mb-2 ml-2 font-bold text-black-500' >Home</p>
                  </div>
                  <ul className="relative">
                    <li className="relative">
                      <NavItem link="/chat" icon={<ChatIcon />} name="Chat" />
                    </li>
                  </ul>
                </div>
                <div className='my-2' >
                  <div className='flex px-4 py-1 ' >
                    <TemplateIcon className="h-5 w-5 text-black-500" />
                    <p className='mb-2 ml-2 font-bold text-black-500' >Dashboard</p>
                  </div>
                  <ul className="relative">
                    <li className="relative">
                      <NavItem link="/settings" icon={<CogIcon />} name="Settings" />
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div className='my-2' >
                  <ul className="relative">
                    <li className="relative">
                      <NavItem link="/logout" icon={<LogoutIcon />} name="Logout" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        )}
        <main className={`${display ? 'ml-44' : ''} flex-1`}>
          {children}
        </main>
      </div>
    </>
  )
}

export default SideBar;