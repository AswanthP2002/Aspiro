import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { CiWarning } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Notify } from "notiflix";
import { userLogout } from "../../../services/userServices";

export default function TerminationPage(){
    const [searchParams] = useSearchParams()
    const message = searchParams.get('message') || "Access Denied"
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutOnButtonClick = async () => {
        Notify.info('Logout happening')
        try {
            setLoading(true)
            await userLogout(dispatch, navigate)
            // dispatch(logout())
            // Notify.success('Logout done')
        } catch (error: unknown) {
            Notify.failure('Something went wrong')
            console.log('Error occured while logout', error instanceof Error ? error.message : 'Something went wrong')
        } finally {
            setLoading(false)
            navigate('/login')

        }
    }

    return(
        <div className="w-full bg-gradient-to-br from-blue-100 to-indigo-100 min-h-screen">
            <Modal className="flex items-center justify-center" open={true}>
                <div className="bg-white w-md p-5 rounded-md">
                    <div className="flex justify-center">
                        <div className="bg-orange-200 rounded-full w-12 h-12 flex items-center justify-center">
                            <CiWarning color="red" size={20} />
                        </div>
                    </div>
                    <p className="font-medium text-lg mt-2 text-center">{"Action Denied"}</p>
                    <p className="text-sm leading-relaxed mt-3 text-center">{message || 
                        "Your account has been temporarily suspended. You wont be able to continue using this site. Please check your email for further details."}</p>
                    <Button type="button" onClick={logoutOnButtonClick} variant="contained" loading={loading} fullWidth sx={{marginTop: '20px'}}>Ok i understood</Button>
                </div>
            </Modal>
        </div>
    )
}