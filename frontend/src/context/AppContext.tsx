import { createContext } from 'react';

export const appContext = createContext<unknown>(null); //changed to unknown from any

// const AppContextProvider = ({ children }: { children: JSX.Element }) => {
//   const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
//   const [userMetaData, setUserMetaData] = useState<UserMetaData | null>(null)
  
//   const [adminSidebarOpen, setAdminSidebarOpen] = useState(false)
//   const [userSidebarOpen, setUserSidebarOpen] = useState(false)

//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight
//   })

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       })
//     }

//     window.addEventListener('resize', handleResize)

//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   const openCreatePostModal = () => setCreatePostModalOpen(true);
//   const closeCreatePostModal = () => setCreatePostModalOpen(false);

//   return (
//     <appContext.Provider
//       value={{ 
//         windowSize, 
//         setWindowSize, 
//         adminSidebarOpen, 
//         setAdminSidebarOpen, 
//         userSidebarOpen,
//          setUserSidebarOpen, 
//          createPostModalOpen, 
//          openCreatePostModal, 
//          closeCreatePostModal,
//          userMetaData,
//          setUserMetaData
//       }}
//     >
//       {children}
//     </appContext.Provider>
//   );
// };

// export default AppContextProvider;
