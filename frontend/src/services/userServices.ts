import axios, { AxiosError, AxiosProgressEvent, HttpStatusCode } from "axios";
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance";
import { logout } from "../redux/userAuthSlice";
import { EndPoints } from "../constants/endPoints/user.endpoints";
import { JobsEndpoints } from "../constants/endPoints/jobs.endpoints";
import { Dispatch } from "redux";
import { NotificationEndpoints } from "../constants/endPoints/notifications.endpoints";
import { ChatEndpoints } from "../constants/endPoints/chat.endpoints";

const geocodeLocationAccessToken = import.meta.env.VITE_LOCATION_IQ_GEOCODE_REVERSE_API_ACCESSTOKEN
console.log('Access token for geocode api', import.meta.env)

export const registerUser = async (name: string, email: string, phone: string, password: string) => {
    try {
        const response = await axiosInstance.post(EndPoints.REGISTER,
            {name, email, phone, password},
            {
            } as AxiosRequest
        )
        return response.data

    } catch (error : unknown) {
        console.log('--User Register Eerror--', error instanceof Error ? error.message : error)
        const err = error as AxiosError
        console.log('Error occured while register', err)
        if(err.response && err.response.status < 500) return err.response.data
    }
}

export const verify = async (id : string, otp : string, email: string) => {
    try {
        const response = await axiosInstance.post(EndPoints.VERIFY,
            {id, otp, email},
            {
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--Verification Error', err.message)
        if(err.response && err.response.status < 500) return err.response.data

    }
}

export const resendOtp = async (email : string, id : string) => {
    try {
        const response = await axiosInstance.post(EndPoints.RESEND_OTP,
            {email, id},
            {
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        console.log('Error occured while resending otp', error)
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}

export const passwordResetLinkSend = async (email: string) => {
    try {
        const response = await axiosInstance.post(EndPoints.PASSWORD_RESET_LINK_SEND, 
            {email},
            {
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
        const response = await axiosInstance.post(EndPoints.RESET_PASSWORD, 
            {token, password},
            {
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

export const userLogin = async (email : string, password : string) => {
    try {
        const response = await axiosInstance.post(EndPoints.LOGIN, 
            {email, password},
            {
            } as AxiosRequest
        )
    
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('-Login Error-', err.message)
        if(err.response && err.response.status < 500) return err.response.data

    }
}

export const userLogout = async (dispatch : Dispatch, navigate : (path: string) => void) => {
    try {
        const response = await axiosInstance.post(EndPoints.LOGOUT, {},
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        dispatch(logout())
        console.log(navigate) //test only
        //navigate('/login')

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log(err)
        throw error
    }
}

export const saveBasicDetails = async (
    headline: string, 
    city: string, 
    district: string, 
    state: string, 
    country: string, 
    pincode: string, 
    summary: string,
    long: number,
    lat: number
) => {
    try {
        console.log('--checking lat and lon in the user services itserlf', lat, long)
        const response = await axiosInstance.patch(EndPoints.USER_ONBOARDING,
            {headline, city, district, state, country, pincode, summary, long, lat},
            {
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

export const getMyProfileData = async () => {
    try {
        const response = await axiosInstance.get(EndPoints.MY_PROFILE,
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

export const editUserProfile = async (name?: string, headline?: string, city?: string, district?: string, state?: string, country?: string, summary?: string, pincode? : string, phone?: string) => {
    try {
        const response = await axiosInstance.patch(EndPoints.EDIT_PROFILE_DETAILS,
            {name, headline, city, district, state, country, summary, pincode, phone},
            {
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

export const candidateApplyJob = async (jobId : string, coverLetterContent : string, resumeId : string) => {
    try {

        const response = await axiosInstance.post(EndPoints.APPLY_JOB_BY_JOB_ID(jobId),
            {coverLetterContent, resumeId}, 
            {
                sendAuthToken:true,
            } as AxiosRequest
        )

        return response.data
        
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while applying for job', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}

export const saveJob = async (jobId : string) => {
    try {
        const response = await axiosInstance.post(EndPoints.SAVE_JOB(jobId), {},
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--job save error ---', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}

export const unsaveJob = async (savedId : string) => {
    try {
        const response = await axiosInstance.delete(EndPoints.UNSAVE_JOB(savedId),
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--job unsave error ---', err)
         if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}

export const getSavedJobs = async (search: string, sort: string) => {
    try {
        const response = await axiosInstance.get(EndPoints.LOAD_SAVED_JOBS,
            {
                params:{search, sort},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--error occured while geting saved jobs--', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) {
            throw error
        }

        console.log('Error occured while geting the favorite jobs', err)
    }
}

export const checkIsSaved = async (jobId : string) => {
    try {
        const response = await axiosInstance.get(EndPoints.CHECK_IS_JOB_SAVED(jobId),
            {
                params:{jobId},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data.isSaved
    } catch (error : unknown) {
        const  err = error as AxiosError
        console.log('--check job saved error --', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) {
            throw error
        }
    }
}

export const checkIsJobApplied = async (jobId : string) => {
    try {
        const response = await axiosInstance.get(EndPoints.CHECK_IS_JOB_APPLIED(jobId),
            {
                params:{jobId},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const  err = error as AxiosError
        console.log('--check job saved error --', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) {
            throw error
        }
    }
}

export const addSocialmediaLinks = async (url : string) => {
    try {
        const response = await axiosInstance.patch(EndPoints.ADD_SOCIAL_MEDIA_LINKS,
            {url},
            {
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
        const response = await axiosInstance.patch(EndPoints.REMOVE_SOCIAL_LINK,
            {domain},
            {
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

export const updateProfilePicture = async (formData : FormData, publicId : string = "") => {
    try {
        const response = await axiosInstance.patch(EndPoints.UPDATE_PROFILE_PICTURE, formData,
            {
                params:{publicId},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--Proile picture update--', err.message)
        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data

    }
}

export const removeProfilePicture = async (cloudinaryPublicId : string) => {
    try {
        const response = await axiosInstance.patch(EndPoints.REMOVE_PROFILE_PICTURE,
            {cloudinaryPublicId},
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--Error occured while removing profile picture--', err.message)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            return err.response.data
        }
    }
}

export const updateCoverPhoto = async (formData : FormData, publicId : string = "") => {
    try {
        const response = await axiosInstance.patch(EndPoints.UPLOAD_COVER_PHOTO, formData,
            {   params:{publicId},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--Error occured while update cover photo--', err.message)
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw error
    }
}

export const removeCoverphoto = async (publicId : string) => {
    try {
        const response = await axiosInstance.patch(EndPoints.REMOVE_COVER_PHOTO, {},
            {
                params:{publicId},
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--Error occured while removing cover photo--', err.message)
        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data
    }
}

export const getLocationDetails = async (query: string) => {
    try {
        const response = await axios.get(EndPoints.GET_LOCATION_DETAILS_LOCATION_IQ,
            {
                params:{
                    key:geocodeLocationAccessToken,
                    q: query,
                    format:"json",
                    addressdetails: 1,
                    limit: 5
                }
            }
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured', err)
    }
}

export const getJobs = async (search: string, locationSearch: string, page: number, workMode: string, jobLevel: string, jobType: string) => {
    try {
        const response = await axiosInstance.get(JobsEndpoints.FETCH_JOBS, {
            params:{
                search,
                locationSearch,
                page,
                jobLevel,
                workMode,
                jobType
            },
            sendAuthToken: true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}

export const getMyApplications = async (search: string, sort: string, page: number, limit: number, status: string) => {
    try {
        const response = await axiosInstance.get(EndPoints.LOAD_MY_APPLICATIONS,
            {
                params:{search, sort, page, limit, status},
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--error occured while geting my applications--', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        
        }
    }
}

export const getMyInterviews = async () => {
    try {
        const response = await axiosInstance.get(EndPoints.GET_MY_INTERVIEWS,
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--error occured while geting my interviews--', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        
        }
    }
}

export const deleteMyApplication = async (applicationId: string) => {
    try {
        const response = await axiosInstance.delete(EndPoints.WITHDRAW_APPLICATION(applicationId),
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--error occured while geting my interviews--', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        
        }
    }
}

export const trackMyApplication = async (applicationId: string) => {
    try {
        const response = await axiosInstance.get(EndPoints.TRACK_MY_APPLICATION(applicationId),
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--error occured while tracking my application--', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        
        }
    }
}

export const updateNOtificationReadStatus = async (id : string) => {
    try {
        const response = await axiosInstance.patch(NotificationEndpoints.UPDATE_NOTIFICATION_READ_STATUS(id), {}, {sendAuthToken:true} as AxiosRequest)
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data
        console.log('eror ocucred while status updating', err)
    }
}

export const createPost = async (formdata : FormData, onProgress?: (percentage: number) => void) => {
    try {
        const response = await axiosInstance.post(EndPoints.CREATE_FEED_POST,
            formdata,
            {
                sendAuthToken:true,
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if(onProgress && progressEvent.total){
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        onProgress(percentCompleted)
                    }
                }
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while creating the post', err)
        throw error
    }
}

export const deletePost = async (postId: string) => {
    try {
        const response = await axiosInstance.delete(EndPoints.DELETE_POST(postId),
            {
                sendAuthToken:true,
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while creating the post', err)
        throw error
    }
}

export const hidePost = async (postId: string) => {
    try {
        const response = await axiosInstance.patch(EndPoints.HIDE_POST(postId), {},
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

export const unhidePost = async (postId: string) => {
    try {
        const response = await axiosInstance.patch(EndPoints.UNHIDE_POST(postId), {},
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

export const togglePostSave = async (postId: string) => {
    try {
        const response = await axiosInstance.patch(EndPoints.SAVE_POST(postId), {},
    {sendAuthToken: true} as AxiosRequest)

    return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('Error occured while creating the post', err)
        throw error
    }
}

export const getPosts = async (page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(EndPoints.GET_FEED_POSTS, {
            params:{page, limit},
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const likeUserPost = async (postId : string, ownerId: string, acted_by: string, acted_user_avatar: string) => {
    console.log('full data  before calling api for likeing user post', postId, ownerId, acted_by, acted_user_avatar)
    try {
        const response = await axiosInstance.patch(EndPoints.LIKE_FEED_POST(postId), {
            ownerId,
            acted_by,
            acted_user_avatar
        },
            {
            sendAuthToken:true} as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data
        
        throw error
    }
}

export const unlikeUserPost = async (postId : string) => {
    try {
        const response = await axiosInstance.patch(EndPoints.UNLIKE_FEED_POST(postId), {},
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

export const addComment = async (postId: string, text: string, parentId?: string | null) => {
    try {
        const response = await axiosInstance.post(EndPoints.COMMENT_FEED_POST(postId),
            {text, parentId},
            {
                sendAuthToken:true,
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}

export const deleteComment = async (postId: string, commentId: string) => {
    try {
        const response = await axiosInstance.delete(EndPoints.DELETE_COMMENT(postId, commentId),
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

export const likeComment = async (postId: string, commentId: string, postOwnerId: string) => {
    try {
        const response = await axiosInstance.patch(EndPoints.LIKE_COMMENT(commentId),
            {postId, postOwnerId},
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('error occured while liking comment', err)
        throw error
    }
}

export const unlikeComment = async (postId: string, commentId: string, postOwnerId: string) => {
    try {
        const response = await axiosInstance.patch(EndPoints.UNLIKE_COMMENT(commentId),
            {postId, postOwnerId},
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('error occured while liking comment', err)
        throw error
    }
}

export const followUser = async (userId : string, acted_by: string, acted_user_avatar: string) => {
    try {
        const response = await axiosInstance.post(EndPoints.FOLLOW_A_USER(userId), {
            acted_by,
            acted_user_avatar
        },
            {   
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while following a person', err.message)
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const validateToken = async (token: string) => {
    try {
        const response = await axiosInstance.post(EndPoints.VALIDATE_TOKEN, {token})
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const initializeConversation = async (receiver: string) => {
    try {
        const response = await axiosInstance.post(ChatEndpoints.INITIALIZE_CONVERSATION,
            {receiver},
            {   
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const updateUserProfileView = async (profileId: string) => {
    try {
        const response = await axiosInstance.patch(EndPoints.USER_PROFILE_VIEWED(profileId), {}, 
        {
            sendAuthToken: true
        } as AxiosRequest
    )
    return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err;
    }
}

export const unfollowUser = async (userId : string, acted_by: string, acted_user_avatar: string) => {
    try {
        const response = await axiosInstance.post(EndPoints.UNFOLLOW_A_USER(userId), {
            acted_by,
            acted_user_avatar
        },
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw error
    }
}

export const loadUserPublicProfile = async (userId: string) => {
    try {
        const response = await axiosInstance.get(EndPoints.LOAD_USER_PUBLIC_PROFILE(userId),
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}

export const loadUserMetaData = async () => {
    try {
        const response = await axiosInstance.get(EndPoints.LOAD_USER_METADATA, 
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}

export const getUsersForPublic = async (search: string, roleTypeFilter: string, experienceFilter: string, location: string, page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(EndPoints.GET_USERS, 
            {
                params:{search, roleTypeFilter, experienceFilter, location, page, limit},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('-- error occured while fetching users list for the public --', err)

        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}

export const getUsers = async (search: string, page: number, sort : string, filter : any) => {
    try {
        const response = await axiosInstance.get(EndPoints.LOAD_ALL_USERS, {
            params:{search, page, sort, filter:JSON.stringify(filter)},
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        console.log('Error occurred while getting user list', error);
        const err = error as AxiosError

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
        
    }
}

export const getUserDetails = async (userId : string) => {
    try {
        const response = await axiosInstance.get(EndPoints.LOAD_USER_DETAIL_BY_ID(userId), {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
       const err = error as AxiosError

       if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
        throw error
       }
    }
}

export const userBlock = async (userId : string) => {
    try {
        const response = await axiosInstance.patch(EndPoints.BLOCK_USER_BY_ID(userId), {}, {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < HttpStatusCode.InternalServerError  && err.response.status !== HttpStatusCode.Forbidden) throw error

        console.log('Error occured while blocking the candidate', err)
    }
}

export const userUnblock = async (userId : string) => {
    try {
        const response = await axiosInstance.patch(EndPoints.UNBLOCK_USER_BY_ID(userId), {}, {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while unblocking the candidate', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw error
        }

        
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const response = await axiosInstance.delete(EndPoints.DELETE_USER_BY_ID(userId), 
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw error
        }
    }
}

export const banUser = async (userId: string) => {
    try {
        const response = await axiosInstance.patch(EndPoints.BAN_USER_BY_ID(userId), {},
    {
        sendAuthToken: true
    } as AxiosRequest)

    return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('-Error occured while blocking user-', err)

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw error
        }
    }
}

export const similarUseers = async () => {
    try {
        const response = await axiosInstance.get(EndPoints.GET_SIMILAR_USERS, {
            sendAuthToken: true
        } as AxiosRequest)

        return response.data
    } catch (error) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const loadUserFullProfileDetails = async () => {
    try {
        const response = await axiosInstance.get(EndPoints.LOAD_USER_FULL_PROFILE_DETAILS, {
            sendAuthToken: true
        } as AxiosRequest)

        return response.data
    } catch (error) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const getInterviewResponse = async (persona: {role: string, content: string}[], isStoped: boolean) => {
    try {
    const response = await axiosInstance.post(EndPoints.START_AI_INTERVIEW, persona, {
            params:{isStoped},
            sendAuthToken: true
        } as AxiosRequest)

        return response.data
    } catch (error) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const loadInterviewDashboard = async () => {
    try {
    const response = await axiosInstance.get(EndPoints.LOAD_DASHBOARD, 
        {
            sendAuthToken: true
        } as AxiosRequest
    )

        return response.data
    } catch (error) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}