import axios, { InternalAxiosRequestConfig } from 'axios';
import Swal from 'sweetalert2';
import store from '../../redux/store';
import { tokenRefresh, updateUserMetaData } from '../../redux/userAuthSlice';
import { reAuthenticate } from '../commonServices';
import { toast } from 'react-toastify';

const baseUrl = import.meta.env.VITE_SERVER_URL

interface customeRequest extends InternalAxiosRequestConfig {
    sendCookie : boolean
    sendAuthToken : boolean
}

export type AxiosRequest = customeRequest & InternalAxiosRequestConfig

interface ReAuthenticateResult {
    accessToken: string,
    userData: any
}

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
    
    console.log('Final request before sending', customeRequest.headers)

    return customeRequest
})

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const {response} = error
        console.log('---checking response from the server --- inspect error code ---', response)
        const originalRequest = error.config

        //If refresh method failed -> user need to login again
        if(originalRequest.url.includes('/token/refresh')){
            return Promise.reject(error)
        }
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
                    const role = store.getState().userAuth.userRole
                    if(role === 'user'){
                        window.location.replace('http://localhost:5173')
                    }else{
                        window.location.replace('http://localhost:5173/admin/dashboard')
                    }
                    
                }
            })
        }
        else if(response && response.status === 406 && !window.location.href.includes('login')){
            // alert(originalRequest.url)
            // toast.warn(originalRequest.url)
            return window.location.replace(`/action/termination?message=${response.data.message}`)
       }
        else if(response && response.status === 403){
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
                const reAuthenticateResult: ReAuthenticateResult = await reAuthenticate()
                
                if (reAuthenticateResult.accessToken) {
                    //set new access token in Redux store
                    store.dispatch(tokenRefresh({userToken:reAuthenticateResult.accessToken}))
                    store.dispatch(updateUserMetaData({user: reAuthenticateResult.userData}))
                    // Update the header of the original request and retry it
                    originalRequest.headers.Authorization = `Bearer ${reAuthenticateResult.accessToken}`;
                    return axiosInstance(originalRequest); // Return the promise of the retried request
                }
            } catch (refreshError) {
                // Handle refresh token failure (e.g., redirect to login)
                return Promise.reject(refreshError);
            }   //given an auth failed flag, which is for wrong password
        }else if(response && response.status === 401 && response?.data?.errors?.code !== 'AUTH_FAILED'){
            // alert(`This one is still executing ${response.data.errors.code}`)
            // console.log('not executed')
            window.location.replace('http://localhost:5173/token/expired')
        }else if(response && response.status === 404 && !window.location.href.includes('/login')){
            console.log('--checking 404 error--', response)
            //window.location.replace('http://localhost:5173/404') //only if it is not in the login page
        }

        return Promise.reject(error)
    }
)

export default axiosInstance