import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { CiWarning } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Notify } from "notiflix";
import { userLogout } from "../../../services/userServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

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
            await toast.promise(
                userLogout(dispatch, navigate),
                {
                    pending: 'User loging out...',
                    success: 'Logout succesful',
                    error:{
                        render(props) {
                            const data = props.data as AxiosError<{message: string}>
                            return data.message
                        },
                    }
                }
            )
            // dispatch(logout())
            // Notify.success('Logout done')
        } catch (error: unknown) {
            console.log('Error occured while logout', error instanceof Error ? error.message : 'Something went wrong')
        } finally {
            setLoading(false)
            navigate('/login')

        }
    }

    return(
        <div className="w-full bg-slate-50 min-h-screen flex items-center justify-center">
  <Modal className="flex items-center justify-center outline-none" open={true}>
    <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl border border-slate-100">
      
      <div className="flex justify-center mb-6">
        <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center">
          <CiWarning className="text-red-600" size={32} />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
          Action Denied
        </h2>
        <p className="text-slate-500 leading-relaxed px-4">
          {message || "Your account has been temporarily suspended. You won't be able to continue using this site. Please check your email for further details."}
        </p>
      </div>

      <div className="mt-8">
        <Button 
          onClick={logoutOnButtonClick} 
          variant="contained" 
          loading={loading} 
          fullWidth 
          disableElevation
          sx={{
            py: 1.5,
            borderRadius: '8px',
            backgroundColor: '#1e293b', 
            '&:hover': { backgroundColor: '#334155' },
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          Understood
        </Button>
      </div>
      
    </div>
  </Modal>
</div>
    )
}