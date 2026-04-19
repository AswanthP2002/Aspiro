import { useEffect, useState } from 'react';
import { getNotifications, changeNotificationStatus, deleteNotification, markAllNotificationRead } from '../../../services/notificationServices';
import { acceptConnectionRequest, rejectConnectionRequest } from '../../../services/connectionServices';
import { updateNOtificationReadStatus } from '../../../services/userServices';
import { formatRelativeTime } from '../../../services/util/formatDate';
import claraImage from '/klara.jpg';
import leschulerImage from '/schuller.jpg';
import { PiSuitcase } from 'react-icons/pi';
import { BiCheckDouble, BiFilter, BiHeart, BiMedal, BiTrash, BiUserCheck, BiUserPlus } from 'react-icons/bi';
import { BiBell } from 'react-icons/bi';
import { BsBell, BsClock, BsThreeDotsVertical } from 'react-icons/bs';
import { Notification } from '../../../types/entityTypes';
import { FaTrash } from 'react-icons/fa';
import { MdChatBubble, MdOutlineNotifications } from 'react-icons/md';
import { FaShareNodes } from 'react-icons/fa6';
import { IoChatboxOutline, IoNotificationsOffOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllNotificationsFromStore, deleteNotificationFromStore, markAllNotificationAsRead, markAsRead, setNotifications, setNotificationsCount } from '../../../redux/notificationSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../../../components/admin/Loader';
import InfinitySpinner from '../../../components/common/InfinitySpinner';
import { toast } from 'react-toastify';

const notifications = [
  {
    _id: 'notif_001',
    type: 'POST_LIKE',
    message: 'Rahul liked your post',
    isRead: false,
    createdAt: '2026-01-21T08:30:00Z',
    metadata: {
      acted_by: 'Rahul Sharma',
      acted_user_avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      target_content: {
        type: 'post',
        preview: 'Just launched my new portfolio website today!',
      },
    },
  },
  {
    _id: 'notif_002',
    type: 'COMMENT',
    message: 'Ananya commented on your post',
    isRead: false,
    createdAt: '2026-01-21T08:40:00Z',
    metadata: {
      acted_by: 'Ananya Verma',
      acted_user_avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      target_content: {
        type: 'comment',
        preview: 'This looks amazing! Great work 👏',
      },
    },
  },
  {
    _id: 'notif_003',
    type: 'FOLLOW',
    message: 'Karthik started following you',
    isRead: true,
    createdAt: '2026-01-20T18:10:00Z',
    metadata: {
      acted_by: 'Karthik Reddy',
      acted_user_avatar: 'https://randomuser.me/api/portraits/men/61.jpg',
      target_content: null,
    },
  },
  {
    _id: 'notif_004',
    type: 'POST_MENTION',
    message: 'Meera mentioned you in a post',
    isRead: false,
    createdAt: '2026-01-20T20:15:00Z',
    metadata: {
      acted_by: 'Meera Iyer',
      acted_user_avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
      target_content: {
        type: 'post',
        preview: 'Shoutout to @aswanth for helping me debug my Node.js app!',
      },
    },
  },
  {
    _id: 'notif_005',
    type: 'COMMENT_REPLY',
    message: 'Suresh replied to your comment',
    isRead: false,
    createdAt: '2026-01-21T07:55:00Z',
    metadata: {
      acted_by: 'Suresh Kumar',
      acted_user_avatar: 'https://randomuser.me/api/portraits/men/74.jpg',
      target_content: {
        type: 'comment',
        preview: 'Thanks! That explanation really helped.',
      },
    },
  },
];


  const getClippedText = (text: string, buffer: number) => {
    if (text?.length <= buffer) return text;

    return `"${text?.slice(0, buffer)}..."`;
  };

  
interface NotificationRootState {
  notification:{
    notifications: Notification[]
    unReadNotificationsCount: number
    initialLoading: boolean
  }
}

interface NotificationsFetchResponsePayload {
  success: boolean
  message: string
  notifications: Notification[],
  unRead: number,
  hasMore: boolean
}

export default function NotificationPage() {

  const dispatcher = useDispatch()

  const [notificationsData, setNotificationsData] = useState<Notification[]>([]);
  const [isNotificationsActionMenuOpen, setIsNotificationActionMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(7)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [notificationType, setNotificationType] = 
    useState<
    'LIKE' | 
    'COMMENT' | 
    'FOLLOW' | 
    'CONNECTION_REQUEST' | 
    'CONNECTION_ACCEPTED' | 
    'COMMENT_REPLY' | 
    'SHARE' | 
    'ALL'>('ALL')
  const [notificationStatus, setNotificationStatus] = useState<'ALL' | 'READ' | 'UNREAD'>('UNREAD')
  const [offSet, setOffSet] = useState(0)

  const toggleNotificationsActionMenu = () => {
    setIsNotificationActionMenuOpen((prv) => !prv);
    if (isNotificationsActionMenuOpen) {
      setIsFilterMenuOpen(false);
    }
  };

  

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen((prv) => !prv);
    if (isFilterMenuOpen) {
      setIsNotificationActionMenuOpen(false);
    }
  };

  const notificationsFromRedux = useSelector((state: {notification: {notifications: Notification[]}}) => {
    return state.notification.notifications;
  });
  const unReadNotificationsCount = useSelector((state: {notification: {unReadNotificationsCount: number}}) => {
    return state.notification.unReadNotificationsCount
  })

  const notificationLoading = useSelector((state: NotificationRootState) => {
    return state.notification.initialLoading
  })

  const updateAllNotificationStatus = async () => {
    Swal.fire({
      icon:'question',
      title: 'Mark all notifications unread ?',
      showCancelButton: true,
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then(async (response) => {
      if(response.isConfirmed){
        try {
          const result = await markAllNotificationRead()
          if(result.success){
            dispatcher(markAllNotificationAsRead())
            toast.success(result.message)
          }
        } catch (error: unknown) {
          toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
      }else{
        return
      }
    })
  }

  const onSingleNotificationDelete = (notificationId: string) => {
    if(!notificationId) return
    dispatcher(deleteNotificationFromStore({notificationId: notificationId}))
  }

  const onSingleNotificationRead = (notificationId: string) => {
    if(!notificationId) return
    dispatcher(markAsRead({notificationId: notificationId}))
  }

  const deleteAllNotification = async (action: 'BULCK') => {
    Swal.fire({
      icon: 'warning',
      title: 'Delete all notifications ?',
      showConfirmButton: true,
      showCancelButton: true,
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then(async (response) => {
      if(response.isConfirmed){
        try {
          const result = await deleteNotification(action)
          if(result.succes){
            dispatcher(deleteAllNotificationsFromStore())
            toast.success('Notifications deleted')
          }else {
            return
          }
        } catch (error: unknown) {
          toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
      }
    })
  }

  useEffect(() => {
    async function fetchNotifications(){
      try {
        const result: NotificationsFetchResponsePayload = await getNotifications(page, limit, notificationType, notificationStatus, offSet)
        if(result.success){
          console.log('notification fetch result', result)
          setNotificationsData(result.notifications)
          dispatcher(setNotifications({notifications: result.notifications, unRead: result.unRead}))
          // dispatcher(setNotificationsCount({count: result.unRead}))
          setHasMore(result.hasMore)
        }
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong while fetching notifications')
      }
    }
    fetchNotifications()
  }, [page, notificationStatus, notificationType, offSet, dispatcher, limit])
  return (
    <div className="p-5">
      <div className="w-full mt-10 md:mt-0 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="bg-blue-500 w-10 h-10 rounded-md flex items-center justify-center">
            <BiBell color="white" size={22} />
          </div>
          <div>
            <p className="font-medium">Notifications</p>
            <p className="text-xs text-gray-500">You have {unReadNotificationsCount} new notification</p>
          </div>
        </div>
        <div></div>
      </div>
      <div className="my-6 bg-white flex items-center justify-between p-2 w-full rounded-xl border border-gray-100 shadow-sm sticky top-0 z-10">
  {/* Tab Section - Modern look with a background pill */}
  <div className="flex bg-gray-50 p-1 rounded-lg gap-1">
    <button 
      onClick={() => setNotificationStatus('UNREAD')} 
      className={`px-6 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 flex items-center gap-2 ${notificationStatus === 'UNREAD' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
    >
      Unread
      {unReadNotificationsCount > 0 && (
        <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full text-[10px]">
          {unReadNotificationsCount}
        </span>
      )}
    </button>
    <button 
      onClick={() => setNotificationStatus('ALL')} 
      className={`px-6 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${notificationStatus === 'ALL' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
    >
      All
    </button>
    
  </div>

  {/* Action Section - Using Ghost buttons and better spacing */}
  <div className="flex items-center gap-2 pr-1">
    {/* Filter Dropdown */}
    <div className="relative">
      <button
        onClick={toggleFilterMenu}
        className="text-xs font-medium text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        <BiFilter size={16} />
        Filter
      </button>

      {isFilterMenuOpen && (
        <div className="absolute right-0 top-11 w-48 bg-white rounded-xl border border-gray-100 shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
          <p className="px-4 py-1 text-[10px] uppercase tracking-wider text-gray-400 font-bold">Filter by type</p>
          <ul className="mt-1">
            {[
              { type: 'ALL', label: 'All', icon: <BiBell /> },
              { type: 'LIKE', label: 'Likes', icon: <BiHeart /> },
              { type: 'COMMENT', label: 'Comments', icon: <MdChatBubble /> },
              { type: 'CONNECTION_REQUEST', label: 'Connections', icon: <BiUserPlus /> },
              { type: 'COMMENT_REPLY', label: 'Mentions', icon: <IoChatboxOutline /> },
            ].map((item) => (
              <li 
                key={item.type}
                onClick={() => {setNotificationType(item.type); setIsFilterMenuOpen(false)}} 
                className="flex cursor-pointer items-center gap-3 px-4 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {/* More Actions Dropdown */}
    <div className="relative">
      <button
        onClick={toggleNotificationsActionMenu}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <BsThreeDotsVertical size={16} />
      </button>

      {isNotificationsActionMenuOpen && (
        <div className="absolute right-0 top-11 w-48 bg-white rounded-xl border border-gray-100 shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
          <button 
            onClick={() => {updateAllNotificationStatus(); setIsNotificationActionMenuOpen(false)}} 
            className="w-full px-4 py-2 text-xs flex items-center gap-3 text-gray-600 hover:bg-gray-50"
          >
            <BiCheckDouble size={18} className="text-blue-500" /> Mark all as read
          </button>
          <div className="my-1 border-t border-gray-50" />
          <button 
            onClick={() => deleteAllNotification('BULCK')} 
            className="w-full px-4 py-2 text-xs flex items-center gap-3 text-red-500 hover:bg-red-50"
          >
            <BiTrash size={18} /> Delete all history
          </button>
        </div>
      )}
    </div>
  </div>
</div>
      <div className="mt-5 grid grid-cols-1 gap-3">
        {notificationLoading
          ? <>
              <p className='text-xs text-center text-gray-700'>Loading...</p>
            </>
          : <>
              {notificationsFromRedux.map((notification: Notification) => (
                <NotificationCard 
                  notification={notification} 
                  onNotificationDelete={(notificationId: string) => onSingleNotificationDelete(notificationId)} 
                  onSingleNotificationRead={(notificationId: string) => onSingleNotificationRead(notificationId)}
                />
              ))}
            </>
        }
        
      </div>
      {notificationsFromRedux.length === 0 && (<div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in zoom-in duration-300">
  {/* The Icon Container */}
  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100 shadow-sm">
    <IoNotificationsOffOutline size={36} className="text-gray-300" />
  </div>

  {/* The Text Content */}
  <h3 className="text-gray-900 font-semibold text-base mb-1">
    All caught up!
  </h3>
  <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed">
    No new notifications right now. We'll let you know when something happens.
  </p>

  {/* Optional: A subtle "Action" button to keep them in the app */}
  <button 
    onClick={() => window.location.reload()} 
    className="mt-6 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
  >
    Refresh feed
  </button>
</div>)}
    </div>
  );
}

interface NotificationUpdateResponsePayload {
    success: boolean
    message: string
}

function NotificationCard({ notification, onNotificationDelete, onSingleNotificationRead }: { notification: Notification, onNotificationDelete: (id: string) => void, onSingleNotificationRead: (id: string) => void }) {
    const [isNotificationMenuOpened, setIsNotficationMenuOpened] = useState(false)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logedUser = useSelector((state: {userAuth: {user: {_id: string, name: string}}}) => {
      return state.userAuth.user
    })

    const toggleNotificationMenu = () => setIsNotficationMenuOpened(prv => !prv)

    const MarkNotificationAsRead = async (notificationId: string) => {
        if(!notificationId) return
        try {
            const result: NotificationUpdateResponsePayload = await changeNotificationStatus(notificationId)
            setIsNotficationMenuOpened(false)
            if(result.success){
                onSingleNotificationRead(notificationId)
                dispatch(markAsRead({notificationId}))
                toast.success('Notification readed')
                // dispatch(markAsRead({notificationId: notificationId}))
                return
            }
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : 'Something went wrong')   
        }
    }

    const deleteIndividualNotification = async (notificationId: string, action: 'SINGLE') => {
      if(!notificationId) return

      Swal.fire({
        icon: 'question',
        title: 'Delete this notification',
        showConfirmButton: true,
        confirmButtonText: 'Delete',
        showCancelButton: true,
        cancelButtonText: 'No',
        allowEscapeKey: false,
        allowOutsideClick: false
      }).then(async (response) => {
        if(response.isConfirmed){
          setIsNotficationMenuOpened(false)
          try {
        const result = await deleteNotification(action, notificationId)

        if(result?.success){
          //dispatch(deleteNotificationFromStore({notificationId}))
          onNotificationDelete(notificationId)
          toast.error('Deleted')
          return
        }
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : 'Somethng went wrong')
      }
        }else{
          return
        }
      })
    } 

    const redirectToTargetUrl = (url: string) => {
        if(!url){
            return
        }else{
           const path = url.replace('http://localhost:5173', '')
           navigate(path, {state: {userId: path.split('/')[1]}})
        }
    }

    const rejectAConnectionRequest = (sender: string) => {
      if(!sender) return

      Swal.fire({
        icon:'question',
        title: `Reject ${notification?.metadata?.acted_by}?`,
        showConfirmButton: true,
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then(async (response) => {
        if(response.isConfirmed){
          try {
            const result = await rejectConnectionRequest(sender)
            if(result.success){
              toast.success('Rejected')
              dispatch(deleteNotificationFromStore({notificationId: notification._id as string}))
            }
          } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : 'Somthing went wrong')
          }
        }else {
          return
        }
      })
    }

    const acceptAUserRequest = async (notificationId: string) => {
      if(!notificationId) return

      Swal.fire({
        icon: 'question',
        title: `Accept request from ${notification?.metadata?.acted_by}?`,
        showCancelButton: true,
        cancelButtonText: 'No',
        showConfirmButton: true,
        confirmButtonText: 'Accept'
      }).then(async (response) => {
        if(response.isConfirmed){
          try {
          const result = await acceptConnectionRequest(notification.actorId as string, logedUser.name, logedUser.profilePicture)
          console.log('-- checking result of connection request acceptance --', result)
          if(result.success){
            toast.success('Accepted')
            dispatch(markAsRead({notificationId}))
          }
        } catch (error: unknown) {
          toast.error(error instanceof Error ? error.message : 'Something went wrong while accepting connection request')
      }
        }else {
          return
        }
      })
    }
  
    return (
    <>
      <div className={`group bg-white rounded-md relative w-full border-b border-gray-100 last:border-0 transition-colors duration-200 ${notification.isRead ? 'bg-white' : 'bg-blue-50/40 hover:bg-blue-50'}`}>
  {/* Unread Indicator - A subtle vertical bar is cleaner than a full-width background shift */}
  {!notification.isRead && (
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
  )}

  <div className="w-full p-4 flex gap-4">
    {/* Avatar Section */}
    <div className="flex-shrink-0">
      <div className="w-12 h-12 relative">
        {notification?.actorDetails?.profilePicture ? (
          <img
            src={notification.actorDetails.profilePicture}
            className="w-full h-full rounded-full object-cover ring-2 ring-white shadow-sm"
            alt={notification.actorDetails.name}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
            <p className="text-gray-600 font-medium text-lg uppercase">{notification?.actorDetails?.name[0]}</p>
          </div>
        )}
        {/* Category Icon Badge (Optional: helps visual parsing) */}
        {!notification.isRead && (
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-600 border-2 border-white rounded-full" />
        )}
      </div>
    </div>

    {/* Content Section */}
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start gap-2">
        <div className={`flex-1 ${notification.targetUrl ? 'cursor-pointer group/text' : ''}`} onClick={() => redirectToTargetUrl(notification.targetUrl as string)}>
          {/* Main Message */}
          <p className={`text-[14px] leading-snug ${notification.isRead ? 'text-gray-600 font-normal' : 'text-gray-900 font-semibold'}`}>
            { (notification.category === 'CONNECTION_REQUEST' && notification.isRead) 
              ? <span className="text-blue-600 font-bold">{notification.metadata?.acted_by}</span> 
              : notification.message 
            }
            {notification.category === 'CONNECTION_REQUEST' && notification.isRead && " is your new connection"}
          </p>
          
          {/* Actor Headline */}
          <p className="text-[12px] text-gray-500 mt-0.5 line-clamp-1 truncate">{notification.actorDetails?.headline}</p>
        </div>

        {/* Menu Button - Only visible on hover or mobile */}
        <div className="relative">
          <button 
            onClick={toggleNotificationMenu} 
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <BsThreeDotsVertical size={16} />
          </button>
          
          {isNotificationMenuOpened && (
            <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-1 overflow-hidden">
              {!notification.isRead && (
                <button 
                  onClick={() => {MarkNotificationAsRead(notification._id as string); setIsNotficationMenuOpened(false)}} 
                  className="w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                >
                  <BiCheckDouble size={18} className="text-blue-600" /> Mark as read
                </button>
              )}
              <button 
                onClick={() => {deleteIndividualNotification(notification._id as string, 'SINGLE'); setIsNotficationMenuOpened(false)}} 
                className="w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 flex items-center gap-3 text-red-600"
              >
                <BiTrash size={18} /> Delete notification
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Metadata Preview (Comments/Likes) */}
      {['COMMENT', 'LIKE', 'COMMENT_REPLY'].includes(notification.category as string) && (
        <div className="mt-2 pl-3 border-l-2 border-gray-100 italic">
          <p className="text-[13px] text-gray-500 leading-relaxed">
            "{notification.metadata.content}"
          </p>
        </div>
      )}

      {/* Action Buttons for Requests */}
      {notification.category === 'CONNECTION_REQUEST' && !notification.isRead && (
        <div className="flex gap-2 mt-3">
          <button 
            onClick={() => acceptAUserRequest(notification._id as string)} 
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full shadow-sm transition-all"
          >
            Accept
          </button>
          <button 
            onClick={() => rejectAConnectionRequest(notification.actorId as string)} 
            className="px-4 py-1.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-xs font-semibold rounded-full transition-all"
          >
            Ignore
          </button>
        </div>
      )}

      {/* Timestamp */}
      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-gray-400">
        <BsClock size={10} />
        <span>{formatRelativeTime(notification.createdAt || new Date())}</span>
      </div>
    </div>
  </div>
</div>
    </>
  );
}