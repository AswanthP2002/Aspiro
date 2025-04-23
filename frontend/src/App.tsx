import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/admin/Login/Login'
import CandidateRegister from './pages/candidate/Register/Register'
import Home from './pages/common/Home/Home'
import Layouts from './pages/common/Layouts'
import VerificationPage from './pages/common/Verification/Verification'
import CandidateLogin from './pages/candidate/Login/Login'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layouts />}>
          <Route index element={<Home />} />

          {/* Candidate related routes */}
          

          {/* Recruiter related routes */}


          {/* Admin related routes */}
        </Route>
        <Route path='/register' element={<CandidateRegister />} />
        <Route path='/login' element={<CandidateLogin />} />
        <Route path='/admin/login' element={<LoginPage />} />
        <Route path='/verify/:email' element={<VerificationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
