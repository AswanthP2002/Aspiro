import { useEffect, useState } from "react"
import { getNotifications, updateNOtificationReadStatus } from "../../../services/userServices"
import { formatRelativeTime } from "../../../services/util/formatDate"
import claraImage from '/klara.jpg'
import leschulerImage from '/schuller.jpg'
import { PiSuitcase } from "react-icons/pi"
import { BiMedal } from "react-icons/bi"
import { BiBell } from "react-icons/bi"
import { BsBell, BsThreeDotsVertical } from "react-icons/bs"

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
    const dummyNotifications: DummyNotification[] = [
        {
            _id:1,
            notificationType:'user',
            title:'Clara liked your post',
            userDetails:{
                name:'Clara',
                headline:'Data Analyst',
                photo:claraImage
            },
            message:'',
            relativeTime:'2 hours ago',
            icon:null,
            status:'delivered'
        },
        {
            _id:2,
            notificationType:'user',
            title:'Schuler liked your post',
            userDetails:{
                name:'Schuler',
                headline:'Project Manager',
                photo:leschulerImage
            },
            message:'',
            relativeTime:'1 day ago',
            icon:null,
            status:'delivered'
        },
        {
            _id:3,
            notificationType:'app',
            title:'Successfully activated preimum plan',
            userDetails:{
                name:'Clara',
                headline:'Data Analyst',
                photo:claraImage
            },
            message:'',
            relativeTime:'3 weeks ago',
            icon:<BiBell />,
            status:'read'
        },
        {
            _id:4,
            notificationType:'job',
            title:'New job available : React Developer at pragati',
            userDetails:{
                name:'Avinash Sharma',
                headline:'Pragathi',
                photo:claraImage
            },
            message:'',
            relativeTime:'4 weeks ago',
            icon:<PiSuitcase />,
            status:'read'
        }
    ]

    const [notifications, setNotifications] = useState<any[]>([])

    async function updateReadStatus(id : string){
        const result = await updateNOtificationReadStatus(id)
        window.location.reload()
    }

    useEffect(() => {
        (async function () {
            const result = await getNotifications()
            if (result?.notifications) {
                setNotifications(result?.notifications)
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
                        <p className="text-xs text-gray-500">You have 3 new notifications</p>
                    </div>
                </div>
                <div></div>
            </div>
            <div className="my-3 w-full bg-gray-300 rounded-md p-1 flex gap-1 items-center">
                <button className="flex items-center gap-2 bg-white rounded-full text-xs px-2 py-1">
                    All
                    <span className="bg-orange-200 rounded-md px-2">2</span>
                </button>
                <button className="flex items-center gap-2 bg-white rounded-full text-xs px-2 py-1">
                    Unread
                    <span className="bg-orange-200 rounded-md px-2">2</span>
                </button>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3">
                {
                    dummyNotifications.map((notification: DummyNotification, index: number) => (
                        <div key={index} className={`flex gap-3 ${notification.status === 'delivered' ? 'bg-gradient-to-br from-blue-100 to-blue-200' : 'bg-white'} rounded-md`}>
                            {
                                notification.status === 'delivered' && (
                                    <div className="label w-[3px] rounded-l-md bg-gradient-to-br from-blue-500 to-indigo-600">
                                    </div>
                                )
                            }
                            <div className="content flex-1 flex  gap-3 p-2">
                                <div>
                                    {
                                        notification.notificationType === 'user' && (
                                            <img className="w-10 h-10 rounded-full" style={{objectFit:'cover'}} src={notification.userDetails?.photo} alt="" />
                                        )
                                    }
                                    {
                                        notification.notificationType === 'job' && (
                                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100">
                                                <PiSuitcase color="red" />
                                            </div>
                                        )
                                    }
                                    {
                                        notification.notificationType === 'app' && (
                                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                                                <BsBell color="blue" />
                                            </div>
                                        )
                                    }
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{notification.title}</p>
                                    <p className="text-sm font-light mt-1">{notification.userDetails?.headline}</p>
                                    <p className="text-xs text-gray-500 mt-5">{notification.relativeTime}</p>
                                </div>
                            </div>
                            <div className="action p-2">
                                <button><BsThreeDotsVertical size={14} color="gray" /></button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}