import { useEffect, useState } from "react"

export default function NotificationComponent({notifications} : any) {
    const [sampleNotifications, setSampleNotifications] = useState([
        "notification1", "notification2", "notification3"
    ])
    const [openNotification, setOpenNotification] = useState(false)

    const toggleNotification = () => setOpenNotification(prev => !prev)
    useEffect(() => {
        if(notifications){
            setSampleNotifications(notifications)
        }
    }, [notifications])
    return (
        <div className="relative">
            <div>
                <i onClick={toggleNotification} className="cursor-pointer fa-solid fa-bell"></i>
            </div>
            {
                openNotification && (
                    <div className="notifications absolute bg-white border border-gray-200 w-[300px] right-0 shadow">
                        {
                            notifications.length > 0
                                ? <>
                                    {
                                        notifications.map((notif : any, index : any) => {
                                return (
                                    <div key={index} className="w-full px-2 py-3">
                                        <p className="text-sm">{notif.title}</p>
                                        <p className="text-xs text-gray-400">{notif.message}</p>
                                    </div>
                                )
                            })
                                    }
                                </>
                                : <p className="text-center text-gray-300 text-xs !mt-3 !mb-3">No new Notifications</p>
                        }
                    </div>
                )
            }
        </div>
    )
}