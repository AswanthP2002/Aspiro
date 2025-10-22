import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/admin/Login/Login';
import CandidateRegister from './pages/user/Register/Register';
import Home from './pages/common/Home/Home';
import Layouts from './pages/common/Layouts';
import VerificationPage from './pages/user/Verification/Verification';
import CandidateLogin from './pages/user/Login/Login';
import ProfileLayout from './pages/candidate/Profile-Layout';
import ProfilePersonal from './pages/candidate/Profile-Personal/Personal';
import StoreDetails from './pages/candidate/Basic Details Storing Page/StoreDetails';
import AuthSuccess from './components/common/AuthSuccessGoogle';
import RecruiterLogin from './pages/recruiter/Login/Login';
import RecruiterRegister from './pages/recruiter/Register/Register';
import RecruiterVerificationPage from './pages/recruiter/Verification';
import RecruiterLayouts from './pages/recruiter/Layouts';
import RecruiterHome from './pages/recruiter/Home/Home';
import RecruiterProfileLayout from './pages/recruiter/ProfileLayout';
import RecruiterProfilePersonal from './pages/recruiter/Profile-Personal/Personal';
import RecruiterProtectedRoutes from './components/recruiter/ProtectedRoute';
import IntroDetailsPageForm from './pages/recruiter/IntroDetailsPage/Form';
import PostAJobForm from './pages/recruiter/Profile-PostAJob/PostAJob';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import Companies from './pages/admin/Company-list/Companies';
import Users from './pages/admin/Users-List/Users';
import CandidateDetails from './pages/admin/CandidateDetails/CandidateDetails';
import CompanyDetails from './pages/admin/company-details/ComapnyDetails';
import Jobs from './pages/admin/Job-list/JobList';
import JobDetails from './pages/admin/JobDetails/JobDetails';
import ExperiencePage from './pages/candidate/Skills & Experience/SkillsExperience';
import JobListing from './pages/candidate/Job-list-details/JobList';
import JObDetailsCandidateSide from './pages/candidate/Job-list-details/JobDetails';
import DocumentsPage from './pages/candidate/Documents Page/Documents';
import JobApplyPage from './pages/candidate/Job-apply/Apply';
import ApplicantManagePage from './pages/recruiter/Applicant-Manage/ApplicantsManage';
import AdminProtectedRoutes from './components/admin/AdminProtectedRoutes';
import AdminLogedIn from './components/admin/AdminLogedInRoute';
import RecruiterLogedInRoutes from './components/recruiter/RecruiterLogedIn';
//import CandidateProtectedRoute from './components/candidate/CandidateProtectedRoutes';
import SavedJobs from './pages/SavedJobs/SavedJobs';
import FinalizedList from './pages/recruiter/FinalizedList/FinalizedList';
import CandidatePublicProfile from './pages/candidate/Candidate-List-Details/CandidateDetails';
import CandidatesList from './pages/candidate/Candidate-List-Details/CandidateList';
import MyApplications from './pages/candidate/My-applications/Applications';
import ViewApplicationDetailsPage from './pages/recruiter/View-application/ViewApplication';
import NotificationPage from './pages/candidate/Notification-Page/Notifications';
import Feed from './pages/common/Feed/Feed';
import SidebarLayout from './pages/common/SidebarLayout';
import Chat from './pages/common/Chat/Chat';
import ArcLoader from './components/candidate/Loader';
import CircularSpinner from './components/common/CircularSpinner';
import InfinitySpinner from './components/common/InfinitySpinner';
import PublicRoute from './components/route-components/PublicRoute';
import CandidateProtectedRoute from './components/route-components/Candidate-ProtectedRoute';
import NotFoundPage from './pages/shared/NotFound';
import AdminLoginPage from './pages/admin/Login/Login';
import UserProtectedRoute from './components/route-components/Candidate-ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layouts />}>
          <Route index element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          } />

          <Route path='/feed' element={<SidebarLayout />}>
            <Route index element={<Feed />} />
          </Route>

          <Route path='/profile' element={<UserProtectedRoute />}>
            <Route element={<ProfileLayout />}>
              <Route path='personal' index element={<ProfilePersonal />} />
              <Route path='documents' element={<DocumentsPage />} />
              <Route path='experience' element={<ExperiencePage />} />
            </Route>
          </Route>
        </Route>

        <Route path='/verify' element={<VerificationPage />} />
        
        {/* Candidate specific routes not applicable header & sidebar & footer */}
        <Route path='/login' element={<CandidateLogin />} />
        <Route path='/register' element={<CandidateRegister />} />
        <Route path='/store/details' element={<StoreDetails />} />

        {/* Recruiter specific routes not applicable header & sidebar & footer */}

        
        {/* Admin specific routes */}
        <Route path='/admin/login' element={<AdminLoginPage />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='users' element={<Users />} />
          <Route path='candidate/details/:id' element={<CandidateDetails />} />
        </Route>


        {/* Recruiter login */}
        <Route path='/recruiter/login' element={<RecruiterLogin />} />
        <Route path='/recruiter/register' element={<RecruiterRegister />} />

        <Route path="/recruiter" element={<RecruiterLayouts />}>
           <Route index element={<RecruiterHome />} />

           <Route element={<RecruiterProtectedRoutes />}>
             <Route path="profile" element={<RecruiterProfileLayout />}>
               <Route
                path="overview"
                index
                element={<RecruiterProfilePersonal />}
              />
              <Route path="post-a-job" element={<PostAJobForm />} />
              <Route
                path="applications/:jobId"
                element={<ApplicantManagePage />}
              />
              <Route
                path="application/details/:applicationId"
                element={<ViewApplicationDetailsPage />}
              />
              <Route
                path="applications/:jobId/finalized"
                element={<FinalizedList />}
              />
            </Route>
          </Route>
        </Route>

        <Route path='/recruiter/introdetails' element={<IntroDetailsPageForm />} />

        <Route path='*' element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Layouts />}>
    //       <Route index element={<Home />} />
    //       <Route path="candidates">
    //         <Route index element={<CandidatesList />} />
    //         <Route path=":id" element={<CandidatePublicProfile />} />
    //       </Route>
    //       {/* <Route path='candidates/:id' element={<CandidatePublicProfile />} /> */}
    //       <Route path="jobs">
    //         <Route index element={<JobListing />} />
    //         <Route path=":id" element={<JObDetailsCandidateSide />} />
    //         <Route path=":id/apply" element={<CandidateProtectedRoute />}>
    //           <Route index element={<JobApplyPage />} />
    //         </Route>
    //         {/* <Route path=':id/apply' element={<JobApplyPage />} /> */}
    //       </Route>

    //       <Route path="profile" element={<CandidateProtectedRoute />}>
    //         <Route element={<ProfileLayout />}>
    //           <Route path="personal" index element={<ProfilePersonal />} />
    //           <Route path="experience" element={<ExperiencePage />} />
    //           <Route path="documents" element={<DocumentsPage />} />
    //           <Route path="favorites" element={<SavedJobs />} />
    //           <Route path="my-applications" element={<MyApplications />} />
    //           <Route path="notifications" element={<NotificationPage />} />
    //         </Route>
    //         {/* <Route path="personal" index element={<ProfilePersonal />} />
    //     <Route path='experience' element={<ExperiencePage />} />
    //     <Route path='documents' element={<DocumentsPage />} />
    //     <Route path='favorites' element={<SavedJobs />} /> */}
    //       </Route>
    //       <Route element={<CandidateProtectedRoute />}>
    //         <Route path="feed" element={<Feed />} />
    //       </Route>
    //     </Route>

    //     <Route path="/recruiter" element={<RecruiterLayouts />}>
    //       <Route index element={<RecruiterHome />} />

    //       <Route element={<RecruiterProtectedRoutes />}>
    //         <Route path="profile" element={<RecruiterProfileLayout />}>
    //           <Route
    //             path="overview"
    //             index
    //             element={<RecruiterProfilePersonal />}
    //           />
    //           <Route path="post-a-job" element={<PostAJobForm />} />
    //           <Route
    //             path="applications/:jobId"
    //             element={<ApplicantManagePage />}
    //           />
    //           <Route
    //             path="application/details/:applicationId"
    //             element={<ViewApplicationDetailsPage />}
    //           />
    //           <Route
    //             path="applications/:jobId/finalized"
    //             element={<FinalizedList />}
    //           />
    //         </Route>
    //       </Route>
    //     </Route>

    //     <Route path="/admin" element={<AdminLayout />}>
    //       <Route element={<AdminProtectedRoutes />}>
    //         <Route path="dashboard" element={<Dashboard />} />
    //         <Route path="companies" element={<Companies />} />
    //         <Route path="candidates" element={<Candidates />} />
    //         <Route path="jobs" element={<Jobs />} />
    //         <Route
    //           path="candidate/details/:id"
    //           element={<CandidateDetails />}
    //         />
    //         <Route path="company/details/:id" element={<CompanyDetails />} />
    //         <Route path="job/details/:id" element={<JobDetails />} />
    //       </Route>
    //     </Route>

    //     <Route path="/register" element={<CandidateRegister />} />
    //     <Route path="/login" element={<CandidateLogin />} />

    //     <Route path="/admin/login" element={<AdminLogedIn />}>
    //       <Route index element={<LoginPage />} />
    //     </Route>
    //     {/* <Route path="/admin/login" element={<LoginPage />} /> */}

    //     <Route path="/verify" element={<VerificationPage />} />
    //     <Route
    //       path="/verify/recruiter/:email"
    //       element={<RecruiterVerificationPage />}
    //     />
    //     <Route path="/store/details" element={<StoreDetails />} />
    //     <Route path="/auth-success" element={<AuthSuccess />} />

    //     {/* <Route path='/recruiter/login' element={<RecruiterLogin />} /> */}
    //     <Route path="/recruiter/login" element={<RecruiterLogedInRoutes />}>
    //       <Route index element={<RecruiterLogin />} />
    //     </Route>
    //     <Route path="/recruiter/register" element={<RecruiterRegister />} />
    //     <Route
    //       path="/recruiter/introdetails"
    //       element={<IntroDetailsPageForm />}
    //     />

    //     {/* <Route element={<RecruiterProtectedRoutes />}>
    //   <Route path='/recruiter/profile/overview' element={<RecruiterProfilePersonal />} />
    // </Route> */}

    //     {/* Testing routes */}
    //     <Route path="/test" element={<SidebarLayout />}>
    //       <Route index element={<Feed />} />
    //     </Route>

    //     {/* This route is designed for testing components only */}
    //     <Route path="component/tester" element={<InfinitySpinner
    //       size={50} thickness={100} secondaryColor='#c9c6c5' color='blue'
    //     />} />

    //     <Route path="/chat" element={<Chat />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
