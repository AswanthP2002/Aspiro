// layouts/AdminLayout.tsx

import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar/Sidebar';
import TopBar from '../../components/admin/TopBar';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../../context/AppContext';

// Trying to way to handle sidebar and outlet components
//@first : col wise approach --fixed + display
//@second : margin wise approach --absolute + margin

export default function AdminLayout(){
  const {adminSidebarOpen, windowSize, setAdminSidebarOpen} = useContext(appContext)
  const [marginStart, setMarginStart] = useState('0')

  useEffect(() => {

      if(adminSidebarOpen && windowSize.width < 768){
        setMarginStart('0')
      }else if(windowSize.width < 768){
        setMarginStart('0')
      }else{
        setMarginStart('64')
      }
  }, [adminSidebarOpen, windowSize])
  
  return (
    <>
      <div className="w-full min-h-screen grid grid-cols-12">
      {
        adminSidebarOpen || windowSize.width > 768 ? (
          <div className={`col-span-2 ${windowSize.width < 768 && adminSidebarOpen ? '!bg-black !w-full' : ''} h-screen border border-gray-200 fixed top-0 left-0`}>
            <Sidebar />
          </div>
        )
        : null
      }
      <div className={`col-span-12 ms-${marginStart} bg-gray-100`}>
        <TopBar />
        <Outlet />
      </div>
      {/* <Sidebar />
      <div className="w-full ms-0 md:ms-64 bg-gray-100">
        <TopBar />
        <Outlet />
      </div> */}
    </div>
    {/* // <div className="flex h-screen">
    //   <Sidebar />
    //   <div className="flex-1 p-6 bg-[#fef7f2] overflow-y-auto">
    //     <Outlet /> 
    //   </div>
    // </div> */}
    </>
  );
};

