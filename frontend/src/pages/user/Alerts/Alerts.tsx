import { useEffect, useState } from 'react';
import { BiBriefcase, BiCheckDouble, BiTrash } from 'react-icons/bi';
import { BsClock, BsThreeDotsVertical } from 'react-icons/bs';
import { formatRelativeTime } from '../../../services/util/formatDate';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setAlerts } from '../../../redux/alertSlice';
import { Alerts, AlertsData } from '../../../types/entityTypes';
import { fetchUserAlerts } from '../../../services/alertsServices';
import { toast } from 'react-toastify';

type AlertFetchingResponsePayload = {
  success: boolean;
  message: string
  result: AlertsData[]
}

export default function AlertsPage() {
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState<boolean>(false);
  const [alertsData, setAlertsData] = useState<AlertsData[]>([])
  // const [loading, setLoading] = useState(false)
  // const [hasMore, setHasMore] = useState(true)
  const [status, setStatus] = useState<'ALL' | 'ACTIVE' | 'RESOLVED'>('ALL')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(4)
  const toggleNotificationMenu = () => setIsNotificationMenuOpen((prv) => !prv);
  console.log(setStatus, setPage, setLimit)

  const dipsatch = useDispatch()

  const alerts = useSelector((state: {alert: {alerts: Alerts[]}}) => {
      return state.alert.alerts
  })
  const unreadCount = useSelector((state: {alert: {unReadAlertsCount: number}}) => {
    return state.alert.unReadAlertsCount
  })

  useEffect(() => {
    async function fetchAlerts(){
      // setLoading(true)
      try {
        const result: AlertFetchingResponsePayload = await fetchUserAlerts(status, page, limit)
        if(result?.success){
          toast.success('Alerts fetched')
          console.log('going to')
          dipsatch(setAlerts({alerts: result.result, unReadAlertsCount: 0}))
        }else{
          toast.warn('Can not fetch alerts now')
          dipsatch(setAlerts({alerts: [], unReadAlertsCount: 0}))
        }
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
      } finally {
        // setLoading(false)
      }
    }
    fetchAlerts()
    
  }, [status, page])

  useEffect(() => {
    if(alerts){
      setAlertsData(alerts)
    }
  }, [alerts])

  return (
    <>

      <div className="w-full min-h-screen p-5 md:-p-10 lg:px-20">
        <p className="text-xl font-semibold">Alerts ({unreadCount})</p>
        <p className="text-sm mt-2 font-light">Stay updated with opportunity alerts</p>
        <div className="my-5 bg-white flex p-3 w-full rounded-md border border-gray-300">
          <div className="space-x-2 flex-1">
            <button className="text-xs font-semibold bg-blue-500 text-white px-5 py-2 rounded-md">
              All
            </button>
            <button className="text-xs font-semibold bg-white px-5 py-2 border border-gray-200 rounded-md">
              Unread ({unreadCount})
            </button>
          </div>
          <div className="relative">
            <button
              onClick={toggleNotificationMenu}
              className="text-xs font-semibold bg-white px-5 py-2 border border-gray-200 rounded-md flex items-center"
            >
              <BsThreeDotsVertical color="gray" /> Action
            </button>
            {isNotificationMenuOpen && (
              <div className="absolute space-y-3 border border-gray-300 shadow-sm p-3 rounded-md bg-white w-40 right-0">
                <button className="text-xs flex items-center gap-2">
                  <BiCheckDouble /> Mark all as read
                </button>
                <button className="text-xs flex items-center gap-2 text-red-500">
                  <BiTrash /> Delete All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Alerts */}
        <div className="w-full grid grid-cols-1 gap-2">
          {alertsData.map((alert) => (
            <AlertsCard alert={alert} />
          ))}
        </div>
      </div>
    </>
  );
}

function AlertsCard({ alert }: { alert: Alerts }) {
    const [isAlertSingleMenuOpened, setIsAlertsingleMenuOpened] = useState<boolean>(false)
    const toggleAlertSingleMenu = () => setIsAlertsingleMenuOpened(prv => !prv)
    

  return (
    <>
      <div className="w-full ps-1 bg-blue-500 rounded-md">
        <div className={`w-full bg-white p-3 flex gap-3 `}>
          <div>
            {alert.type === 'JOB_MATCH' && (
              <div className="w-13 h-13 flex items-center justify-center rounded-full bg-blue-200">
                <BiBriefcase size={20} color="blue" />
              </div>
            )}

            {alert.type === 'EXPIRY' && (
              <div className="w-13 h-13 flex items-center justify-center rounded-full bg-red-200">
                <BsClock size={20} color="red" />
              </div>
            )}

            {alert.type === 'APPLICATION_UPDATE' && (
              <div className="w-13 h-13 flex items-center justify-center rounded-full bg-green-200">
                <FaArrowTrendUp size={20} color="green" />
              </div>
            )}

            {alert.type === 'SYSTEM_SECURITY' && (
              <div className="w-13 h-13 flex items-center justify-center rounded-full bg-gray-200">
                <MdOutlineAdminPanelSettings size={20} color="gray" />
              </div>
            )}
          </div>

          <div className="flex-1 flex">
            <div className='flex-1'>
              <div>
                <p className="font-semibold text-gray-900 text-[15px] leading-tight truncate">{alert.title}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2 leading-relaxed">{alert.body}</p>
              </div>
              <div className="mt-5">
                <p className="flex items-center text-xs text-gray-500 gap-2">
                  <BsClock size={10} color="gray" /> {formatRelativeTime(alert.createdAt as string)}
                </p>
              </div>
            </div>
            <div className='relative'>
              <button onClick={toggleAlertSingleMenu}>
                <BsThreeDotsVertical size={13} />
              </button>
              {
                isAlertSingleMenuOpened && (
                    <div className="absolute bg-white border border-slate-200 shadow-xl rounded-md right-0 w-40 ">
                        <button className='text-xs hover:bg-gray-100 flex items-center gap-2 px-3 py-3 w-full'><BiCheckDouble /> Mark as read</button>
                        <button className='text-xs hover:bg-gray-100 text-red-500 flex items-center gap-2 px-3 py-3 w-full'><BiTrash /> Delete</button>
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