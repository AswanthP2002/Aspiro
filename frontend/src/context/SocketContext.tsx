
// import { Notify } from "notiflix";
// import React, {createContext, useEffect, useState} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { io, Socket } from "socket.io-client";
// import { setAlerts } from "../redux-toolkit/alertSlice";
// import { Alerts } from "../types/entityTypes";
// import { fetchUserAlerts } from "../services/userServices";

// const alerts = [
//   {
//     _id: 'alert_001',
//     recipientId: 'user_123',
//     priority: 'MEDIUM',
//     status: 'ACTIVE',
//     type: 'JOB_MATCH',
//     title: 'New job matches found',
//     body: '3 new jobs match your profile based on your skills and preferences.',
//     actionUrl: '/jobs/matches',
//     metaData: {
//       jobCount: 3,
//       acted_by: 'System',
//       acted_user_avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe',
//     },
//     createdAt: '2026-01-18T09:30:00Z',
//   },
//   {
//     _id: 'alert_002',
//     recipientId: 'user_123',
//     priority: 'HIGH',
//     status: 'ACTIVE',
//     type: 'APPLICATION_UPDATE',
//     title: 'Interview scheduled',
//     body: 'Your interview for Frontend Developer role has been scheduled.',
//     actionUrl: '/applications/123/interview',
//     metaData: {
//       company: 'TechNova',
//       interviewDate: '2026-01-22T11:00:00Z',
//       acted_by: 'HR Manager',
//       acted_user_avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
//     },
//     createdAt: '2026-01-17T14:10:00Z',
//   },
//   {
//     _id: 'alert_003',
//     recipientId: 'user_123',
//     priority: 'MEDIUM',
//     status: 'ACTIVE',
//     type: 'EXPIRY',
//     title: 'Saved job expiring soon',
//     body: 'A job you saved is expiring in 2 days. Apply before the deadline.',
//     actionUrl: '/jobs/saved',
//     expiresAt: '2026-01-20T23:59:59Z',
//     metaData: {
//       jobTitle: 'Backend Engineer',
//       acted_by: 'System',
//       acted_user_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
//     },
//     createdAt: '2026-01-18T07:45:00Z',
//   },
//   {
//     _id: 'alert_004',
//     recipientId: 'user_123',
//     priority: 'LOW',
//     status: 'RESOLVED',
//     type: 'APPLICATION_UPDATE',
//     title: 'Application status updated',
//     body: 'Your application status has changed to Shortlisted.',
//     actionUrl: '/applications/456',
//     metaData: {
//       status: 'Shortlisted',
//       acted_by: 'Recruitment Team',
//       acted_user_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
//     },
//     createdAt: '2026-01-16T16:20:00Z',
//   },
//   {
//     _id: 'alert_005',
//     recipientId: 'user_123',
//     priority: 'LOW',
//     status: 'RESOLVED',
//     type: 'SYSTEM_SECURITY',
//     title: 'Welcome to the platform',
//     body: 'Your account has been successfully created. Start exploring jobs now.',
//     actionUrl: '/dashboard',
//     metaData: {
//       acted_by: 'Platform Team',
//       acted_user_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
//     },
//     createdAt: '2026-01-15T08:00:00Z',
//   },
// ];

// interface AlertsFetchingResponsePayload {
//     success: boolean
//     message: string
//     result: Alerts[]
// }

// export const SocketContext = createContext<{socket: Socket | null}>({socket: null})

// export default function SocketProvider({children}: {children: React.ReactNode}){

//     const [socket, setSocket] = useState<Socket | null>(null)
//     const logedUser = useSelector((state: any) => {
//         return state.userAuth.user
//     })
//     const dispatch = useDispatch()

//     useEffect(() => {
//         if(logedUser?.id){
//             console.log('---- checking if a user exist or not ---- user exist !!!!!!!!')
//             const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000')

//             setSocket(newSocket)
//             newSocket.on('message', (data) => {
//                 Notify.success(data)
//             })


//             return () => {
//                 newSocket.close()
//             }

            
//         }
//     }, [logedUser])

//     return <SocketContext.Provider value={{socket}}>
//         {children}
//     </SocketContext.Provider>
// }