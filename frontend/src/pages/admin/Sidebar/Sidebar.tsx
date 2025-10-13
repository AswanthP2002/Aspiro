
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../redux-toolkit/userAuthSlice';
import { logoutAdmin } from '../../../services/adminServices';
import Swal from 'sweetalert2';

export default function Sidebar(){
  const dispatcher = useDispatch()
  const navigator = useNavigate()

  async function triggerAdminLogout(){
    const logoutResult = await logoutAdmin()
    if(logoutResult?.success){
      dispatcher(logout())
      Swal.fire({
        icon:'success',
        title:'Logout Successful',
        showConfirmButton:false,
        showCancelButton:false,
        timer:2000
      }).then(() =>  navigator('/admin/login'))
     
    }
    
  }

  const token = useSelector((state : any) => {
    return state.adminAuth.adminToken
  })
  return (
    <div className="w-64 bg-white p-6 shadow-md flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6">Aspiro</h2>
        <nav className="space-y-3 mt-15">
            <ul>
              <li className='mt-7 group hover:text-orange-400 text-sm'><Link to="/admin/dashboard"><i className="fa-solid fa-house group-hover:!text-orange-400 me-3"></i>Home</Link></li>
              <li className='mt-7 group hover:text-orange-400 text-sm'><Link to="/admin/jobs"><i className="fa-solid fa-briefcase group-hover:!text-orange-400 me-3"></i>Job Posts</Link></li>
              <li className='mt-7 group hover:text-orange-400 text-sm'><Link to="/admin/companies"><i className="fa-solid fa-building group-hover:!text-orange-400 me-3"></i>Companies</Link></li>
              <li className='mt-7 group hover:text-orange-400 text-sm'><Link to="/admin/candidates"><i className="fa-solid fa-users group-hover:!text-orange-400 me-3"></i>Candidates</Link></li>
              <li className='mt-7 group hover:text-orange-400 text-sm'><Link to="/admin/analytics"><i className="fa-solid fa-magnifying-glass-chart group-hover:!text-orange-400 me-3"></i>Analytics</Link></li>
              <li className='mt-7 group hover:text-orange-400 text-sm'><Link to="/admin/courses"><i className="fa-solid fa-money-bill-trend-up group-hover:!text-orange-400 me-3"></i>Bills & Plans</Link></li>
           </ul>
        </nav>
      </div>
      {
        token ? <button onClick={triggerAdminLogout} className="text-red-500 mt-6">Logout</button> : null
      }
    </div>
  );
};

