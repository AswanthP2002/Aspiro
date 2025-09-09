import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSucess } from "../../redux-toolkit/candidateAuthSlice";
import Loader from "../candidate/Loader";

export default function AuthSuccess(){
    const navigator = useNavigate()
    const params = new URLSearchParams(window.location.search)
    const dispatcher = useDispatch()

    // const [userData, setuserdata] = useState()
    const [loading, setloading] = useState(false)

    useEffect(() => {
        setloading(true)
        const token = params.get('auth')
        const id = params.get('id')
        const email = params.get('email')

        if(!token || !id || !email){
            navigator('/login')
            return
        }

       const user = {id, email}

       dispatcher(loginSucess({token:token, user:user}))
       navigator('/')

    }, [])

    return(
        <>
            {
                loading ? <Loader /> : null
            }
        </>
    )
}