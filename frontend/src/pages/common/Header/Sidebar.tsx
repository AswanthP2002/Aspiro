import {MdHomeFilled} from 'react-icons/md'
import {AiFillMessage} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import defaultUserProfile from '/default-img-instagram.png'
import {FaBriefcase, FaUsers} from 'react-icons/fa'
import {IoIosNotifications, IoIosAddCircle} from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { appContext } from '../../../context/AppContext'
import { SocketContext } from '../../../context/SocketContext'
import { Notify } from 'notiflix'

const makeSideBarActive = (path: string) => {
    return window.location.href.includes(path)
}

export default function Sidebar(){
    const [notificationsCount, setNotificationsCount] = useState(0) // You can fetch initial count via API
    const {openCreatePostModal} = useContext(appContext)
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        if (socket) {
            socket.on('new_notification', (notification) => {
                console.log('New notification received:', notification);
                setNotificationsCount(prev => prev + 1);
                Notify.info(`🔔 ${notification.title}: ${notification.description}`);
            });
        }
        return () => {
            socket?.off('new_notification');
        }
    }, [socket]);

    return(
        <div className='!pt-10 !px-10 flex flex-col'>
            <ul className='flex flex-col gap-4'>
                <li className={`nav-link hover:bg-white transition-all ease-in-out  !p-2 text-sm text-white font-semibold active hover:text-blue-500 cursor-pointer`}>
                    <Link to={'/'} className='flex items-center gap-2'><MdHomeFilled size={25} /> <span className='font-normal'>Home</span></Link>
                </li>
                <li className="nav-link hover:bg-white transition-all ease-in-out !p-2 text-sm text-white font-semibold hover:text-blue-500 cursor-pointer">
                    <Link to={'/'} className='flex items-center gap-2'><AiFillMessage size={23} /> <span className='font-normal'>Messages</span></Link>
                </li>
                <li className={`nav-link hover:bg-white ${makeSideBarActive('/jobs') ? 'bg-white !text-blue-500': ''} transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer hover:text-blue-500`}>
                    <Link to={'/jobs'} className='flex items-center gap-2'><FaBriefcase size={21} /> <span className='font-normal'>Jobs</span></Link>
                </li>
                <li className="nav-link hover:bg-white transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer hover:text-blue-500">
                    <Link to={'/'} className='flex items-center gap-2'><FaUsers size={25} /> <span className='font-normal'>Peoples</span></Link>
                </li>
                <li className="nav-link hover:bg-white transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer hover:text-blue-500 relative">
                    {notificationsCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-5 w-5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">{notificationsCount}</span>
                        </span>
                    )}
                    <Link to={'/notifications'} className='flex items-center gap-2'><IoIosNotifications size={25} /> <span className='font-normal'>Notifications</span></Link>
                </li>
                <li onClick={openCreatePostModal} className="nav-link hover:bg-white transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer hover:text-blue-500">
                    <div className='flex items-center gap-2'><IoIosAddCircle size={25} /> <span className='font-normal'>Create a post</span></div>
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