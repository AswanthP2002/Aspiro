import { IoMdMenu } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { FaRegBell } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import { appContext } from '../../context/AppContext';

export default function TopBar() {
    const {windowSize, setWindowSize, adminSidebarOpen, setAdminSidebarOpen} = useContext(appContext)

    useEffect(() => {
        const checkResizeParameters = () => {
            //console.log(window.innerWidth, window.innerHeight)
            setWindowSize({
                width:window.innerWidth,
                height:window.innerHeight
            })
        }

        window.addEventListener('resize', checkResizeParameters)

        return () => window.removeEventListener('resize', checkResizeParameters)
    })
  return (
    <div className="w-full bg-white !px-5 !py-3 border border-gray-300 flex justify-between items-center">
      <div className='flex gap-3'>
        {
            windowSize.width < 768 && (
                <button onClick={() => setAdminSidebarOpen(true)} className="md:hidden">
                    <IoMdMenu size={21} color="gray" />
                </button>
            )
        }
        <div className="flex gap-2 rounded-md items-center bg-gray-100 !p-2 w-50">
          <FaSearch color="gray" size={15} />
          <input type="text" placeholder="Search..." className="w-full" />
        </div>
        {/* <div>
            <p>width : {windowSize.width}</p>
            <p>height : {windowSize.height}</p>
        </div> */}
      </div>
      <div className='flex items-center gap-3'>
        <FaRegBell color='gray' />
        <button className='bg-orange-100 text-orange-500 text-sm font-medium w-10 h-10 flex items-center justify-center rounded-full'>
            AD
        </button>
      </div>
    </div>
  );
}
