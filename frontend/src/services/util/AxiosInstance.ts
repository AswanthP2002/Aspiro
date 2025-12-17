import axios, { InternalAxiosRequestConfig } from 'axios';
import Swal from 'sweetalert2';
import store from '../../redux-toolkit/store';
import { tokenRefresh } from '../../redux-toolkit/userAuthSlice';
import { refreshAccessToken } from '../commonServices';

const baseUrl = import.meta.env.VITE_SERVER_URL

interface customeRequest extends InternalAxiosRequestConfig {
    sendCookie : boolean
    sendAuthToken : boolean
    sendAuthTokenCandidate : boolean
    sendAuthTokenRecruiter : boolean
    sendAuthTokenAdmin : boolean
}

export type AxiosRequest = customeRequest & InternalAxiosRequestConfig


const axiosInstance = axios.create({
    baseURL:baseUrl,
    withCredentials:true
});

axiosInstance.interceptors.request.use((request : InternalAxiosRequestConfig) : InternalAxiosRequestConfig<any> => {
    const customeRequest = request as AxiosRequest

    if(customeRequest?.sendCookie){
        customeRequest.withCredentials = true
    }

    if(customeRequest.sendAuthToken){
        const token = store.getState().userAuth.userToken
        if (token) {
            customeRequest.headers.Authorization = `Bearer ${token}`
        }else{
            customeRequest.headers.Authorization = `Bearer ${token}`
        }
    }
    
    //legacy : no more needed since authentication is centralized now
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
        console.log('---checking response from the server --- inspect error code ---', response)
        const originalRequest = error.config
        if(response && response.status === 500){
            Swal.fire({
                icon:'error', 
                title:'Server Error', 
                text:'We encountered an unexpected issue while processing your request. This is usually a temporary problem on our side',
                showConfirmButton:true,
                confirmButtonText:'Retry',
                showCancelButton:true,
                cancelButtonText:'Home',
                allowOutsideClick:false,
                allowEscapeKey:false
            }).then((result) => {
                if(result.isConfirmed){
                    window.location.reload()
                    return
                }else{
                    window.location.replace('http://localhost:5173')
                }
            })
        }else if(response && response.status === 406){
            window.location.replace('http://localhost:5173/token/expired')
            // Swal.fire({
            //     icon:'error',
            //     title:'Not Acceptable',
            //     text:'Access denied, No token provided or token malformed'
            // })
        }else if(response && response.status === 403){
            Swal.fire({
                icon:'info',
                title:'Blocked',
                text:'Your account has been blocked, you will be logout shortly',
                showConfirmButton:false,
                showCancelButton:false,
                allowOutsideClick:false,
                timer:4000
            })//.then(async () => {
            //     const dispatch = store.dispatch
            //     await userLogout(dispatch,() => {
            //         window.location.replace('http://localhost:5173/login')
            //     })

            // })
        }else if(
            response && 
            response.status === 401 &&
            (response?.data?.errors?.code === 'ACCESS_TOKEN_EXPIRED' || response?.data?.errors?.code === 'INVALID_ACCESS_TOKEN') &&
            !originalRequest?._retry
        ) {//automatically retrying request after refreshing the token
            originalRequest._retry = true

            try {
                //get new access token
                const newAccessToken = await refreshAccessToken()
                
                if (newAccessToken) {
                    //set new access token in Redux store
                    store.dispatch(tokenRefresh({userToken:newAccessToken}))
                    // Update the header of the original request and retry it
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest); // Return the promise of the retried request
                }
            } catch (refreshError) {
                // Handle refresh token failure (e.g., redirect to login)
                return Promise.reject(refreshError);
            }
        }else if(response && response.status === 401){
            window.location.replace('http://localhost:5173/token/expired')
        }else if(response && response.status === 404){
            window.location.replace('http://localhost:5173/404')
        }

        return Promise.reject(error)
    }
)

export default axiosInstance