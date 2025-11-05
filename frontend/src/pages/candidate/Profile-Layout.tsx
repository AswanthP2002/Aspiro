import { Link, Outlet } from "react-router-dom";

export default function ProfileLayout(){
    return(
        <>
        <div className="flex">
        <aside className="w-75 bg-gradient-to-br from-blue-500 to-indigo-600 min-h-screen border-r border-gray-300 !px-15 !pt-10">
          <Link to={'/'}>
            <div className="brand flex gap-3 items-center cursor-pointer">
            <img className="w-12" src="/aspiro-icon.png" alt="" />
            <p className="text-white font-semibold text-3xl">Aspiro</p>
          </div>
          </Link>
          <ul className="space-y-2 py-4">
            <li className="mt-4 text-sm text-white !p-3 group hover:text-blue-500 hover:bg-white"><Link to={'/profile/personal'}><i className="fa-solid fa-boxes-stacked group-hover:!text-blue-500 me-3 !text-white"></i>Overview</Link></li>
            <li className="mt-4 text-sm text-white !p-3 group hover:text-blue-500 hover:bg-white"><Link to={'/candidate/profile/documents'}><i className="fa-solid fa-file group-hover:!text-blue-500 me-3 !text-white"></i>Documents</Link></li>
            <li className="mt-4 text-sm text-white !p-3 group hover:text-blue-500 hover:bg-white"><Link to={'/profile/my-applications'}><i className="fa-solid fa-paper-plane group-hover:!text-blue-500 me-3 !text-white"></i>My Applications</Link></li>
            <li className="mt-4 text-sm text-white !p-3 group hover:text-blue-500 hover:bg-white"><Link to={'/profile/skills-experience'}><i className="fa-solid fa-brain group-hover:!text-blue-500 me-3 !text-white"></i>Skills & Experience</Link></li>
            <li className="mt-4 text-sm text-white !p-3 group hover:text-blue-500 hover:bg-white"><Link to={'/profile/favorites'}><i className="fa-solid fa-bookmark group-hover:!text-blue-500 me-3 !text-white"></i>Favorites</Link></li>
            <li className="mt-4 text-sm text-white !p-3 group hover:text-blue-500 hover:bg-white"><Link to={'/profile/notifications'}><i className="fa-solid fa-bell group-hover:!text-blue-500 me-3 !text-white"></i>Alerts</Link></li>
            <li className="mt-4 text-sm text-white !p-3 group hover:text-blue-500 hover:bg-white"><Link to={'/profile/recruiter/overview'}><i className="fa-solid group-hover:!text-blue-500 fa-user-tie me-3 !text-white"></i>Aspiro Recruiter</Link></li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
        </>
    )
}