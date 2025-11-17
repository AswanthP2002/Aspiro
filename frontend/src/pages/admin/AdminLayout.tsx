// layouts/AdminLayout.tsx

import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar/Sidebar';
import TopBar from '../../components/admin/TopBar';
import { useContext } from 'react';
import { appContext } from '../../context/AppContext';

// Trying to way to handle sidebar and outlet components
//@first : col wise approach --fixed + display
//@second : margin wise approach --absolute + margin

export default function AdminLayout(){
  const {adminSidebarOpen, windowSize, setAdminSidebarOpen} = useContext(appContext)
  
  return (
    <>
      <div className="w-full min-h-screen bg-gray-100">
      {
        // On medium screens and up, sidebar is always visible.
        // On smaller screens, it's controlled by adminSidebarOpen.
        (adminSidebarOpen || windowSize.width >= 768) && (
          <div className={`
            w-64 h-screen border-r border-gray-200 fixed top-0 left-0 bg-white
            ${windowSize.width < 768 ? 'z-50' : ''}
            ${adminSidebarOpen ? 'block' : 'hidden'} md:block
          `}>
            <Sidebar />
          </div>
        )
      }
      {/* Overlay for mobile when sidebar is open */}
      {adminSidebarOpen && windowSize.width < 768 && (
        <div onClick={() => setAdminSidebarOpen(false)} className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}
      <div className="md:ml-64">
        <TopBar />
        <Outlet />
      </div>
      {/* <Sidebar />
      <div className="w-full ms-0 md:ms-64 bg-gray-100">
        <TopBar />
        <Outlet />
      </div> */}
    </div>
    </>
  );
};
