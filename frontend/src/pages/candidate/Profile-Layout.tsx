import { Outlet } from "react-router-dom";

export default function ProfileLayout(){
    return(
        <>
        <div className="flex">
        <aside className="w-[350px] bg-gray-50 min-h-screen border-r pl-20">
          <ul className="space-y-2 p-4">
            <li>Overview</li>
            <li>Personal Info</li>
            <li>Documents</li>
            <li>My Applications</li>
            <li>Skills & Experience</li>
            <li>Favorites</li>
            <li>Alerts</li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
        </>
    )
}