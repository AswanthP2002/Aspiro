
import { Route, Routes, useLocation } from 'react-router-dom';
import {ToastContainer, Bounce} from 'react-toastify'
import './App.css';
import Home from './pages/common/Home/Home';
import Layouts from './pages/common/Layouts';
import VerificationPage from './pages/user/Verification/Verification';
import ProfileLayout from './pages/candidate/Profile-Layout';
import ProfilePersonal from './pages/user/Profile-Overview/Personal.overview';
import StoreDetails from './pages/user/User-Intro Details/StoreDetails';
import IntroDetailsPageForm from './pages/recruiter/IntroDetailsPage/Form';
import MyJobs from './pages/recruiter/Profile-Personal/MyJobs';
import PostAJobForm from './pages/recruiter/Profile-PostAJob/PostAJob';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard/Dashboard';
// import Companies from './pages/admin/Company-list/Companies';
import Users from './pages/admin/Users-List/Users';
import CandidateDetails from './pages/admin/CandidateDetails/UserDetails';
// import CompanyDetails from './pages/admin/company-details/ComapnyDetails';
import Jobs from './pages/admin/Job-list/JobList';
// import JobDetails from './pages/admin/JobDetails/JobDetails';
import ExperiencePage from './pages/user/Skills & Experience/SkillsExperience';
import JobListing from './pages/candidate/Job-list-details/JobList';
// import JObDetailsCandidateSide from './pages/candidate/Job-list-details/JobDetails';
import DocumentsPage from './pages/user/Documents Page/Documents';
// import JobApplyPage from './pages/candidate/Job-apply/Apply';
import ApplicantManagePage from './pages/recruiter/Applicant-Manage/ApplicantsManage';
import AdminProtectedRoutes from './components/admin/AdminProtectedRoutes';
// import AdminLogedIn from './components/admin/AdminLogedInRoute';
// import RecruiterLogedInRoutes from './components/recruiter/RecruiterLogedIn';
//import CandidateProtectedRoute from './components/candidate/CandidateProtectedRoutes';
import SavedJobs from './pages/SavedJobs/SavedJobs';
// import FinalizedList from './pages/recruiter/FinalizedList/FinalizedList';
// import CandidatePublicProfile from './pages/candidate/Candidate-List-Details/CandidateDetails';
// import CandidatesList from './pages/candidate/Candidate-List-Details/CandidateList';
// import MyApplications from './pages/candidate/My-applications/Applications';
// import ViewApplicationDetailsPage from './pages/recruiter/View-application/ViewApplication';
import NotificationPage from './pages/candidate/Notification-Page/Notifications';
import Feed from './pages/common/Feed/Feed';
import CommonLayout from './pages/common/SidebarLayout';
// import Chat from './pages/common/Chat/Chat';
// import ArcLoader from './components/candidate/Loader';
// import CircularSpinner from './components/common/CircularSpinner';
// import InfinitySpinner from './components/common/InfinitySpinner';
import PublicRoute from './components/route-components/PublicRoute';
// import CandidateProtectedRoute from './components/route-components/Candidate-ProtectedRoute';
import NotFoundPage from './pages/shared/NotFound';
import AdminLoginPage from './pages/admin/Login/Login';
import UserProtectedRoute from './components/route-components/Candidate-ProtectedRoute';
import RecruiterRegisterPage from './pages/candidate/RecruiterRegister';
import TokenExpiredLogoutPage from './pages/TokenExpiredLogout.page';
import RecruiterProfilePage from './pages/candidate/Recruiter/RecruiterProfile.page';
import EditJobForm from './pages/recruiter/EditJob/EditJob';

// import SocketProvider from './context/SocketContext';
import ForgotPasswordPage from './pages/user/Forgot-Password/ForgotPassword';
import ResetLinkSendPage from './pages/user/Forgot-Password/ResetLinkSendPage';
import PasswordResetPage from './pages/user/Forgot-Password/PasswordResetPage';
import PasswordResetSuccessPage from './pages/user/Forgot-Password/PasswordResetSuccessPage';
import UserPublicProfile from './pages/candidate/Candidate-List-Details/CandidateDetails';
import PostProvider from './context/PostContext';
import RecruiterApplications from './pages/admin/Recruiter-applications/RecruiterApplications';
import RecruiterApplicationDetailsPage from './pages/admin/Recruiter-applications/RecruiterApplicationDetailsPage';
import { useEffect, useState } from 'react';
import JObDetailsCandidateSide from './pages/candidate/Job-list-details/JobDetails';
import JobApplyPage from './pages/candidate/Job-apply/Apply';
import MyApplications from './pages/user/My-applications/Applications';
import ChatPage from './pages/common/Chat/Chat';
// import Companies from './pages/admin/Company-list/Companies';
// import AdminSkillManagementPage from './pages/admin/Company-list/SkillsManagement';
import NoAuthRoutes from './components/route-components/NoAuthRoute';
import UserRegister from './pages/user/Register/Register';
import UserLogin from './pages/user/Login-FIX/Login';
import UsersFindingPage from './pages/user/Users/Users';
import { AnimatePresence } from 'motion/react';
import AlertsPage from './pages/user/Alerts/Alerts';
import { useDispatch, useSelector } from 'react-redux';
import { Alerts, Notification } from './types/entityTypes';
// import { setAlerts, unreadAlertsCountThunk } from './redux/alertSlice';
// import { fetchUserAlerts } from './services/alertsServices';
// import { getNotifications } from './services/userServices';
import { disconnectSocket, initializeSocket } from './socket';
import { addLiveNotification, deleteNotificationFromStore, notificationThunk } from './redux/notificationSlice';
import { UserRoutes } from './constants/routs/user.routes';
import { reAuthenticateThunk } from './redux/reAuthenticateSlice';
import store from './redux/store';
// import { Modal } from '@mui/material';
// import Loader from './components/admin/Loader';
import { AdminRoutes } from './constants/routs/admin.routes';
import TerminationPage from './pages/user/Action-Termination/Termination';
import { SocketEvents } from './socket/socket.events';
import Recruiters from './pages/admin/Company-list/Companies';
import RecruiterDetails from './pages/admin/company-details/ComapnyDetails';
import AppConfigPage from './pages/admin/Company-list/SkillsManagement';
import JobDetails from './pages/admin/JobDetails/JobDetails';
import ApplySuccessPage from './pages/candidate/Job-apply/Apply-Success';
import ApplicationTrack from './pages/user/Application-track/Application.track';
import PlanConfiguration from './pages/admin/Subscription & Plans/AddPlan';
import Plans from './pages/admin/Subscription & Plans/Planst';
import EditPlan from './pages/admin/Subscription & Plans/EditPlan';
import PricingPage from './pages/user/Plans/PlanModal';
import PaymentSuccessPage from './pages/user/Plans/PaymentSuccessPage';
import { AdminAnalytics } from './pages/admin/Analytics/Analytics';
import SubscriptionPage from './pages/user/Manage Billings/Billings';
import AspiroCareer from './pages/user/Aspiro-career/Aspiro.career';
import ResumeToolsPage from './pages/user/Aspiro-career/ResumeTools';
import AutoResumeCreationPage from './pages/user/Aspiro-career/AutoResume.profile';
import ResumeAnalyzer from './pages/user/Aspiro-career/ResumeAnalyzePage';
import DetailedAnalysisReportPage from './pages/user/Aspiro-career/DetailedAnalysisReportPage';
import InterviewOverviewPage from './pages/user/Aspiro-career/AI-Interviews/InterviewOverviewPage';
import InterviewPersonalizationPage from './pages/user/Aspiro-career/AI-Interviews/PersonalizationPage';
import InterviewModeSelectionPage from './pages/user/Aspiro-career/AI-Interviews/ModeSelectionPage';
import InterviewPage from './pages/user/Aspiro-career/AI-Interviews/InterviewPage';
import InterviewCompletePage from './pages/user/Aspiro-career/AI-Interviews/InterviewResultPage';
import InterviewDashboardPage from './pages/user/Aspiro-career/AI-Interviews/Dashboard';

interface FetchAlertsPayloadResponse {
  success: boolean
  message: string
  result: Alerts[]
}

interface FetchNotificationsResponsePayload {
  success: boolean
  message: string
  notifications: Notification[]
  unRead: number
}

interface RootState {
  userAuth: {
    user: {_id: string, role: string, subscription: {planId: string, name: string}} | null,
    userToken: any,
    userRole: any,
    initialLoading: boolean,
  }
}

function App() {
  const [showPlansModal, setShowPlansModal] = useState(false)
  const logedUser = useSelector((state: RootState) => {
    return state.userAuth.user
  })
  const initialLoading = useSelector((state: RootState) => {
    return state.userAuth.initialLoading
  })

  console.log('Inital loading', initialLoading)
  const dispatch = useDispatch()
  /**
   * App mounting phase
   * 1) Alerts fetching
   */

  useEffect(() => {
    store.dispatch(reAuthenticateThunk())
  }, [])

  useEffect(() => {
    console.log('--This is from app.tsx useeffect for socket')
    if(!logedUser){
      console.log('--Currently no loged user so socket wornt work--')
      disconnectSocket()
      return
    }
    console.log('--Now loged user is there so going to initialize socket--')
    const socket = initializeSocket(logedUser?._id as string)
    socket.on('message', (data) => console.log(`data from te server ${data}`))
    console.log('--what found after socket initialization--', socket)
    console.log('--listening for CONNECTION_REQUEST in socket', socket.id)

    if(socket){
      socket.on(SocketEvents.FOLLOWED, (notification: Notification) => {
        console.log('Follow event received in the frontend')
        dispatch(addLiveNotification({notification}))
        //Notify.success(`${notification?.metadata?.acted_by} started following you`)
      })

      socket.on(SocketEvents.CONNECTION_REQUEST, (notification: Notification) => {
        dispatch(addLiveNotification({notification}))
        //Notify.success(`${notification?.metadata?.acted_by} send you a connection request`)
      })
      
      socket.on(SocketEvents.CONNECTION_REQUEST_CANCELLED, (notificationId: string) => {
        dispatch(deleteNotificationFromStore({notificationId}))
      })

      socket.on(SocketEvents.CONNECTION_REQUEST_ACCEPTED, (notification: Notification) => {
        dispatch(addLiveNotification({notification}))
      })

      //Cleanups
      return () => {
        socket.off(SocketEvents.FOLLOWED)
        socket.off(SocketEvents.CONNECTION_REQUEST)
        socket.off(SocketEvents.CONNECTION_REQUEST_CANCELLED)
        socket.off(SocketEvents.CONNECTION_REQUEST_ACCEPTED)
      }
    }
  }, [logedUser, dispatch])

  // useEffect(() => {
  //   //Notify.info('Useeffect for Notification is running')
  //   if(logedUser){
  //     store.dispatch(notificationThunk())
  //   }
  // }, [logedUser, initialLoading, dispatch]) // commented for testing loop

  const location = useLocation()
  return (
        <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />

        {showPlansModal && (
          <PricingPage open={showPlansModal} onClose={() => setShowPlansModal(false)} />
        )}

        <PostProvider>
      <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Layouts />}>
          <Route index element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          } />

          <Route element={<UserProtectedRoute />}>
            
            <Route element={<CommonLayout />}>
              <Route path={UserRoutes.SOCIAL_FEED} element={<Feed />} />
              <Route path={UserRoutes.JOBS} element={<JobListing />} />
              <Route path={UserRoutes.USERS} element={<UsersFindingPage />} />
              <Route path={UserRoutes.JOB_DETAILS} element={<JObDetailsCandidateSide />} />
              <Route path={UserRoutes.JOB_APPLY} element={<JobApplyPage />} />
              <Route path={UserRoutes.NOTIFICATIONS} element={<NotificationPage />} />
              <Route path={UserRoutes.USER_DETAILS} element={<UserPublicProfile />} />
              <Route path={UserRoutes.CHATS} element={<ChatPage />} />
            </Route>
          </Route>

          <Route path='/notificatons' element={<NotificationPage />} />

          <Route path={UserRoutes.USER_PROTECTED_ROUTE} element={<UserProtectedRoute />}>
            <Route element={<ProfileLayout />}>
              <Route path={UserRoutes.MY_PROFILE_PERSONAL} index element={<ProfilePersonal />} />
              <Route path={UserRoutes.MY_PROFILE_DOCUMENTS} element={<DocumentsPage />} />
              <Route path={UserRoutes.MY_EXPERIENCES_EDUCATIONS_SKILLS} element={<ExperiencePage />} />
              <Route path='recruiter/register' element={<RecruiterRegisterPage />} />
              <Route path='recruiter/post-job' element={<PostAJobForm />} />
              <Route path='recruiter/post-a-job' element={<PostAJobForm />} />
              <Route path='recruiter/overview' element={<RecruiterProfilePage />} />
              <Route path='recruiter/my-jobs' element={<MyJobs />} />
              <Route path='recruiter/edit-job' element={<EditJobForm />} />
              <Route path='recruiter/applications/:jobId' element={<ApplicantManagePage />} />
              <Route path={UserRoutes.FAVORITE_JOBS} element={<SavedJobs />} />
              <Route path={UserRoutes.MY_APPLICATIONS} element={<MyApplications />} />
              <Route path={UserRoutes.MY_APPLICATION_TRACK} element={<ApplicationTrack />} />
              <Route path='alerts' element={<AlertsPage />} />
              <Route path='billings' element={<SubscriptionPage />} />
              <Route path='aspiro-career' element={<AspiroCareer />} />
              <Route path='aspiro-career/resume-tools' element={<ResumeToolsPage />} />
              <Route path='aspiro-career/resume-tools/auto-create' element={<AutoResumeCreationPage />} />
              <Route path='aspiro-career/resume-tools/analyze' element={<ResumeAnalyzer />} />
              <Route path='aspiro-career/resume-tools/analyze/report' element={<DetailedAnalysisReportPage />} />
              <Route path='aspiro-career/interview' element={<InterviewOverviewPage />} />
              <Route path='aspiro-career/interview/personalization' element={<InterviewPersonalizationPage />} />
              <Route path='aspiro-career/interview/mode-select' element={<InterviewModeSelectionPage />} />
              <Route path='aspiro-career/interview/start' element={<InterviewPage />} />
              <Route path='aspiro-career/interview/completed-result' element={<InterviewCompletePage />} />
              <Route path='aspiro-career/interview/dashboard' element={<InterviewDashboardPage />} />
            </Route>
          </Route>
        </Route>

        <Route path={UserRoutes.VERIFY} element={<NoAuthRoutes><VerificationPage /></NoAuthRoutes>} />
        <Route path='/forgot-password' element={<NoAuthRoutes><ForgotPasswordPage /></NoAuthRoutes>} />
        <Route path='/password-reset-link/send' element={<NoAuthRoutes><ResetLinkSendPage /></NoAuthRoutes>} />
        <Route path='/password-reset' element={<NoAuthRoutes><PasswordResetPage /></NoAuthRoutes>} />
        <Route path='/password-reset/success' element={<NoAuthRoutes><PasswordResetSuccessPage /></NoAuthRoutes>} />

        {/* Candidate specific routes not applicable header & sidebar & footer */}
        <Route path={UserRoutes.LOGIN} element={<NoAuthRoutes><UserLogin /></NoAuthRoutes>} />
        <Route path={UserRoutes.REGISTER} element={<NoAuthRoutes><UserRegister /></NoAuthRoutes>} />
        <Route path={UserRoutes.STORE_BASIC_DETAILS} element={<StoreDetails />} />
        <Route path={UserRoutes.APPLICATION_SUCCESS_PAGE} element={<ApplySuccessPage />} />
        {/* Recruiter specific routes not applicable header & sidebar & footer */}

        
        {/* Admin specific routes */}
        <Route path={AdminRoutes.ADMIN_LOGIN} element={<AdminLoginPage />} />
        <Route path='/admin' element={<AdminLayout />}>
        <Route path={AdminRoutes.ADMIN_USER_DETAILS} element={<CandidateDetails />} />
          <Route element={<AdminProtectedRoutes />}>
          <Route path={AdminRoutes.ADMIN_DASHBOARD} element={<Dashboard />} />
          <Route path={AdminRoutes.ADMIN_USERS} element={<Users />} />
          <Route path={AdminRoutes.ADMIN_RECRUITER_APPLICATIONS} element={<RecruiterApplications />} />
          <Route path={AdminRoutes.ADMIN_RECRUITER_DETAILS} element={<RecruiterDetails />} />
          <Route path='recruiter/applications/details' element={<RecruiterApplicationDetailsPage />} />
          
          
          <Route path={AdminRoutes.ADMIN_JOBS} element={<Jobs />} />
          <Route path={AdminRoutes.ADMIN_JOB_DETAILS_BY_ID} element={<JobDetails />} />
          <Route path={AdminRoutes.ADMIN_RECRUITERS_LIST} element={<Recruiters />} />
          <Route path={AdminRoutes.ADMIN_APP_CONFIG} element={<AppConfigPage />} />
          <Route path='subscription/plans/create' element={<PlanConfiguration />} />
          <Route path='subscription/plans' element={<Plans />} />
          <Route path='subscription/plans/edit/:id' element={<EditPlan />} />
          <Route path='analytics' element={<AdminAnalytics />} />
          </Route>
        </Route>

        <Route path='/recruiter/introdetails' element={<IntroDetailsPageForm />} />
        <Route path='/token/expired' element={<TokenExpiredLogoutPage />} />
        <Route path='/action/termination' element={<TerminationPage />} />
        <Route path='/payment-success' element={<PaymentSuccessPage />} />

        <Route path='/test' element={<ApplicationTrack />} />

        <Route path='*' element={<NotFoundPage />} />

      </Routes>
      </AnimatePresence>
      </PostProvider>
    </>
  );
}

export default App;