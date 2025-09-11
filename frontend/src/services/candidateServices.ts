import axios, { AxiosError } from "axios";
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance";
import Swal from "sweetalert2";
import { logout } from "../redux-toolkit/candidateAuthSlice";

//const customeCandidateLogout = useCandidateLogout()
const geocodeLocationAccessToken = import.meta.env.VITE_LOCATION_IQ_GEOCODE_REVERSE_API_ACCESSTOKEN
console.log('Access token for geocode api', import.meta.env)

export const registerCandiate = async (name: string, email: string, phone: string, username: string, password: string) => {
    try {
        const response = await axiosInstance.post('/register',
            {name, email, phone, username, password},
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

export const verify = async (email : any, otp : string) => {
    try {
        const response = await axiosInstance.post('/verify',
            {email, otp},
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

export const candidateLogout = async (dispatch : Function, navigate : Function) => {
    try {
        const response = await axiosInstance.post('/candidate/logout', null,
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        Swal.fire({
            icon:'info',
            title:'Logout Successfull',
            showConfirmButton:false,
            showCancelButton:false,
            allowOutsideClick:false,
            timer:3000
        }).then(() => { //calling to clear candidate from redux candidateAuthSlice then navigate to login
            dispatch(logout()) 
            navigate('/login')
        })

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.data){
            const {message} : any = err.response.data
            Swal.fire({
                icon:'error',
                title:'Error',
                text:message
            })
        }
    }
}

export const saveBasicDetails = async (role: string, city: string, district: string, state: string, country: string, pincode: string, summary: string) => {
    try {
        const response = await axiosInstance.post('candidate/personal/details/save',
            {role, city, district, state, country, pincode, summary},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data

    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.data){
            const {message} : any = err.response.data

            Swal.fire({
                icon:'error',
                title:'Error',
                text:message
            })
        }
        console.log('Error occured while saving basic details', )
    }
}

export const getCandidateProfileData = async () => {
    try {
        const response = await axiosInstance.get('candidate/profile/personal/datas',
            {
                sendAuthTokenCandidate:true
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

export const editCandidateProfile = async (name: string, role: string, city: string, district: string, state: string, country: string, about: string) => {
    try {
        const response = await axiosInstance.patch('/candidate/profile',
            {name, role, city, district, state, country, about},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
        
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            return err.response.data
        }

        console.log('Error occured while editing candidate data', err)
    }
}

export const getCandidateExperience = async () => {
    try {
        const response = await axiosInstance.get('/candidate/experience',
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while geting candidate experiences', err)
    }
}

export const getCandidateSkills = async () => {
    try {
        const response = await axiosInstance.get('/candidate/skills',
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while geting candidate skills', err)
    }
}

export const getCandidateEducation = async () => {
    try {
        const response = await axiosInstance.get('/candidate/education',
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while geting candidate education', err)
    }
}

export const addCandidateExperience = async (role: string, jobtype: string, location: string, locationtype: string, organization: string, ispresent: boolean, startdate: string, enddate: string) => {
    try {
        const response = await axiosInstance.post('/candidate/experience/add',
            {role, jobtype, location, locationtype, organization, ispresent, startdate, enddate},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while adding candidat experience', err)
    }
}

export const editCandidateExperience = async (experienceId: string, editableRole: string, editableJobType: string, editableOrganization: string, editableIsPresent: boolean, editableStartDate: string, editableEndDate: string, editableLocation: string, editableLocationType: string) => {
    try {
        const response = await axiosInstance.put(`/candidate/experience/edit/${experienceId}`,
            {editableRole, editableJobType, editableOrganization, editableIsPresent, editableStartDate, editableEndDate, editableLocation, editableLocationType},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while editing candidate experience', err)
    }
}

export const deleteCandidateExperience = async (expId : string) => {
    try {
        const response = await axiosInstance.delete(`/candidate/experience/${expId}`,
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while deleting experience', err)
    }
}

export const deleteCandidateSkills = async (skillId : string) => {
    try {
        const response = await axiosInstance.delete(`/candidate/skills/${skillId}`,
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        
        console.log('Error occured while deleting skills', err)
    }
}

export const addCandidateEducation = async (level : string, stream : string, organization : string, isPresent : boolean, startYear : string, endYear : string, location : string) => {
    try {
        const response = await axiosInstance.post('/candidate/education/add',
            {level, stream, organization, isPresent, startYear, endYear, location},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while adding candidate education', err)
    }
}

export const editCandidateEducation = async (educationId : string, level : string, stream : string, organization : string, isPresent : boolean, startYear : string, endYear : string, location : string) => {
    try {
        const response = await axiosInstance.put(`/candidate/education/${educationId}`,
            {level, stream, organization, isPresent, startYear:new Date(startYear), endYear, location},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while editing candidate education', err)
    }
}

export const deleteCandidateEducation = async (educationId : string) => {
    try {
        const response = await axiosInstance.delete(`/candidate/education/${educationId}`,
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while deleting education data', err)
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
                sendAuthTokenCandidate:true
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
                sendAuthTokenCandidate:true
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
                sendAuthTokenCandidate:true
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
        const response = await axiosInstance.get('/candidate/token/refresh')
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
        const response = await axiosInstance.patch('/candidate/profile/links',
            {url},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data

        console.log('Error occured while adding social media links')
    }
}

export const removeSocialLink = async (domain : string) => {
    try {
        const response = await axiosInstance.patch('/candidate/profile/links/remove',
            {domain},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data

        console.log('Error occured while deleting the social link', err)
    }
}

export const updateProfilePicture = async (formData : any, publicId : string = "") => {
    try {
        const response = await axiosInstance.patch('/candidate/profile/picture/update', formData,
            {
                params:{publicId},
                sendAuthTokenCandidate:true
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
        const response = await axiosInstance.patch(`candidate/profile/picture/remove/`,
            {cloudinaryPublicId},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthTokenCandidate:true
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
        const response = await axiosInstance.patch('/candidate/profile/coverphoto/update', formData,
            {   params:{publicId},
                sendAuthTokenCandidate:true
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
        const response = await axiosInstance.patch('/candidate/profile/coverphoto/remove', null,
            {
                params:{publicId},
                sendAuthTokenCandidate:true
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

export const getJobs = async (search : string, page : number, sort : string, filter : any, minSalary : string, maxSalary : string) => {
    try {
        const response = await axiosInstance.get('/jobs', {
            params:{
                search,
                page,
                sort,
                filter:JSON.stringify(filter),
                minSalary,
                maxSalary
            }
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while geting jobs', err)
        return err.response?.data
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
    try {
        const response = await axiosInstance.post('/post',
            formdata,
            {
                sendAuthTokenCandidate:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while creating the post', err)
    }
}



export const getPosts = async () => {
    try {
        const response = await axiosInstance.get('/post', {
            sendAuthTokenCandidate:true
        } as AxiosRequest)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const likePost = async (postId : string, creatorId : string) => {
    try {
        const response = await axiosInstance.patch(`post/like/${postId}/user/${creatorId}`, {},
            {sendAuthTokenCandidate:true} as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data
        console.log('Error occured while liking the post')
    }
}

export const unlikePost = async (postId : string) => {
    try {
        const response = await axiosInstance.patch(`/post/unlike/${postId}`, {},
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