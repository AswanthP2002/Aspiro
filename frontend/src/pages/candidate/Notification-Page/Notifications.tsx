import { useEffect, useState } from "react"
import { getNotifications, updateNOtificationReadStatus } from "../../../services/candidateServices"

export default function NotificationPage() {
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
        <div className="px-10 py-5">
            <p className="font-semibold">Notifications({notifications?.length})</p>
            <div className="mt-10">
                {
                    notifications.map((notification: any, index: number) => {
                        return (
                            <div key={index} className="w-full border-b border-gray-300 flex items-center justify-between p-5">
                                <div className="left">
                                    <div className="flex gap-2">
                                        <i className="fa-solid fa-bell"></i>
                                        {notification.isRead === false && (<span className="bg-red-500 rounded-full absolute w-[7px] h-[7px]"></span>)}
                                        <p className="text-xs text-gray-500">{notification?.createdAt}</p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm font-semibold">{notification?.title}</p>
                                        <p className="text-xs">{notification?.description}</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <div>
                                        {
                                            notification.isRead
                                                ? <button className="text-xs !px-2" disabled={true}>Read <i className="fa-solid fa-check"></i></button>
                                                : <button onClick={() => updateReadStatus(notification._id)} className="text-xs border rounded-full !px-2">Mark as read</button>
                                        }
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}