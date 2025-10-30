import {MdHomeFilled} from 'react-icons/md'
import {AiFillMessage} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import defaultUserProfile from '/default-img-instagram.png'
import {FaBriefcase, FaUsers} from 'react-icons/fa'
import {IoIosNotifications, IoIosAddCircle} from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContext'

export default function Sidebar(){
    const [notificationsCount, setNotificationsCount] = useState(0)
    const {openCreatePostModal} = useContext(appContext)

    return(
        <div className='!pt-10 !px-10 flex flex-col'>
            <ul className='flex flex-col gap-4'>
                <li className="nav-link hover:bg-white transition-all ease-in-out  !p-2 text-sm text-white font-semibold active hover:text-blue-500 cursor-pointer">
                    <Link to={'/'} className='flex items-center gap-2'><MdHomeFilled size={25} /> <span className='font-normal'>Home</span></Link>
                </li>
                <li className="nav-link hover:bg-white transition-all ease-in-out !p-2 text-sm text-white font-semibold hover:text-blue-500 cursor-pointer">
                    <Link to={'/'} className='flex items-center gap-2'><AiFillMessage size={23} /> <span className='font-normal'>Messages</span></Link>
                </li>
                <li className="nav-link hover:bg-white transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer hover:text-blue-500">
                    <Link to={'/'} className='flex items-center gap-2'><FaBriefcase size={21} /> <span className='font-normal'>Jobs</span></Link>
                </li>
                <li className="nav-link hover:bg-white transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer hover:text-blue-500">
                    <Link to={'/'} className='flex items-center gap-2'><FaUsers size={25} /> <span className='font-normal'>Peoples</span></Link>
                </li>
                <li className="nav-link hover:bg-white transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer hover:text-blue-500 relative">
                    <span className="absolute bg-red-500 !p-1 rounded-full"></span>
                    <Link to={'/'} className='flex items-center gap-2'><IoIosNotifications size={25} /> <span className='font-normal'>Notifications</span></Link>
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