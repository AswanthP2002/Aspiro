import { useDispatch } from "react-redux"
import useRefreshToken from "./refreshToken"
import { tokenRefresh, logout } from "../redux-toolkit/candidateAuthSlice"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export async function candidateLogout(token : string){
        //request for logout
        const dispatch = useDispatch()
        const navigator = useNavigate()

        const makeRequest = async (accessToken : string) => {
            return fetch('http://localhost:5000/candidate/logout', {
                method:'POST',
                headers:{
                    authorization:`Bearer ${accessToken}`
                },
                credentials:'include'
            })
        }

        try {
            console.log('Token before sending', token)
            let logoutResponse = await makeRequest(token)
            if(logoutResponse.status === 401){
                const refreshToken = await useRefreshToken('http://localhost:5000/candidate/token/refresh')
                dispatch(tokenRefresh({token:refreshToken}))
                logoutResponse = await makeRequest(refreshToken)
            }

            const result = await logoutResponse.json()

            if(result?.success){
                dispatch(logout())
                Swal.fire({
                    icon:'success',
                    title:'User logout successfull',
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:2000
                }).then(() => {
                    navigator('/')
                    window.location.reload()
                })
            }else{
                Swal.fire({
                    icon:'error',
                    title:'Oops!',
                    text:result.message,
                    confirmButtonText:'Home'
                }).then((result) => {
                    if(result.isConfirmed){
                        navigator('/')
                    }
                })
            }
        } catch (error : any) {
            console.log('Error occured while candidate logout', error)
            Swal.fire({
                icon:'error',
                title:'Error',
                text:error.message,
                confirmButtonText:'Home',
                showCancelButton:false
            }).then((result) => {
                if(result.isConfirmed){
                    navigator('/')
                }
            })
        }
    }
