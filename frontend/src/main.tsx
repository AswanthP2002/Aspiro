import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppContextProvider from './context/AppContext.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router-dom';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const root = createRoot(document.getElementById('root')!);
// wrapping app with google auth provider

root.render(
  <ErrorBoundary>
  <GoogleOAuthProvider clientId={googleClientId}> 
  <Provider store={store}>
    <AppContextProvider>
      <BrowserRouter>
    <App />
      </BrowserRouter>
    </AppContextProvider>
  </Provider>
  </GoogleOAuthProvider>
  </ErrorBoundary>
);
