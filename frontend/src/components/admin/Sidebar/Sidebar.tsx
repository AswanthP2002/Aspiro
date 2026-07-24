
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CiLogout } from 'react-icons/ci';
import { LuUserCheck, LuUserPlus, LuUsers } from 'react-icons/lu';
import { AiOutlineClose } from 'react-icons/ai';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContext';
import { logoutAdmin } from '../../../services/adminServices';
import { Notify } from 'notiflix';
import { BiBriefcase, BiGridAlt, BiWallet } from 'react-icons/bi';
import { BsDatabaseGear } from 'react-icons/bs';
import {GiReceiveMoney} from 'react-icons/gi'

const checkPresentPath = (path: string) => {
  return window.location.pathname.includes(path)
}


export default function Sidebar(){
  const {setAdminSidebarOpen, windowSize} = useContext(appContext)

  const dispatcher = useDispatch()
  const navigate = useNavigate()

 async function adminLogout(){
  Swal.fire({
    icon:'warning',
    title:'Logout?',
    text:'Are you sure to logout',
    showConfirmButton:true,
    confirmButtonText:'Logout',
    showCancelButton:true
  }).then(async (result) => {
    if(result?.isConfirmed){
      try {
        await logoutAdmin(dispatcher, navigate)

      } catch (error: unknown) {
        Notify.failure(error instanceof Error ? error.message : 'Can not logout right now, please try again after some time', {timeout: 3000})
      }
    }else{
      return
    }
  })
 }

  // const token = useSelector((state : any) => {
  //   return state.userAuth.userToken
  // })
  return (
    <>
      <div className='w-64 flex !opacity-100 flex-col border-r border-gray-200 !bg-white h-screen'>
        <div className="border-b flex items-center justify-between border-gray-300 !p-5">
          <p className='text-xl'>Aspiro Admin</p>
          {
            windowSize.width < 768 && (
              <button onClick={() => setAdminSidebarOpen(false)} className='hover:bg-gray-100'>
                <AiOutlineClose />
              </button>
            )
          }
        </div>
        <div className='!p-5 flex-1'>
          <ul className='flex flex-col'>
            <li className={`group ${checkPresentPath('dashboard') ? 'bg-blue-100 font-medium text-blue-500' : null} text-sm hover:bg-blue-100 !p-2 rounded-md`}>
              <Link to="/admin/dashboard" className='flex items-center gap-2 text-orange-500'>
                <BiGridAlt size={23} color='blue' className='group-hover:!text-blue-500' />
                <p className='text-blue-400 group-hover:text-blue-500 group-hover:font-medium'>Dashboard</p>
              </Link>
            </li>
            <li className={`group ${checkPresentPath('users') ? 'bg-blue-100' : null} text-sm hover:bg-blue-100 !p-2 rounded-md`}>
              <Link to="/admin/users" className='flex items-center gap-2'>
              <LuUsers size={21} color='blue' className='group-hover:!text-blue-400'/>
              <p className='text-blue-700 group-hover:text-blue-400 group-hover:font-medium'>Users</p>
              </Link>
            </li>
            <li className={`group ${checkPresentPath('applications') ? 'bg-blue-100' : null} text-sm hover:bg-blue-100 !p-2 rounded-md`}>
              <Link to="/admin/recruiter/applications" className='flex items-center gap-2'>
              <LuUserPlus size={21} color='blue' className='group-hover:!text-blue-400'/>
              <p className='text-blue-700 group-hover:text-blue-400 group-hover:font-medium'>Recruiter Applications</p>
              </Link>
            </li>
            <li className={`group ${checkPresentPath('recruiters') ? 'bg-blue-100' : null} text-sm hover:bg-blue-100 !p-2 rounded-md`}>
              <Link to="/admin/recruiters" className='flex items-center gap-2'>
              <LuUserCheck size={21} color='blue' className='group-hover:!text-blue-400'/>
              <p className='text-blue-700 group-hover:text-blue-400'>Recruiters & Companies</p>
              </Link>
            </li>
            <li className={`group ${checkPresentPath('jobs') ? 'bg-blue-100' : null} text-sm hover:bg-blue-100 !p-2 rounded-md`}>
              <Link to="/admin/jobs" className='flex items-center gap-2'>
              <BiBriefcase size={21} color='blue' className='group-hover:!text-blue-400'/>
              <p className='text-blue-700 group-hover:text-blue-400'>Jobs</p>
              </Link>
            </li>
            {/* <li className={`group cursor-not-allowed text-gray-200 text-sm !p-2 rounded-md`}>
              <Link to="admin/dashboard" className='flex items-center gap-2'>
                <BsEye size={23} color='gray' className='cursor-not-allowed' />
                <p className='text-gray-300 cursor-not-allowed'>Contents Moderation</p>
              </Link>
            </li> */}
            <li className={`group ${checkPresentPath('subscriptions') ? 'bg-blue-100' : null} text-sm hover:bg-blue-100 !p-2 rounded-md`}>
              <Link to="/admin/subscription/plans" className='flex items-center gap-2'>
              <BiWallet size={21} color='blue' className='group-hover:!text-blue-400'/>
              <p className='text-blue-700 group-hover:text-blue-400 group-hover:font-medium'>Subscriptions & Plans</p>
              </Link>
            </li>
            <li className={`group ${checkPresentPath('config') ? 'bg-blue-100' : null} text-sm hover:bg-blue-100 !p-2 rounded-md`}>
              <Link to="/admin/config" className='flex items-center gap-2'>
              <BsDatabaseGear size={21} color='blue' className='group-hover:!text-blue-400'/>
              <p className='text-blue-700 group-hover:text-blue-400 group-hover:font-medium'>App Config</p>
              </Link>
            </li>
            <div>
              <li className={`group ${checkPresentPath('analytics') ? 'bg-blue-100' : null} text-sm hover:bg-blue-100 !p-2 rounded-md`}>
              <Link to="/admin/analytics/overview" className='flex items-center gap-2'>
              <GiReceiveMoney size={21} color='blue' className='group-hover:!text-blue-400'/>
              <p className='text-blue-700 group-hover:text-blue-400 group-hover:font-medium'>Analytics & Revenue</p>
              </Link>
            </li>

            {checkPresentPath('analytics') && (
                <ul className='space-y-1 ms-10 my-2 transition-all duration-300 list-disc'>
                  <li className={`text-sm text-blue-700 hover:bg-blue-100 ps-2 py-1 ${checkPresentPath('analytics/overview') ? "bg-blue-100" : "bg-white"}`}>
                    <Link to={'analytics/overview'}>Overview</Link>
                  </li>
                  {/* <li className={`text-sm text-blue-700 hover:bg-blue-100 ps-2 py-1 ${checkPresentPath('analytics/failed-payments') ? "bg-blue-100" : "bg-white"}`}>
                    <Link to={'analytics/failed-payments'}>Failed Payments</Link>
                  </li>
                  <li className={`text-sm text-blue-700 hover:bg-blue-100 ps-2 py-1 ${checkPresentPath('analytics/refunds') ? "bg-blue-100" : "bg-white"}`}>
                    <Link to={'analytics/refunds'}>Refunds</Link>
                  </li> */}
                </ul>
              )}
            </div>
          </ul>
        </div>
        <div className='!p-5 border-t border-gray-300'>
          <button onClick={adminLogout} className='text-blue-500 font-medium flex items-center gap-2'>
            <CiLogout color='blue' />
            <p className='!m-0'>Logout</p>
          </button>
        </div>
      </div>
    </>
  );
};
