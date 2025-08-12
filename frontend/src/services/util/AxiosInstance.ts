import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Swal from 'sweetalert2';
import store from '../../redux-toolkit/store';
import { candidateLogout, refreshCandidateToken } from '../candidateServices';
import { tokenRefresh } from '../../redux-toolkit/candidateAuthSlice';
import { refreshRecruiterToken } from '../recruiterServices';
import { recruiterTokenRefresh } from '../../redux-toolkit/recruiterAuthSlice';
import { refreshAdminToken } from '../adminServices';
import { adminTokenRefresh } from '../../redux-toolkit/adminAuthSlice';
interface customeRequest extends InternalAxiosRequestConfig {
    sendCookie : boolean
    sendAuthTokenCandidate : boolean
    sendAuthTokenRecruiter : boolean
    sendAuthTokenAdmin : boolean
}

export type AxiosRequest = customeRequest & InternalAxiosRequestConfig


const axiosInstance = axios.create({
    baseURL:'http://localhost:5000',
    withCredentials:true
});

axiosInstance.interceptors.request.use((request : InternalAxiosRequestConfig) : InternalAxiosRequestConfig<any> => {
    const customeRequest = request as AxiosRequest
    // console.log('Intercepter for request has been triggered')
    // console.log('Custome request before final request', customeRequest)
    if(customeRequest?.sendCookie){
        customeRequest.withCredentials = true
    }
    
    if(customeRequest?.sendAuthTokenCandidate){
        const token = localStorage.getItem('candidateToken')
        customeRequest.headers.Authorization = `Bearer ${token}`
    } else if(customeRequest?.sendAuthTokenRecruiter){
        const token = localStorage.getItem('recruiterToken')
        customeRequest.headers.Authorization = `Bearer ${token}`
    } else if(customeRequest?.sendAuthTokenAdmin){
        console.log('Send admin token exist')
        const token = localStorage.getItem('adminToken')
        console.log('Admin token before sending', token)
        customeRequest.headers.Authorization = `Bearer ${token}`
    }

    console.log('Final request before sending', customeRequest)

    return customeRequest
})

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const {response} = error
        const originalRequest = error.config
        if(response && response.status === 500){
            Swal.fire({
                icon:'error', 
                title:'Error', 
                text:'Internal server error, please try again after some time'
            })
        }else if(response && response.status === 406){
            Swal.fire({
                icon:'error',
                title:'Not Acceptable',
                text:'Access denied, No token provided or token malformed'
            })
        }else if(response && response.status === 403){
            Swal.fire({
                icon:'info',
                title:'Blocked',
                text:'Your account has been blocked, you will be logout shortly',
                showConfirmButton:false,
                showCancelButton:false,
                allowOutsideClick:false,
                timer:4000
            }).then(async () => {
                const dispatch = store.dispatch
                await candidateLogout(dispatch,() => {
                    window.location.replace('http://localhost:5173/login')
                })

            })
        }else if(response && response.status === 401 && !originalRequest?._retry) {//automatically retrying request after refreshing the token
            originalRequest._retry = true

            const requestUrl : string = originalRequest.url

            if(requestUrl.startsWith('/candidate')){
                const accessToken = await refreshCandidateToken()
                store.dispatch(tokenRefresh({token:accessToken}))
            }else if(requestUrl.startsWith('/recruiter')){
                const accessToken = await refreshRecruiterToken()
                store.dispatch(recruiterTokenRefresh({token:accessToken}))
            }else if(requestUrl.startsWith('/admin')){
                const accessToken = await refreshAdminToken()
                store.dispatch(adminTokenRefresh({token:accessToken}))
            }
            axiosInstance(originalRequest)

        }

        return Promise.reject(error)
    }
)

export default axiosInstance