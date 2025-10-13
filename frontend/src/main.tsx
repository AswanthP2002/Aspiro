import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './redux-toolkit/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppContextProvider from './context/AppContext.tsx';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const root = createRoot(document.getElementById('root')!);
// wrapping app with google auth provider

root.render(
  <GoogleOAuthProvider clientId={googleClientId}> 
  <Provider store={store}>
    <AppContextProvider>
    <App />
    </AppContextProvider>
  </Provider>
  </GoogleOAuthProvider>
);
