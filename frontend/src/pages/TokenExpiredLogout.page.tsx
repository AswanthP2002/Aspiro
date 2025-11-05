import { Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { userLogout } from "../services/userServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";

export default function TokenExpiredLogoutPage(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatcher = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
        setIsModalOpen(true)

        return () => setIsModalOpen(false)
    }, [])

    const handleLogout = async () => {
        setLoading(true)
        try {
            await userLogout(dispatcher, navigate)
            setLoading(false)
            
        } catch (error: unknown) {
            setLoading(false)
            Notify.failure('Something went wrong, please try again later', {timeout:2000})
        }
    }

    return(
        <div className="w-full h-screen">
            <Modal className="flex justify-center items-center" open={isModalOpen}>
                <div className="bg-white shadow-lg !p-5 rounded-md max-w-md bg-white">
                    <p className="text-center font-semibold text-xl">logout</p>
                    <p className="text-center !mt-5 text-sm text-gray-700">Your session has expired, please relogin to continue</p>
                    <div className="w-full actions !mt-5">
                        <Button onClick={handleLogout} loading={loading} variant="contained" color="info" fullWidth>OK</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}