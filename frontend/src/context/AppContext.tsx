import { createContext, JSX, useState, useEffect } from 'react';
import { UserMetaData } from '../types/entityTypes';
import { useSelector } from 'react-redux';
import { loadUserMetaData } from '../services/userServices';
import { Notify } from 'notiflix';
import Swal from 'sweetalert2';

export const appContext = createContext<any>(null);

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [userMetaData, setUserMetaData] = useState<UserMetaData | null>(null)
  
  const logedUser = useSelector((state: any) => {
    return state.userAuth.user
  })
  
  //state management for admin sidebar visibility
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false)
  const [userSidebarOpen, setUserSidebarOpen] = useState(false)

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const openCreatePostModal = () => setCreatePostModalOpen(true);
  const closeCreatePostModal = () => setCreatePostModalOpen(false);

  //fetch user meta data
  // useEffect(() => {
  //   if(logedUser?.id){
  //     (async function () {
  //       try {
  //         const result = await loadUserMetaData()

  //         if(!result?.success){
  //           Notify.failure(result?.message, {timeout:2000})
  //           return
  //         }
  //         Notify.success('User meta data loaded successfully', {timeout:2000})
  //         console.log('--- user metadata ---', result?.result)
  //         setUserMetaData(result?.result)
  //       } catch (error: unknown) {
  //         Swal.fire({
  //           icon:'error',
  //           title:'Something went wrong',
  //           text:error instanceof Error ? error.message : 'Something went wrong'
  //         })
  //       }
  //     })()
  //   }
  // }, [logedUser])

  return (
    <appContext.Provider
      value={{ 
        windowSize, 
        setWindowSize, 
        adminSidebarOpen, 
        setAdminSidebarOpen, 
        userSidebarOpen,
         setUserSidebarOpen, 
         createPostModalOpen, 
         openCreatePostModal, 
         closeCreatePostModal,
         userMetaData,
         setUserMetaData
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
