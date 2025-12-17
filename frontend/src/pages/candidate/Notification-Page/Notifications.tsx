import { useEffect, useState } from "react"
import { getNotifications, updateNOtificationReadStatus } from "../../../services/userServices"
import { formatRelativeTime } from "../../../services/util/formatDate"
import claraImage from '/klara.jpg'
import leschulerImage from '/schuller.jpg'
import { PiSuitcase } from "react-icons/pi"
import { BiMedal } from "react-icons/bi"
import { BiBell } from "react-icons/bi"
import { BsBell, BsThreeDotsVertical } from "react-icons/bs"
import { Notification } from "../../../types/entityTypes"
import { Notify } from "notiflix"
import { FaTrash } from "react-icons/fa"

type DummyNotification = {
    _id: number,
    notificationType: 'user' | 'app' | 'job',
    title: string,
    userDetails?:{
        name: string,
        headline: string,
        photo: string
    },
    message:string,
    relativeTime: string,
    icon?:any,
    status: 'delivered' | 'read'
}

export default function NotificationPage() {
    const [notificationSection, setNotificationSection] = useState<string>('all')
    const [notificationActionOpen, setNotificationActionOpen] = useState(false)


    const dummyNotifications: DummyNotification[] | any[] = [
        // {
        //     _id:1,
        //     notificationType:'user',
        //     title:'Clara liked your post',
        //     userDetails:{
        //         name:'Clara',
        //         headline:'Data Analyst',
        //         photo:claraImage
        //     },
        //     message:'',
        //     relativeTime:'2 hours ago',
        //     icon:null,
        //     status:'delivered'
        // },
        // {
        //     _id:2,
        //     notificationType:'user',
        //     title:'Schuler liked your post',
        //     userDetails:{
        //         name:'Schuler',
        //         headline:'Project Manager',
        //         photo:leschulerImage
        //     },
        //     message:'',
        //     relativeTime:'1 day ago',
        //     icon:null,
        //     status:'delivered'
        // },
        // {
        //     _id:3,
        //     notificationType:'app',
        //     title:'Successfully activated preimum plan',
        //     userDetails:{
        //         name:'Clara',
        //         headline:'Data Analyst',
        //         photo:claraImage
        //     },
        //     message:'',
        //     relativeTime:'3 weeks ago',
        //     icon:<BiBell />,
        //     status:'read'
        // },
        // {
        //     _id:4,
        //     notificationType:'job',
        //     title:'New job available : React Developer at pragati',
        //     userDetails:{
        //         name:'Avinash Sharma',
        //         headline:'Pragathi',
        //         photo:claraImage
        //     },
        //     message:'',
        //     relativeTime:'4 weeks ago',
        //     icon:<PiSuitcase />,
        //     status:'read'
        // }
    ]

    const [notifications, setNotifications] = useState<Notification[]>([])

    const all = notifications.length
    const unread = notifications.filter((notifications: Notification) => {
        return notifications.isRead === false
    }).length

    //const [notifications, setNotifications] = useState<any[]>([])

    async function updateReadStatus(id : string){
        const result = await updateNOtificationReadStatus(id)
        window.location.reload()
    }

    const showUnreadOnly = () => {
        setNotificationSection('unread')
        setNotifications(dummyNotifications.filter((notification: DummyNotification) => {
            return notification.status === 'delivered'
        }))
    }

    const showAll = () => {
        setNotificationSection('all')
        setNotifications([])
    }

    const toggleNotificationOpen = () => setNotificationActionOpen(prv => !prv)

    useEffect(() => {
        (async function () {
            try {
                const result = await getNotifications()
                console.log('---notifications raw result---', result)
                if (result?.success) {
                    console.log('---notifications---', result?.result)
                    setNotifications(result?.notifications)
                }
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:5000})
            }
        })()
    }, [])
    return (
        <div className="p-5">
            <div className="w-full mt-10 md:mt-0 flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <div className="bg-blue-500 w-10 h-10 rounded-md flex items-center justify-center">
                        <BiBell color="white" size={22} />
                    </div>
                    <div>
                        <p className="font-medium">Notifications</p>
                        <p className="text-xs text-gray-500">You have 1 new notification</p>
                    </div>
                </div>
                <div></div>
            </div>
            <div className="my-3 w-full bg-gray-300 rounded-md p-1 flex gap-1 items-center">
                <button onClick={showAll} className={`flex items-center gap-2 ${notificationSection === 'all' ? 'bg-white' : ''} rounded-full text-xs px-2 py-1`}>
                    All
                    <span className={`${notificationSection === 'all' ? 'bg-gray-200' : 'bg-red-500 text-white'} rounded-md px-2`}>{all}</span>
                </button>
                <button onClick={showUnreadOnly} className={`flex items-center gap-2 ${notificationSection === 'unread' ? 'bg-white' : ''} rounded-full text-xs px-2 py-1`}>
                    Unread
                    <span className={`${notificationSection === 'unread' ? 'bg-gray-200' : 'bg-red-500 text-white'} rounded-md px-2`}>{unread}</span>
                </button>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3">
                {/* {
                    notifications.map((notification: Notification) => (
                        <p>

                            {
                                <p className="text-xs">{JSON.stringify(notification)}</p>
                            }
                        </p>
                    ))
                } */}
                {
                    notifications.map((notification: Notification, index: number) => (
                        <div key={index} className={`${notification.isRead ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out': ''} rounded-md border border-gray-300 ${notification.isRead ? 'bg-blue-50' : 'bg-white'}`}>
                            <div className="flex gap-2">
                                {
                                    !notification.isRead && (
                                        <div className="label w-[2px] bg-blue-500"></div>
                                    )
                                }
                                <div className="p-3">
                                    {
                                        notification.type === 'USER_ACTION' && (
                                            notification?.metaData?.acted_user_avatar
                                                ? <>
                                                    <img src={notification?.metaData?.acted_user_avatar} alt="" />
                                                  </>
                                                : <>
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center rounded-full">
                                                        <p className="text-white">{notification?.metaData?.acted_by[0]}</p>
                                                    </div>
                                                  </>
                                        )
                                    }
                                    {/* {
                                        notification.notificationType === 'app' && (
                                            <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                                                <BiBell color="blue" />
                                            </div>
                                        )
                                    }
                                    {
                                        notification.notificationType === 'job' && (
                                            <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center">
                                                <PiSuitcase color="red" />
                                            </div>
                                        )
                                    } */}
                                </div>
                                <div className="flex-1 py-3">
                                    <p className={`text-xs ${notification.isRead ? 'font-light' : 'font-medium'}`}>{notification.message}</p>
                                    <p className="mt-1 text-xs text-gray-700">{notification?.metaData?.acted_by}</p>
                                    <p className="text-xs text-gray-500 mt-3 font-light">{formatRelativeTime(notification.createdAt)}</p>
                                </div>
                                <div className="p-3 relative">
                                    <button onClick={toggleNotificationOpen}>
                                        <BsThreeDotsVertical color="gray" size={13} />
                                    </button>
                                    {
                                        notificationActionOpen && (
                                            <div className="absolute bg-white shadow-lg w-30 border border-gray-300 rounded-md px-2 py-2 space-y-2 right-2">
                                                <button className="flex items-center text-xs text-gray-500 justify-center gap-2 w-full py-1">Mark as read</button>
                                                <button className="flex items-center text-xs text-gray-500 justify-center gap-2 w-full py-1 text-red-500"><FaTrash /> Delete</button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    notifications.length === 0 && (
                        <>
                        <p className="text-xs text-gray-500 text-center">No notifications found</p>
                        <div className="w-full flex items-center justify-center">
                            <BsBell color="gray" size={12} />
                        </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}