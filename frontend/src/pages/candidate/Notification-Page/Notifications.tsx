import { useEffect, useState } from 'react';
import { acceptConnectionRequest, changeNotificationStatus, deleteNotification, getNotifications, markAllNotificationRead, rejectConnectionRequest, updateNOtificationReadStatus } from '../../../services/userServices';
import { formatRelativeTime } from '../../../services/util/formatDate';
import claraImage from '/klara.jpg';
import leschulerImage from '/schuller.jpg';
import { PiSuitcase } from 'react-icons/pi';
import { BiCheckDouble, BiHeart, BiMedal, BiTrash, BiUserCheck, BiUserPlus } from 'react-icons/bi';
import { BiBell } from 'react-icons/bi';
import { BsBell, BsClock, BsThreeDotsVertical } from 'react-icons/bs';
import { Notification } from '../../../types/entityTypes';
import { Notify } from 'notiflix';
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

type DummyNotification = {
  _id: number;
  notificationType: 'user' | 'app' | 'job';
  title: string;
  userDetails?: {
    name: string;
    headline: string;
    photo: string;
  };
  message: string;
  relativeTime: string;
  icon?: any;
  status: 'delivered' | 'read';
};

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
  const [limit, setLimit] = useState(10)
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
  const [notificationStatus, setNotificationStatus] = useState<'ALL' | 'READ' | 'UNREAD'>('ALL')
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

  const notificationsFromRedux = useSelector((state: any) => {
    return state.notification.notifications;
  });
  const unReadNotificationsCount = useSelector((state: any) => {
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
            Notify.success(result.message)
          }
        } catch (error: unknown) {
          Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
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
            Notify.success('Notifications deleted')
          }else {
            return
          }
        } catch (error: unknown) {
          Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
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
          dispatcher(setNotificationsCount({count: result.unRead}))
          setHasMore(result.hasMore)
        }
      } catch (error: unknown) {
        Notify.failure(error instanceof Error ? error.message : 'Something went wrong while fetching notifications')
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
      <div className="my-5 bg-white flex p-3 w-full rounded-md border border-gray-300">
        <div className="space-x-2 flex-1">
          <button onClick={() => setNotificationStatus('ALL')} className="text-xs font-semibold bg-blue-500 text-white px-5 py-2 rounded-md">
            All
          </button>
          <button onClick={() => setNotificationStatus('UNREAD')} className="text-xs font-semibold bg-white px-5 py-2 border border-gray-200 rounded-md">
            Unread ({unReadNotificationsCount})
          </button>
        </div>
        <div className="relative flex gap-2">
          <button
            onClick={toggleFilterMenu}
            className="text-xs bg-white px-3 py-2 border border-gray-200 rounded-md flex items-center gap-2"
          >
            Filter
          </button>
          <button
            onClick={toggleNotificationsActionMenu}
            className="text-xs font-semibold bg-white px-5 py-2 border border-gray-200 rounded-md flex items-center"
          >
            <BsThreeDotsVertical color="gray" /> Action
          </button>
          {isNotificationsActionMenuOpen && (
            <>
              <div className="absolute space-y-3 border border-gray-300 shadow-sm p-3 rounded-md bg-white w-40 -bottom-18 right-0">
                <button onClick={() => {updateAllNotificationStatus(); setIsNotificationActionMenuOpen(false)}} className="text-xs flex items-center gap-2">
                  <BiCheckDouble /> Mark all as read
                </button>
                <button onClick={() => deleteAllNotification('BULCK')} className="text-xs flex items-center gap-2 text-red-500">
                  <BiTrash /> Delete All
                </button>
              </div>
            </>
          )}

          {isFilterMenuOpen && (
            <>
              <div className="absolute left-0 top-10 bg-white rounded-md border border-gray-200 shadow-sm p-3">
                <ul className="space-y-2">
                  <li onClick={() => {setNotificationType('ALL'); setIsFilterMenuOpen(false)}} className="flex cursor-pointer items-center gap-2 text-xs">
                    <BiBell />
                    <p>All</p>
                  </li>
                  <li onClick={() => {setNotificationType('LIKE'); setIsFilterMenuOpen(false)}} className="flex cursor-pointer items-center gap-2 text-xs">
                    <BiHeart />
                    <p>Likes</p>
                  </li>
                  <li onClick={() => {setNotificationType('COMMENT'); setIsFilterMenuOpen(false)}} className="flex cursor-pointer items-center gap-2 text-xs">
                    <MdChatBubble />
                    <p>Comments</p>
                  </li>
                  <li onClick={() => {setNotificationType('SHARE'); setIsFilterMenuOpen(false)}} className="flex cursor-pointer items-center gap-2 text-xs">
                    <FaShareNodes />
                    <p>Shares</p>
                  </li>
                  <li onClick={() => {setNotificationType('CONNECTION_REQUEST'); setIsFilterMenuOpen(false)}} className="flex cursor-pointer items-center gap-2 text-xs">
                    <BiUserPlus />
                    <p>Connections</p>
                  </li>
                  <li onClick={() => {setNotificationType('FOLLOW'); setIsFilterMenuOpen(false)}} className="flex cursor-pointer items-center gap-2 text-xs">
                    <BiUserCheck />
                    <p>Follows</p>
                  </li>
                  <li onClick={() => {setNotificationType('COMMENT_REPLY'); setIsFilterMenuOpen(false)}} className="flex cursor-pointer items-center gap-2 text-xs">
                    <IoChatboxOutline />
                    <p>Mentions</p>
                  </li>
                </ul>
              </div>
            </>
          )}
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
      {notificationsFromRedux.length === 0 && (<div className='flex flex-col items-center justify-center min-h-100'>
          <IoNotificationsOffOutline size={30} color='gray' />
          <p className='text-xs text-gray-500'>No notifications</p>
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
    const logedUser = useSelector((state: any) => {
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
                Notify.success('Notification readed')
                // dispatch(markAsRead({notificationId: notificationId}))
                return
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong')   
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
          Notify.success('Deleted')
          return
        }
      } catch (error: unknown) {
        Notify.failure(error instanceof Error ? error.message : 'Somethng went wrong')
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
           Notify.info(path)
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
              Notify.success('Rejected')
              dispatch(deleteNotificationFromStore({notificationId: notification._id as string}))
            }
          } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Somthing went wrong')
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
            Notify.success('Accepted')
            dispatch(markAsRead({notificationId}))
          }
        } catch (error: unknown) {
          Notify.failure(error instanceof Error ? error.message : 'Something went wrong while accepting connection request')
      }
        }else {
          return
        }
      })
    }
  
    return (
    <>
      <div className={`w-full ${notification.isRead ? 'ps-0' : 'ps-1'} bg-blue-500 rounded-md`}>
        <div
          className={`w-full ${notification.isRead ? 'bg-white' : 'bg-blue-100'} rounded-md p-3 flex gap-3 `}
        >
          <div>
            <div className="w-13 h-13 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
              {notification?.metadata?.acted_user_avatar && (
                <img
                  src={notification.metadata.acted_user_avatar}
                  className="w-full h-full rounded-full"
                  style={{ objectFit: 'cover' }}
                  alt=""
                />
              )}
              {!notification.metadata?.acted_user_avatar && (
                <p className="text-white">{notification?.metadata?.acted_by[0]}</p>
              )}
            </div>
          </div>
          <div className="flex-1 flex">
            <div  className={`${notification.targetUrl ?  'cursor-pointer' : ''} flex-1`}>
              <p onClick={() => redirectToTargetUrl(notification.targetUrl as string)} className={`text-sm ${notification.isRead ? 'text-gray-500' : 'text-black'}`}>{(notification.category === 'CONNECTION_REQUEST' && notification.isRead) ? `${notification.metadata?.acted_by} is your new connection` : notification.message}</p>
              <p className="text-xs text-gray-500">Full stack Developer</p>
              {notification.category === 'COMMENT' && (
                <i>
                  <p className="mt-2 text-xs text-gray-500">
                    {getClippedText(notification?.metadata?.target_content?.preview, 40)}
                  </p>
                </i>
              )}
              {notification.category === 'LIKE' && (
                <i>
                  <p className="mt-2 text-xs text-gray-500">
                    {getClippedText(notification?.metadata?.target_content?.preview, 40)}
                  </p>
                </i>
              )}
              {notification.category === 'COMMENT_REPLY' && (
                <i>
                  <p className="mt-2 text-xs text-gray-500">
                    {getClippedText(notification?.metadata?.target_content?.preview, 40)}
                  </p>
                </i>
              )}
              {
              (notification.category === 'CONNECTION_REQUEST' && !notification.isRead) && (
                <div className='space-x-2 mt-2'>
                  <button onClick={() => acceptAUserRequest(notification._id as string)} className='text-xs bg-gradient-to-br from-blue-500 hover:bg-gray-400 to-indigo-600 px-2 py-1 rounded-md text-white'>Accept</button>
                  <button onClick={() => rejectAConnectionRequest(notification.actorId as string)} className='text-xs bg-white px-2 py-1 rounded-md hover:bg-gray-400 border border-gray-200 text-gray-700'>Reject</button>
                </div>
              )
             }
             

             {/* stopped here, notification testing is left */}
              <span className="mt-3 text-xs flex items-center gap-2">
                <BsClock color="gray" size={10} />
                <p className="text-gray-500">{formatRelativeTime(notification.createdAt || new Date())}</p>
              </span>
             
            </div>
            <div className='relative'>
              <button onClick={toggleNotificationMenu}>
                <BsThreeDotsVertical size={13} />
              </button>
              {
                isNotificationMenuOpened && (
                    <div className="absolute right-0 w-40 bg-white rounded-md border border-gray-200 p-3">
                        <ul className='space-y-3'>
                            {
                                !notification.isRead && (
                                    <li onClick={() => {MarkNotificationAsRead(notification._id as string); setIsNotficationMenuOpened(false)}} className='text-xs cursor-pointer flex items-center gap-2'><BiCheckDouble /> Mark as read</li>
                                )
                            }
                            <li onClick={() => {deleteIndividualNotification(notification._id as string, 'SINGLE'); setIsNotficationMenuOpened(false)}} className="text-xs cursor-pointer flex items-center gap-2 text-red-500"><BiTrash /> Delete</li>
                        </ul>

                    </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}