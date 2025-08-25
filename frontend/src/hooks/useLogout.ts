import { useDispatch } from "react-redux"
import { candidateLogout } from "../services/candidateServices"
import { useNavigate } from "react-router-dom"
export default function useCandidateLogout(){

    const dispatcher = useDispatch()
    const navigate = useNavigate()

    return () => candidateLogout(dispatcher, navigate)
}