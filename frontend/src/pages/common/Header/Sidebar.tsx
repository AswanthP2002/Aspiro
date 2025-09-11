import {MdHomeFilled} from 'react-icons/md'
import {AiFillMessage} from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function Sidebar(){
    return(
        <div className='h-full mt-10 ms-8 flex flex-col justify-between'>
            <ul className='flex flex-col gap-7'>
                <li className="nav-link text-sm font-semibold active hover:text-blue-500 cursor-pointer"><Link to={'/'}><i className='!text-blue-500 fa-solid fa-home me-2'></i> Home</Link></li>
                <li className="nav-link text-sm font-semibold hover:text-blue-500 cursor-pointer"><Link to={'/'}><i className='!text-blue-500 fa-solid fa-message me-2'></i>Messages</Link></li>
                <li className="nav-link text-sm font-semibold cursor-pointer hover:text-blue-500"><Link to={'/jobs'}><i className='!text-blue-500 fa-solid fa-briefcase me-2'></i>Find Jobs</Link></li>
                <li className="nav-link text-sm font-semibold cursor-pointer hover:text-blue-500"><Link to={'/candidates'}><i className='!text-blue-500 fa-solid fa-users me-2'></i>Peoples</Link></li>
                <li className="nav-link text-sm font-semibold cursor-pointer hover:text-blue-500"><i className='fa-solid !text-blue-500  fa-building me-2'></i> Companies</li>
            </ul>
            <div>
                <p className='text-xs text-gray-500'>&copy; 2025 All rights reserved | Aspiro</p>
            </div>
        </div>
    )
}