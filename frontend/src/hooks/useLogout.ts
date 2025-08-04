import { useDispatch } from "react-redux"
import { logout } from "../redux-toolkit/candidateAuthSlice"
import { candidateLogout } from "../services/candidateServices"
import { useNavigate } from "react-router-dom"
export default function useCandidateLogout(){

    const dispatcher = useDispatch()
    const navigate = useNavigate()

    return () => candidateLogout(dispatcher, navigate)
}