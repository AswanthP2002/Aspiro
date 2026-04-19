import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const navigate = useNavigate();
  const user = useSelector((state: { userAuth: { user: { _id: string; name: string } } }) => {
    return state.userAuth.user;
  });

  console.log('This is loged user', user);

  return (
    <div className="w-full sticky top-0 left-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-[100]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:px-12">
        {/* Brand/Logo */}
        <div className="brand cursor-pointer group" onClick={() => navigate('/')}>
          <p className="text-2xl font-black tracking-tighter text-slate-900 transition-colors group-hover:text-blue-600">
            Aspiro<span className="text-blue-600">.</span>
          </p>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:block">
          <ul className="flex gap-10 text-sm font-semibold text-slate-600">
            <li className="cursor-pointer hover:text-blue-600 transition-colors relative group">
              Explore
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors relative group">
              Find Opportunities
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors relative group">
              Network
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors relative group">
              For Recruiters
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors hidden sm:block"
          >
            Log in
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            Join Aspiro
          </button>
        </div>
      </div>
    </div>
  );
}

