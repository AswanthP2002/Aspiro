import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSucess } from "../../redux/candidateAuthSlice";
import Loader from "../candidate/Loader";

export default function AuthSuccess(){
    const navigator = useNavigate()
    const params = useMemo(() => {
        return new URLSearchParams(window.location.search)
    }, [])
    const dispatcher = useDispatch()

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

    }, [dispatcher, navigator, params]) //Updated dependancy due to lint error. Previously empty

    return(
        <>
            {
                loading ? <Loader /> : null
            }
        </>
    )
}