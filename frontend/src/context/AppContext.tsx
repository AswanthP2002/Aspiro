import { createContext, JSX, useState } from 'react';

export const appContext = createContext<any>(null);

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);

  const openCreatePostModal = () => setCreatePostModalOpen(true);
  const closeCreatePostModal = () => setCreatePostModalOpen(false);

  return (
    <appContext.Provider
      value={{ createPostModalOpen, openCreatePostModal, closeCreatePostModal }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
