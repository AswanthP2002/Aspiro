import { Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { userLogout } from "../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";
import { BsClock } from "react-icons/bs";
import { BiArrowFromLeft } from "react-icons/bi";
import { toast } from "react-toastify";

export default function TokenExpiredLogoutPage(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatcher = useDispatch()
    const navigate = useNavigate()
    
    const logedUser = useSelector((state: {userAuth: {user: {_id: string}}}) => {
        return state.userAuth.user
    })

    useEffect(() => {
        setIsModalOpen(true)

        return () => setIsModalOpen(false)
    }, [])

    

    const handleLogout = async () => {
        if(!logedUser._id){
            return navigate('/login')
        }
        setLoading(true)
        try {
            await userLogout(dispatcher, navigate)
            setLoading(false)
            
        } catch (error: unknown) {
            setLoading(false)
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
    }

    return(
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
            <div className="border border-gray-200 bg-white rounded-md shadow-lg rounded-md p-5 flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                    <BsClock size={20} color="blue" />
                </div>
                <p className="title mt-5 font-medium text-xl">Session Expired</p>
                <p className="mt-3 text-sm text-gray-700">Your session has expired, please relogin to continue</p>
                <div className="actions w-full mt-5">
                    <button onClick={handleLogout} className="bg-black text-white w-full flex items-center gap-2 justify-center py-1 rounded-md font-light">
                        Understood
                        <BiArrowFromLeft />
                    </button>
                </div>
            </div>
        </div>
        // <div className="w-full h-screen">
        //     <Modal className="flex justify-center items-center" open={isModalOpen}>
        //         <div className="bg-white shadow-lg !p-5 rounded-md max-w-md bg-white">
        //             <p className="text-center font-semibold text-xl">logout</p>
        //             <p className="text-center !mt-5 text-sm text-gray-700">Your session has expired, please relogin to continue</p>
        //             <div className="w-full actions !mt-5">
        //                 <Button onClick={handleLogout} loading={loading} variant="contained" color="info" fullWidth>OK</Button>
        //             </div>
        //         </div>
        //     </Modal>
        // </div>
    )
}