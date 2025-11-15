
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { userLogout } from '../../../services/userServices';
import { CiHome, CiLogout, CiCreditCard1 } from 'react-icons/ci';
import { FaBriefcase, FaUserTie, FaRegChartBar, FaHome } from 'react-icons/fa';
import { LuUser, LuUsers } from 'react-icons/lu';
import { AiOutlineClose } from 'react-icons/ai';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContext';


export default function Sidebar(){
  const {adminSidebarOpen, setAdminSidebarOpen, windowSize} = useContext(appContext)

  const dispatcher = useDispatch()
  const navigate = useNavigate()

  async function triggerAdminLogout(){
    Swal.fire({
      icon:'info',
      title:'Logout?',
      text:'Are you sure you want to logout?',
      showConfirmButton:true,
      confirmButtonText:'Yes',
      showCancelButton:true,
      cancelButtonText:'No',
      allowOutsideClick:false
    }).then(async (result) => {
      if(result?.isConfirmed){
        const logoutResult = await userLogout(dispatcher, navigate)
        Swal.fire({
        icon:'success',
        title:'Logout Successful',
        showConfirmButton:false,
        showCancelButton:false,
        timer:2000
      }).then(() =>  navigate('/admin/login'))
      }
    })     
     
  }

  const token = useSelector((state : any) => {
    return state.userAuth.userToken
  })
  return (
    <>
      <div className='w-64 flex !opacity-100 flex-col !bg-white h-screen'>
        <div className="border-b flex items-center justify-between border-gray-300 !p-5">
          <p className='text-xl'>Aspiro</p>
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
            <li className='group text-sm hover:bg-orange-100 !p-2 rounded-md'>
              <Link to="/admin/dashboard" className='flex items-center gap-2 text-orange-500'>
                <CiHome size={23} color='gray' className='group-hover:!text-orange-500' />
                <p className='text-gray-700 group-hover:text-orange-400 group-hover:font-medium'>Home</p>
              </Link>
            </li>
            <li className='group text-sm hover:bg-orange-100 !p-2 rounded-md'>
              <Link to="/admin/jobs" className='flex items-center gap-2'>
                <FaBriefcase size={21} color='gray' className='group-hover:!text-orange-500' />
                <p className='text-gray-700 group-hover:text-orange-400 group-hover:font-medium'>Job Posts</p>
              </Link>
            </li>
            <li className='group text-sm hover:bg-orange-100 !p-2 rounded-md'>
              <Link to="/admin/companies" className='flex items-center gap-2'>
                <FaUserTie size={21} color='gray' className='group-hover:!text-orange-500' />
                <p className='text-gray-700 group-hover:text-orange-400 group-hover:font-medium'>Recruiters</p>
              </Link>
            </li>
            <li className='group text-sm hover:bg-orange-100 !p-2 rounded-md'>
              <Link to="/admin/users" className='flex items-center gap-2'>
              <LuUsers size={21} color='gray' className='group-hover:!text-orange-400'/>
              <p className='text-gray-700 group-hover:text-orange-400 group-hover:font-medium'>Users</p>
              </Link>
            </li>
            <li className='group text-sm hover:bg-orange-100 !p-2 rounded-md'>
              <Link to="/admin/users" className='flex items-center gap-2'>
              <FaRegChartBar size={21} color='gray' className='group-hover:!text-orange-400'/>
              <p className='text-gray-700 group-hover:text-orange-400 group-hover:font-medium'>Analyitcs</p>
              </Link>
            </li>
            <li className='group text-sm hover:bg-orange-100 !p-2 rounded-md'>
              <Link to="/admin/users" className='flex items-center gap-2'>
              <CiCreditCard1 size={21} color='gray' className='group-hover:!text-orange-400'/>
              <p className='text-gray-700 group-hover:text-orange-400 group-hover:font-medium'>Billings & Subscriptions</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className='!p-5 border-t border-gray-300'>
          <button className='text-orange-500 font-medium flex items-cneter gap-2'>
            <CiLogout color='orange' />
            <p className='!m-0'>Logout</p>
          </button>
        </div>
      </div>
    </>
    // <div className="w-64 bg-white p-6 shadow-md flex flex-col justify-between">
    //   <div>
    //     <h2 className="text-2xl font-bold mb-6">Aspiro</h2>
    //     <nav className="space-y-3 mt-15">
    //         <ul>
    //           <li className='mt-7 group hover:text-orange-400 text-sm'><Link to="/admin/dashboard"><i className="fa-solid fa-house group-hover:!text-orange-400 me-3"></i>Home</Link></li>
    //           <li className='mt-7 group hover:text-orange-400 text-sm'><Link to="/admin/jobs"><i className="fa-solid fa-briefcase group-hover:!text-orange-400 me-3"></i>Job Posts</Link></li>
    //           <li className='mt-7 group hover:text-orange-400 text-sm'><Link to="/admin/companies"><i className="fa-solid fa-building group-hover:!text-orange-400 me-3"></i>Recruiters</Link></li>
    //           <li className='mt-7 group hover:text-orange-400 text-sm'><Link to="/admin/users"><i className="fa-solid fa-users group-hover:!text-orange-400 me-3"></i>Users</Link></li>
    //           <li className='mt-7 group hover:text-orange-400 text-sm'><Link to="/admin/analytics"><i className="fa-solid fa-magnifying-glass-chart group-hover:!text-orange-400 me-3"></i>Analytics</Link></li>
    //           <li className='mt-7 group hover:text-orange-400 text-sm'><Link to="/admin/courses"><i className="fa-solid fa-money-bill-trend-up group-hover:!text-orange-400 me-3"></i>Bills & Plans</Link></li>
    //        </ul>
    //     </nav>
    //   </div>
    //   {
    //     token ? <button onClick={triggerAdminLogout} className="text-red-500 mt-6">Logout</button> : null
    //   }
    // </div>
  );
};


