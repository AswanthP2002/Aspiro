import { Link, Outlet } from "react-router-dom";

export default function ProfileLayout(){
    return(
        <>
        <div className="flex">
        <aside className="w-[350px] bg-gray-50 min-h-screen border-r pl-20">
          <ul className="space-y-2 p-4">
            <li className="mt-4"><Link to={'/profile/personal'}><i className="fa-solid fa-boxes-stacked me-2"></i>Overview</Link></li>
            <li className="mt-4"><i className="fa-solid fa-user me-2"></i>Personal Info</li>
            <li className="mt-4"><i className="fa-solid fa-file me-2"></i>Documents</li>
            <li className="mt-4"><i className="fa-solid fa-paper-plane me-2"></i>My Applications</li>
            <li className="mt-4"><Link to={'/profile/experience'}><i className="fa-solid fa-brain me-2"></i>Skills & Experience</Link></li>
            <li className="mt-4"><i className="fa-solid fa-bookmark me-2"></i>Favorites</li>
            <li className="mt-4"><i className="fa-solid fa-bell me-2"></i>Alerts</li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
        </>
    )
}