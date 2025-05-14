import { Link, Outlet } from "react-router-dom";

export default function RecruiterProfileLayout(){
    return(
        <>
        <div className="flex">
        <aside className="w-[350px] bg-gray-50 min-h-screen border-r pl-20">
          <ul className="space-y-2 p-4">
            <li>Overview</li>
            <li><Link to={'/recruiter/profile/post-a-job'}>Post a job</Link></li>
            <li>My Jobs</li>
            <li>Settings</li>
            <li>Billing & Plan</li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
        </>
    )
}