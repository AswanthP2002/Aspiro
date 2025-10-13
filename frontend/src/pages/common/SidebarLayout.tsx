import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Header/Sidebar";

export default function SidebarLayout(){
    return(
        <div className="flex flex-col h-screen">

            <div className="flex flex-1 overflow-hidden">
                <aside className="!h-screen w-64 border-r border-gray-200">
                    <Sidebar />
                </aside>
                <main className="flex-1 overflow-y-scroll">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}