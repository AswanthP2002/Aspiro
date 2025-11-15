import { createContext, JSX, useState } from 'react';

export const appContext = createContext<any>(null);

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  
  
  //state management for admin sidebar visibility
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const openCreatePostModal = () => setCreatePostModalOpen(true);
  const closeCreatePostModal = () => setCreatePostModalOpen(false);

  return (
    <appContext.Provider
      value={{ windowSize, setWindowSize, adminSidebarOpen, setAdminSidebarOpen, createPostModalOpen, openCreatePostModal, closeCreatePostModal }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
