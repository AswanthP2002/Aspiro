// layouts/AdminLayout.tsx

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';

export default function AdminLayout(){
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-[#fef7f2] overflow-y-auto">
        <Outlet /> 
      </div>
    </div>
  );
};

