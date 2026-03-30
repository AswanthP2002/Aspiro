import { MdOutlineNotificationAdd, MdOutlineNotifications } from 'react-icons/md';
import { IoMdChatbubbles } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { appContext } from '../../../context/AppContext';
import { BiBriefcase, BiHomeAlt2 } from 'react-icons/bi';
import { LuUsers } from 'react-icons/lu';
import { useSelector } from 'react-redux';

const makeSideBarActive = (path: string) => {
  return window.location.href.includes(path);
};

export default function Sidebar() {
  const { openCreatePostModal } = useContext(appContext);
  // const { socket } = useContext(SocketContext)

  const unReadNotificationsCount = useSelector((state: any) => {
    return state.notification.unReadNotificationsCount;
  });
  return (
    <div className="p-3">
      <ul className="space-y-3">
        <li
          className={`rounded-lg transition-all duration-200 !p-2 text-sm cursor-pointer 
        ${makeSideBarActive('/feed') ? 'bg-white text-blue-500 shadow-sm' : 'hover:bg-white hover:text-blue-500 text-white'}`}
        >
          <Link to={'/'} className="flex items-center gap-3">
            <BiHomeAlt2 size={22} />
            <span className="font-medium tracking-wide">Home</span>
          </Link>
        </li>
        
        <li
          className={`rounded-lg transition-all duration-200 !p-2 text-sm cursor-pointer 
        ${makeSideBarActive('/chats') ? 'bg-white text-blue-500 shadow-sm' : 'hover:bg-white hover:text-blue-500 text-white'}`}
        >
          <Link to={'/chats'} className="flex items-center gap-3">
            <IoMdChatbubbles size={22} />
            <span className="font-medium tracking-wide">Messages</span>
          </Link>
        </li>
        
        <li
          className={`rounded-lg transition-all duration-200 !p-2 text-sm cursor-pointer 
        ${makeSideBarActive('/jobs') ? 'bg-white text-blue-500 shadow-sm' : 'hover:bg-white hover:text-blue-500 text-white'}`}
        >
          <Link to={'/jobs'} className="flex items-center gap-3">
            <BiBriefcase size={22} />
            <span className="font-medium tracking-wide">Jobs</span>
          </Link>
        </li>

       <li
          className={`rounded-lg transition-all duration-200 !p-2 text-sm cursor-pointer 
        ${makeSideBarActive('/users') ? 'bg-white text-blue-500 shadow-sm' : 'hover:bg-white hover:text-blue-500 text-white'}`}
        >
          <Link to={'/users'} className="flex items-center gap-3">
            <LuUsers size={22} />
            <span className="font-medium tracking-wide">Users</span>
          </Link>
        </li>
        
        <li
          className={`rounded-lg transition-all relative duration-200 !p-2 text-sm cursor-pointer 
        ${makeSideBarActive('/notifications') ? 'bg-white text-blue-500 shadow-sm' : 'hover:bg-white hover:text-blue-500 text-white'}`}
        >
          <Link to={'/notifications'} className="flex items-center gap-3">
            {unReadNotificationsCount > 0
              ? <MdOutlineNotificationAdd size={22} />
              : <MdOutlineNotifications size={22} />
            }
            <span className="font-medium tracking-wide">Notifications ({unReadNotificationsCount})</span>
          </Link>
          {unReadNotificationsCount > 0 && (
            <span className="absolute text-[12px] bg-red-500 font-medium rounded-full w-[22px] h-[22px] flex items-center justify-center -top-2 left-5">{unReadNotificationsCount}</span>
          )}
        </li>
        {/* <li
          className={`relative nav-link hover:bg-blue-500 hover:shadow-lg rounded-md ${makeSideBarActive('/notifications') ? 'bg-blue-500' : ''} transition-all ease-in-out !p-2 text-sm text-white font-semibold cursor-pointer relative"`}
        >
          {unReadNotificationsCount > 0 && (
            <span className="absolute right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
                {unReadNotificationsCount}
              </span>
            </span>
          )}
          <Link to={'/notifications'} className="flex items-center gap-2">
            {unReadNotificationsCount > 0 ? (
              <MdOutlineNotificationAdd size={25} />
            ) : (
              <MdOutlineNotifications size={25} />
            )}{' '}
            <span className="font-normal">Notifications</span>
          </Link>
        </li> */}
        
      </ul>
    </div>
  );
}
