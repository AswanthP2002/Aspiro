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
import RecruiterLogin from './pages/recruiter/Login/Login'
import RecruiterRegister from './pages/recruiter/Register/Register'
import RecruiterVerificationPage from './pages/recruiter/Verification'
import RecruiterLayouts from './pages/recruiter/Layouts'
import RecruiterHome from './pages/recruiter/Home/Home'
import RecruiterProfileLayout from './pages/recruiter/ProfileLayout'
import RecruiterProfilePersonal from './pages/recruiter/Profile-Personal/Personal'
import RecruiterProtectedRoutes from './components/recruiter/ProtectedRoute'
import IntroDetailsPageForm from './pages/recruiter/IntroDetailsPage/Form'
import PostAJobForm from './pages/recruiter/Profile-PostAJob/PostAJob'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard/Dashboard'
import Companies from './pages/admin/Company-list/Companies'
import Candidates from './pages/admin/Candidate-list/Candidate-list'
import CandidateDetails from './pages/admin/CandidateDetails/CandidateDetails'
import CompanyDetails from './pages/admin/company-details/ComapnyDetails'
import Jobs from './pages/admin/Job-list/JobList'
import JobDetails from './pages/admin/JobDetails/JobDetails'
import ExperiencePage from './pages/candidate/Skills & Experience/SkillsExperience'

function App() {
  return(
    <BrowserRouter>
      <Routes>
    <Route path="/" element={<Layouts />}>
      <Route index element={<Home />} />

      <Route path="profile" element={<ProfileLayout />}>
        <Route path="personal" index element={<ProfilePersonal />} />
        <Route path='experience' element={<ExperiencePage />} />
      </Route>

    </Route>

    <Route path='/recruiter' element={<RecruiterLayouts />}>
      <Route index element={<RecruiterHome />} />

      <Route element={<RecruiterProtectedRoutes />}>
        <Route path='profile' element={<RecruiterProfileLayout />}>
          <Route path='overview' index element={<RecruiterProfilePersonal />} />
          <Route path='post-a-job' element={<PostAJobForm />} />
        </Route>
      </Route>
    </Route>

    <Route path='/admin' element={<AdminLayout />}>
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='companies' element={<Companies /> } />
      <Route path='candidates' element={<Candidates />} />
      <Route path='jobs' element={<Jobs />} />
      <Route path='candidate/details/:id' element={<CandidateDetails />} />
      <Route path='company/details/:id' element={<CompanyDetails />} />
      <Route path='job/details/:id' element={<JobDetails />} />
    </Route>

    <Route path="/register" element={<CandidateRegister />} />
    <Route path="/login" element={<CandidateLogin />} />

    <Route path="/admin/login" element={<LoginPage />} />

    <Route path="/verify/:email" element={<VerificationPage />} />
    <Route path='/verify/recruiter/:email' element={<RecruiterVerificationPage />} />
    <Route path='/store/details' element={<StoreDetails />} />
    <Route path='/auth-success' element={<AuthSuccess />} />

    <Route path='/recruiter/login' element={<RecruiterLogin />} />
    <Route path='/recruiter/register' element={<RecruiterRegister />} />
    <Route path='/recruiter/introdetails' element={<IntroDetailsPageForm />} />

    {/* <Route element={<RecruiterProtectedRoutes />}>
      <Route path='/recruiter/profile/overview' element={<RecruiterProfilePersonal />} />
    </Route> */}

    {/* Testing routes */}
    <Route path='/test' element={<RecruiterProfilePersonal />} />
  </Routes>
    </BrowserRouter>
  )
}

export default App
