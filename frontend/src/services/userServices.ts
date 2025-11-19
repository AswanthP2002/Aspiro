import axios, { AxiosError, AxiosInstance } from "axios";
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance";
import Swal from "sweetalert2";
import { Notify } from "notiflix";
import { logout } from "../redux-toolkit/userAuthSlice";

//const customeCandidateLogout = useCandidateLogout()
const geocodeLocationAccessToken = import.meta.env.VITE_LOCATION_IQ_GEOCODE_REVERSE_API_ACCESSTOKEN
console.log('Access token for geocode api', import.meta.env)

export const registerCandiate = async (name: string, email: string, phone: string, password: string) => {
    try {
        const response = await axiosInstance.post('/register',
            {name, email, phone, password},
            {
                headers:{'Content-Type' : 'application/json'}
            } as AxiosRequest
        )
        console.log('backend resposne for candidate register', response)

        return response.data
    } catch (error : unknown) {
        console.log('This is normal error', error)
        const err = error as AxiosError

        if(err.response && err.response.status < 500) return err.response.data

        console.log('Error occure', err)
    }
}

export const verify = async (id : string, otp : string) => {
    try {
        const response = await axiosInstance.post('/verify',
            {id, otp},
            {
                headers:{'Content-Type':'application/json'}
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500) return err.response.data

        console.log('Error occured while verifying candidate', err)
    }
}

export const resendOtp = async (email : string, id : string) => {
    try {
        const response = await axiosInstance.post('/otp/resend',
            {email, id},
            {
                headers:{'Content-Type':'application/json'}
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        console.log('Error occured while resending otp', error)
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            return err.response.data
        }
    }
}

export const passwordResetLinkSend = async (email: string) => {
    try {
        const response = await axiosInstance.post('/reset-password/link/send', 
            {email},
            {
                headers:{'Content-Type':'application/json'}
            }
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            return err.response.data
        }
    }
}

export const resetPassword = async (token: string, password: string) => {
    try {
        const response = await axiosInstance.post('/reset-password', 
            {token, password},
            {
                headers:{'Content-Type':'application/json'}
            }
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}

export const candidateLogin = async (email : string, password : string) => {
    try {
        const response = await axiosInstance.post('/login', 
            {email, password},
            {
                headers:{'Content-Type':'application/json'}
            } as AxiosRequest
        )
    
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500) return err.response.data

        console.log('Error occured while candidate login', err)
    }
}

export const userLogout = async (dispatch : Function, navigate : Function) => {
    try {
        const response = await axiosInstance.post('/logout', null,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        Notify.info('Logout successfull, redirecting to login page', {timeout:2000})
        setTimeout(() => {
            dispatch(logout())
            navigate('/login')
        }, 2000)
        // Swal.fire({
        //     icon:'info',
        //     title:'Logout Successfull',
        //     showConfirmButton:false,
        //     showCancelButton:false,
        //     allowOutsideClick:false,
        //     timer:3000
        // }).then(() => { //calling to clear candidate from redux candidateAuthSlice then navigate to login
        //     dispatch(logout()) 
        //     navigate('/login')
        // })

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        throw error
    }
}

export const saveBasicDetails = async (headline: string, city: string, district: string, state: string, country: string, pincode: string, summary: string) => {
    try {
        const response = await axiosInstance.post('/personal/details/save',
            {headline, city, district, state, country, pincode, summary},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data

    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while saving basic details', err)
        throw(error)
    }
}

export const getCandidateProfileData = async () => {
    try {
        const response = await axiosInstance.get('/profile/personal/datas',
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) {
            return err.response.data
        }

        console.log('Error occured while geting candidate profile data', err)
    }
}

export const editUserProfile = async (name?: string, headline?: string, city?: string, district?: string, state?: string, country?: string, summary?: string, pincode? : string) => {
    try {
        const response = await axiosInstance.patch('/user/profile',
            {name, headline, city, district, state, country, summary, pincode},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
        
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
           throw error
        }

        console.log('Error occured while editing candidate data', err)
    }
}

export const getUserExperiences = async () => {
    try {
        const response = await axiosInstance.get('/experience',
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while geting candidate experiences', err)
    }
}

export const getUserSkills = async () => {
    try {
        const response = await axiosInstance.get('/skills',
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while geting candidate skills', err)
        throw error
    }
}

export const addUserSkill = async (skillType : string, skill : string, skillLevel : string) => {
    try {
        const response = await axiosInstance.post('/skills/add', 
            {skillType, skill, skillLevel},
            {
                headers:{"Content-Type":'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 401){
            console.log('Error occured while adding skill')
            return err.response.data
        }
    }
}

export const getUserEducations = async () => {
    try {
        const response = await axiosInstance.get('/education',
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while geting candidate education', err)
        throw error
    }
}

export const addUserExperience = async (jobRole: string, jobType: string, location: string, workMode: string, organization: string, isPresent: boolean, startDate: string, endDate: string) => {
    try {
        const response = await axiosInstance.post('/experience/add',
            {jobRole, jobType, location, workMode, organization, isPresent, startDate, endDate},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while adding candidat experience', err)

        throw error
    }
}

export const editUserExperience = async (experienceId: string, jobRole: string, jobType: string, organization: string, isPresent: boolean, startDate: string, endDate: string, location: string, workMode: string) => {
    try {
        const response = await axiosInstance.put(`/experience/edit/${experienceId}`,
            {jobRole, jobType, organization, isPresent, startDate, endDate, location, workMode},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while editing candidate experience', err)
    }
}

export const deleteUserExperience = async (expId? : string) => {
    try {
        const response = await axiosInstance.delete(`/experience/${expId}`,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while deleting experience', err)
    }
}

export const deleteUserSkill = async (skillId : string) => {
    try {
        const response = await axiosInstance.delete(`/skills/${skillId}`,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        
        console.log('Error occured while deleting skills', err)

        throw error
    }
}

export const addUserEducation = async (educationLevel : string, educationStream : string, institution : string, isPresent : boolean, startYear : string, endYear : string, location : string) => {
    try {
        const response = await axiosInstance.post('/education/add',
            {educationLevel, educationStream, institution, isPresent, startYear, endYear, location},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while adding candidate education', err)
        throw error
    }
}

export const editUserEducation = async (educationId : string, educationLevel : string, educationStream : string, institution : string, isPresent : boolean, startYear : string, endYear : string, location : string) => {
    try {
        const response = await axiosInstance.put(`/education/${educationId}`,
            {educationLevel, educationStream, institution, isPresent, startYear:startYear, endYear, location},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while editing candidate education', err)

        throw error
    }
}

export const deleteUserEducation = async (educationId? : string) => {
    try {
        const response = await axiosInstance.delete(`/education/${educationId}`,
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while deleting education data', err)

        throw error
    }
}

export const addCandidateResume = async (formData : any) => {
    try {
        const response = await axiosInstance.post('/candidate/resume/upload',formData,
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        console.log('Error occured while uploading candidate resume candidateServices.ts', error instanceof Error ? error.message : null)
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            return err.response.data
        }

        console.log('Error occured while adding resume', err)
    }
}

export const loadCandidateResumes = async () => {
    try {
        const response = await axiosInstance.get('/candidate/resumes',
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while loading candidate resumes', err)
    }
}

export const deleteCandidateResume = async (resumeId : string, cloudinaryPublicId : string) => {
    try {
        const response = await axiosInstance.delete(`/candidate/resume/${resumeId}`,
            {
                params:{cloudinaryPublicId},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while deleting resume', err)
    }
}

export const addCandidateCertificates = async (formData : any) => {
    try {
        const response = await axiosInstance.post('/candidate/certificate', formData,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            return err.response.data
        }

        console.log('Error occured while adding candidate certificates', err)
    }
}

export const loadCandidateCertificates = async () => {
    try {
        const response = await axiosInstance.get('/candidate/certificate', 
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while geting candidate certificates', err)
    }
}

export const refreshCandidateToken = async () => {
    try {
        const response = await axiosInstance.get('/token/refresh')
        return response.data?.accessToken
    } catch (error : unknown) {
        console.log('Error occured while refreshing the token', error)
    }
}

export const candidateApplyJob = async (jobId : string, coverLetterContent : string, resumeId : string) => {
    try {

        const response = await axiosInstance.post(`/candidate/job/${jobId}/apply`,
            {coverLetterContent, resumeId}, 
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
        
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while applying for job', err)
    }
}

export const getNotifications = async () => {
    try {
        const response = await axiosInstance.get('/candidate/notifications',
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data
        console.log('Error occured while geting candidate notifications', error)

        
    }
}

export const getCandidateFavoriteJobs = async () => {
    try {
        const response = await axiosInstance.get('/candidate/favorites',
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data

        console.log('error occured while geting candidate favorite jobs')
    }
}

export const saveJob = async (jobId : string) => {
    try {
        const response = await axiosInstance.post(`/candidate/job/${jobId}/save`, null,
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            return err.response.data
        }

        console.log('Error occured while saving the job')
    }
}

export const unsaveJob = async (jobId : string) => {
    try {
        const response = await axiosInstance.delete(`/candidate/job/${jobId}/unsave`,
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

         if(err.response && err.response.status < 500 && err.response.status !== 403){
            return err.response.data
        }
    }
}

export const getSavedJobs = async () => {
    try {
        const response = await axiosInstance.get('/candidate/job/saved',
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data

        console.log('Error occured while geting the favorite jobs', err)
    }
}

export const checkIsSaved = async (jobId : string) => {
    try {
        const response = await axiosInstance.get('/candidate/job/saved/check',
            {
                params:{jobId},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data.isSaved
    } catch (error : unknown) {
        const  err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data

        console.log('Error occured while checking if job is saved or not', err)
    }
}

export const addSocialmediaLinks = async (url : string) => {
    try {
        const response = await axiosInstance.patch('/user/profile/links',
            {url},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) {
            throw error
        }
    }
}

export const removeSocialLink = async (domain : string) => {
    try {
        const response = await axiosInstance.patch('/user/profile/links/remove',
            {domain},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) {
            throw error
        }

        console.log('Error occured while deleting the social link', err)
    }
}

export const updateProfilePicture = async (formData : any, publicId : string = "") => {
    try {
        const response = await axiosInstance.patch('/profile/picture/update', formData,
            {
                params:{publicId},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data

        console.log('error occured while updating profile picture')
    }
}

export const removeProfilePicture = async (cloudinaryPublicId : string) => {
    try {
        const response = await axiosInstance.patch(`/profile/picture/remove/`,
            {cloudinaryPublicId},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            return err.response.data
        }

        console.log('error occured', err)
    }
}

export const updateCoverPhoto = async (formData : any, publicId : string = "") => {
    try {
        const response = await axiosInstance.patch('/profile/coverphoto/update', formData,
            {   params:{publicId},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) return

        console.log('Error occured while updating coverphoto', err)
    }
}

export const removeCoverphoto = async (publicId : string) => {
    try {
        const response = await axiosInstance.patch('/profile/coverphoto/remove', null,
            {
                params:{publicId},
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data

        console.log('Error occured while removing the cover photo', err)
    }
}

export const getLocationDetails = async (lat : number, long : number) => {
    try {
        const response = await axios.get(`https://us1.locationiq.com/v1/reverse`,
            {
                params:{
                    key:geocodeLocationAccessToken,
                    lat:lat,
                    lon:long,
                    format:"json"
                }
            }
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured', err)
    }
}

export const getJobs = async (search: string, locationSearch: string, page: number, sortOption: string, status: string, workMode: string, jobLevel: string, jobType: string) => {
    try {
        const response = await axiosInstance.get('/jobs', {
            params:{
                search,
                locationSearch,
                page,
                sortOption,
                filter:JSON.stringify({status, workMode, jobLevel, jobType}),
            }
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}

export const getMyApplications = async () => {
    try {
        const response = await axiosInstance.get('/candidate/applications',
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while geting my applicatios', err)
        return err.response?.data
    }
}

export const updateNOtificationReadStatus = async (id : string) => {
    try {
        const response = await axiosInstance.patch(`/candidate/notification/${id}`, {}, {sendAuthTokenCandidate:true} as AxiosRequest)
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data
        console.log('eror ocucred while status updating', err)
    }
}

export const createPost = async (formdata : any) => {
    console.log('checking data before sending request', formdata)
    try {
        const response = await axiosInstance.post('/post',
            formdata,
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while creating the post', err)
        throw error
    }
}



export const getPosts = async () => {
    try {
        const response = await axiosInstance.get('/post', {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const likePost = async (postId : string) => {
    try {
        const response = await axiosInstance.patch(`post/like/${postId}`, {},
            {sendAuthToken:true} as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data
        
        throw error
    }
}

export const unlikePost = async (postId : string) => {
    try {
        const response = await axiosInstance.patch(`/post/unlike/${postId}`, {},
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data
        
        throw error
    }
}

export const addComment = async (postId: string, text: string) => {
    try {
        const response = await axiosInstance.post(`/post/${postId}/comment`,
            {text},
            {
                sendAuthToken:true,
                headers:{'Content-Type':'application/json'}
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('error occured while adding comment', err)
        throw error
    }
}

export const deleteComment = async (postId: string, commentId: string) => {
    try {
        const response = await axiosInstance.delete(`/post/${postId}/comment/${commentId}`,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('error occured while deleting comment', err)
        throw error
    }
}

export const followUser = async (userId : string, userType : string = 'candidate') => {
    try {
        const response = await axiosInstance.post(`/follow/${userId}`, {userType},
            {   
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data
    }
}


export const unfollowUser = async (userId : string) => {
    try {
        const response = await axiosInstance.delete(`/follow/${userId}`, 
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data
    }
}

export const getUserPosts = async () => {
    try {
        const response = await axiosInstance.get('/post/user',
            {sendAuthTokenCandidate:true} as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data
    }
}

// export const sendMessage = (receiver : string, sender : string, message : string) => {
//     try {
//         const response = await axiosInstance.post()
//     } catch (error) {
        
//     }
// }