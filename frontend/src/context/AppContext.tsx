import { createContext, JSX, useState, useEffect } from 'react';

export const appContext = createContext<any>(null);

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  
  
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

  return (
    <appContext.Provider
      value={{ windowSize, setWindowSize, adminSidebarOpen, setAdminSidebarOpen, userSidebarOpen, setUserSidebarOpen, createPostModalOpen, openCreatePostModal, closeCreatePostModal }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
