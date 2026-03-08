import {MdHomeFilled, MdOutlineNotificationAdd, MdOutlineNotifications} from 'react-icons/md'
import {AiFillMessage} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import defaultUserProfile from '/default-img-instagram.png'
import {FaBriefcase, FaUsers} from 'react-icons/fa'
import {IoIosNotifications, IoIosAddCircle} from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { appContext } from '../../../context/AppContext'
import { Notify } from 'notiflix'
import {BiHomeAlt} from 'react-icons/bi'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { PiSuitcase } from 'react-icons/pi'
import { LuUsers, LuUserPlus } from 'react-icons/lu'
import { CiBellOn, CiCirclePlus } from 'react-icons/ci'
import { GoPlusCircle } from 'react-icons/go'
import { useSelector } from 'react-redux'

const makeSideBarActive = (path: string) => {
    return window.location.href.includes(path)
}

export default function Sidebar(){
    const [notificationsCount, setNotificationsCount] = useState(0) // You can fetch initial count via API
    const {openCreatePostModal} = useContext(appContext)
    // const { socket } = useContext(SocketContext)

    const unReadNotificationsCount = useSelector((state: any) => {
        return state.notification.unReadNotificationsCount
    })
;

    return(
        <div className='p-3'>
            <ul className='space-y-3'>
                <li className={`rounded hover:bg-blue-500 hover:shadow-lg ${makeSideBarActive('/feed') ? 'bg-blue-500 shadow-lg' : ''}  nav-link transition-all ease-in-out  !p-2 text-sm text-white font-semibold active cursor-pointer`}>
                    <Link to={'/'} className='flex items-center gap-2'><BiHomeAlt size={25} /> <span className='font-normal'>Home</span></Link>
                </li>
                <li className={`rounded hover:bg-blue-500 hover:shadow-lg nav-link ${makeSideBarActive('/chats') ? 'bg-blue-500 shadow-lg' : ''} transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer`}>
                    <Link to={'/chats'} className='flex items-center gap-2'><IoChatbubbleOutline size={23} /> <span className='font-normal'>Messages</span></Link>
                </li>
                <li className={`rounded hover:bg-blue-500 hover:shadow-lg nav-link ${makeSideBarActive('/jobs') ? 'bg-white !text-blue-500': ''} transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer`}>
                    <Link to={'/jobs'} className='flex items-center gap-2'><PiSuitcase size={21} /> <span className='font-normal'>Jobs</span></Link>
                </li>
                <li className={`rounded hover:bg-blue-500 hover:shadow-lg nav-link ${makeSideBarActive('/users') ? 'bg-blue-500 shadow-lg' : ''} transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer`}>
                    <Link to={'/users'} className='flex items-center gap-2'><LuUsers size={25} /> <span className='font-normal'>Peoples</span></Link>
                </li>
                <li className={`relative nav-link hover:bg-blue-500 hover:shadow-lg rounded-md ${makeSideBarActive('/notifications') ? 'bg-blue-500' : ''} transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer relative"`}>
                    {unReadNotificationsCount > 0 && (
                        <span className="absolute right-1 flex h-5 w-5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">{unReadNotificationsCount}</span>
                        </span>
                    )}
                    <Link to={'/notifications'} className='flex items-center gap-2'>{unReadNotificationsCount > 0 ? <MdOutlineNotificationAdd size={25} /> : <MdOutlineNotifications size={25} />} <span className='font-normal'>Notifications</span></Link>
                </li>
                <li onClick={openCreatePostModal} className="rounded hover:bg-blue-500 hover:shadow-lg nav-link transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer">
                    <div className='flex items-center gap-2'><CiCirclePlus size={25} /> <span className='font-normal'>Create a post</span></div>
                </li>
                {/* profile with cg profile icon */}
                {/* <li className="nav-link hover:bg-white transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer hover:text-blue-500">
                    <Link to={'#'} className='flex items-center gap-2'><CgProfile size={25} /> <span className='font-normal'>Profile</span></Link>
                </li> */}
                {/* profile with profile photo  */}
                {/* <li className="nav-link hover:bg-white transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer hover:text-blue-500">
                    <Link to={'#'} className='flex items-center gap-2'><img src={defaultUserProfile} className='w-[30px]' alt="" /> <span className='font-normal'>Profile</span></Link>
                </li> */}
            </ul>
        </div>
    )
}