import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/admin/Login/Login'
import CandidateRegister from './pages/candidate/Register/Register'
import Home from './pages/common/Home/Home'
import Layouts from './pages/common/Layouts'
import VerificationPage from './pages/common/Verification/Verification'
import CandidateLogin from './pages/candidate/Login/Login'
import ProfileLayout from './pages/candidate/Profile-Layout'
import ProfilePersonal from './pages/candidate/Profile-Personal/Personal'
import StoreDetails from './pages/candidate/Basic Details Storing Page/StoreDetails'
import AuthSuccess from './components/common/AuthSuccessGoogle'

function App() {
  return(
    <BrowserRouter>
      <Routes>
    <Route path="/" element={<Layouts />}>
      <Route index element={<Home />} />

      <Route path="profile" element={<ProfileLayout />}>
        <Route path="personal" index element={<ProfilePersonal />} />
      </Route>

    </Route>

    <Route path="/register" element={<CandidateRegister />} />
    <Route path="/login" element={<CandidateLogin />} />
    <Route path="/admin/login" element={<LoginPage />} />
    <Route path="/verify/:email" element={<VerificationPage />} />
    <Route path='/store/details' element={<StoreDetails />} />
    <Route path='/auth-success' element={<AuthSuccess />} />

    {/* Testing routes */}
    <Route path='/test' element={<StoreDetails />} />
  </Routes>
    </BrowserRouter>
  )
}

export default App
