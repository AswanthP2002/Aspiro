import axios, { AxiosError, AxiosProgressEvent, HttpStatusCode } from "axios";
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance";
import { Notify } from "notiflix";
import { logout } from "../redux/userAuthSlice";
import { EndPoints } from "../constants/endPoints/user.endpoints";
import { toast } from "react-toastify";
import { JobsEndpoints } from "../constants/endPoints/jobs.endpoints";

const geocodeLocationAccessToken = import.meta.env.VITE_LOCATION_IQ_GEOCODE_REVERSE_API_ACCESSTOKEN
console.log('Access token for geocode api', import.meta.env)

export const registerUser = async (name: string, email: string, phone: string, password: string) => {
    try {
        const response = await axiosInstance.post(EndPoints.REGISTER,
            {name, email, phone, password},
            {
                headers:{'Content-Type' : 'application/json'}
            } as AxiosRequest
        )
        return response.data

    } catch (error : unknown) {
        console.log('--User Register Eerror--', error instanceof Error ? error.message : error)
        const err = error as AxiosError

        if(err.response && err.response.status < 500) return err.response.data
    }
}

export const verify = async (id : string, otp : string) => {
    try {
        const response = await axiosInstance.post(EndPoints.VERIFY,
            {id, otp},
            {
                headers:{'Content-Type':'application/json'}
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
        const response = await axiosInstance.post('/v1/user/otp/resend',
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
            throw error
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

export const userLogin = async (email : string, password : string) => {
    try {
        const response = await axiosInstance.post(EndPoints.LOGIN, 
            {email, password},
            {
                headers:{'Content-Type':'application/json'}
            } as AxiosRequest
        )
    
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('-Login Error-', err.message)
        if(err.response && err.response.status < 500) return err.response.data

    }
}

export const userLogout = async (dispatch : Function, navigate : Function) => {
    try {
        const response = await axiosInstance.post('/logout', null,
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        dispatch(logout())
        //navigate('/login')

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

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
        const response = await axiosInstance.patch('/v1/user/me/store-basics',
            {headline, city, district, state, country, pincode, summary, long, lat},
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

// export const getUserExperiences = async () => {
//     try {
//         const response = await axiosInstance.get(EndPoints.GET_EXPERIENCES,
//             {
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
//         console.log('Error occured while geting candidate experiences', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// } //moved to seperate service for modularity

// export const getUserSkills = async () => {
//     try {
//         const response = await axiosInstance.get(EndPoints.GET_SKILLS,
//             {
//                 sendAuthToken:true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError

//         console.log('Error occured while geting candidate skills', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw error
//     }
// } // moved for modularity

// export const addUserSkill = async (skillType : string, skill : string, skillLevel : string) => {
//     try {
//         const response = await axiosInstance.post(EndPoints.ADD_SKILL, 
//             {skillType, skill, skillLevel},
//             {
//                 headers:{"Content-Type":'application/json'},
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
//         console.log('--error occured while adding skill--', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 401){
//             throw error
//         }
//     }
// } // moved for modularty

// export const getUserEducations = async () => {
//     try {
//         const response = await axiosInstance.get(EndPoints.GET_EDUCATIONS,
//             {
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError

//         console.log('Error occured while geting candidate education', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw error
//     }
// } mmoved for modularity

// export const addUserExperience = async (jobRole: string, jobType: string, location: string, workMode: string, organization: string, isPresent: boolean, startDate: string, endDate: string) => {
//     try {
//         const response = await axiosInstance.post(EndPoints.ADD_EXPERIENCE,
//             {jobRole, jobType, location, workMode, organization, isPresent, startDate, endDate},
//             {
//                 headers:{'Content-Type':'application/json'},
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
//         console.log('Error occured while adding candidat experience', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// } //moved to seperate service for modularity

// export const editUserExperience = async (experienceId: string, jobRole: string, jobType: string, organization: string, isPresent: boolean, startDate: string, endDate: string, location: string, workMode: string) => {
//     try {
//         const response = await axiosInstance.put(EndPoints.EDIT_EXPERIENCE(experienceId),
//             {jobRole, jobType, organization, isPresent, startDate, endDate, location, workMode},
//             {
//                 headers:{'Content-Type':'application/json'},
//                 sendAuthToken:true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
//         console.log('Error occured while editing candidate experience', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// } // moved for modularity

// export const deleteUserExperience = async (expId? : string) => {
//     try {
//         const response = await axiosInstance.delete(EndPoints.DELETE_EXPERIENCE(expId as string),
//             {
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
//         console.log('Error occured while deleting experience', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw error
//     }
// } moved for modularity

// export const deleteUserSkill = async (skillId : string) => {
//     try {
//         const response = await axiosInstance.delete(`/v1/user/me/skills/${skillId}`,
//             {
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
        
//         console.log('Error occured while deleting skills', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw error
//     }
// } moved for modularity

// export const fetchUserAlerts = async () => {
//     try {
//         const response = await axiosInstance.get('/v1/user/me/alerts',
//             {
//                 sendAuthToken: true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('-- Error occured while fetching user alerts --', err.message)

//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw error
//     }
// }

// export const addUserEducation = async (educationLevel : string, educationStream : string, institution : string, isPresent : boolean, startYear : string, endYear : string, location : string) => {
//     try {
//         const response = await axiosInstance.post(EndPoints.ADD_EDUCATION,
//             {educationLevel, educationStream, institution, isPresent, startYear, endYear, location},
//             {
//                 headers:{'Content-Type':'application/json'},
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
//         console.log('Error occured while adding candidate education', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw error
//     }
// } moved for modularity

// export const editUserEducation = async (educationId : string, educationLevel : string, educationStream : string, institution : string, isPresent : boolean, startYear : string, endYear : string, location : string) => {
//     try {
//         const response = await axiosInstance.put(EndPoints.EDIT_EDUCATION(educationId),
//             {educationLevel, educationStream, institution, isPresent, startYear:startYear, endYear, location},
//             {
//                 headers:{'Content-Type':'application/json'},
//                 sendAuthToken:true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError

//         console.log('Error occured while editing candidate education', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw error
//     }
// } moved for modularity

// export const deleteUserEducation = async (educationId? : string) => {
//     try {
//         const response = await axiosInstance.delete(EndPoints.DELETE_EDUCATION(educationId as string),
//             {
//                 sendAuthToken:true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError

//         console.log('Error occured while deleting education data', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// } moved for modularity

// export const addUserResume = async (formData : FormData) => {
//     try {
//         const response = await axiosInstance.post(EndPoints.ADD_RESUME,formData,
//             {
//                 headers: { 'Content-Type': undefined }, 
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
//         console.log('--Error occured while adding resume--', err)
//         // Return response data if available so frontend can handle the error message
//         if (err.response) return err.response.data;
//         throw error;
//     }
// } moved for modularity

// export const loadUserResumes = async () => {
//     try {
//         const response = await axiosInstance.get(EndPoints.GET_MY_RESUMES,
//             {
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError

//         console.log('Error occured while loading candidate resumes', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw error
//     }
// } moved for modularity

// export const setUserResumePrimary = async (resumeId: string) => {
//     try {
//         const response = await axiosInstance.patch(EndPoints.SET_RESUME_PRIMARY(resumeId), null,
//             {
//                 sendAuthToken: true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('--Error occured while seting resume primary--', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw error
//         }
//     }
// } moved for modualrity

// export const deleteUserResume = async (resumeId : string, cloudinaryPublicId : string) => {
//     try {
//         const response = await axiosInstance.delete(EndPoints.DELETE_RESUME(resumeId),
//             {
//                 params:{cloudinaryPublicId},
//                 sendAuthToken:true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
//         console.log('Error occured while deleting resume', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw error
//         }
//     }
// }

// export const addUserCertificate = async (formData : FormData) => {
//     try {
//         const response = await axiosInstance.post(EndPoints.ADD_CERTIFICATE, formData,
//             {
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
//         console.log('--Error occured while adding certificate--', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }

//     }
// } moved for modularity

// export const loadUserCertificates = async () => {
//     try {
//         const response = await axiosInstance.get(EndPoints.GET_MY_CERTIFICATES, 
//             {
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
//         console.log('Error occured while geting candidate certificates', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// } moved for modularity

// export const deleteUserCertificate = async (certificateId: string, cloudinaryPublicId: string) => {
//     try {
//         const response = await axiosInstance.delete(EndPoints.DELETE_CERTIFICATE(certificateId), 
//             {
//                 params:{cloudinaryPublicId},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('--Error occured while deleting certificate--', err )

//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw error
//         }
//     }
// } moved for modularity

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

        const response = await axiosInstance.post(EndPoints.APPLY_JOB_BY_JOB_ID(jobId),
            {coverLetterContent, resumeId}, 
            {
                sendAuthToken:true,
                headers:{"Content-Type":'application/json'}
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

// export const getNotifications = async (page: number, limit: number, type: string, status: string, offSet: number) => {
//     try {
//         const response = await axiosInstance.get(EndPoints.GET_NOTIFICATIONS,
//             {
//                 params:{page, limit, type, status, offSet},
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
//         console.log('Error occured while geting notifications', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) {
//             throw error
//         }  
//     }
// }

// export const getUnReadNotificationsCount = async () => {
//     try {
//         const response = await axiosInstance.get(EndPoints.GET_UNREAD_NOTIFICATIONS_COUNT,
//             {
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
//         console.log('Error occured while geting notifications', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) {
//             throw error
//         }  
//     }
// }

// export const changeNotificationStatus = async (notificationId: string) => {
//     try {
//         const response = await axiosInstance.patch(`/v1/notifications/${notificationId}`, null,
//             {
//                 sendAuthToken: true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('--Error occure dwhile changing notification status', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// }

// export const markAllNotificationRead = async () => {
//     try {
//         const response = await axiosInstance.put(EndPoints.MARK_ALL_NOTIFICATIONS_READ, null,
//             {
//                 sendAuthToken: true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('--Error occure dwhile changing notification status', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// }

// export const deleteNotification = async (action: string, notificationId?: string) => {
//     try {
//         const response = await axiosInstance.delete(EndPoints.DELETE_NOTIFICATION, 
//             {   
//                 params:{action, notificationId},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('error occured while deleeting notifigication', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// }

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
        const response = await axiosInstance.post(EndPoints.SAVE_JOB(jobId), null,
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
        const response = await axiosInstance.patch('/v1/user/me/social-links/remove',
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
        const response = await axiosInstance.patch('/v1/user/me/profile-picture', formData,
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
        const response = await axiosInstance.patch(`/v1/user/me/profile-picture/remove`,
            {cloudinaryPublicId},
            {
                headers:{'Content-Type':'application/json'},
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

export const updateCoverPhoto = async (formData : any, publicId : string = "") => {
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
        const response = await axiosInstance.patch(EndPoints.REMOVE_COVER_PHOTO, null,
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
        const response = await axios.get(`https://us1.locationiq.com/v1/search.php`,
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
        const response = await axiosInstance.patch(`/candidate/notification/${id}`, {}, {sendAuthTokenCandidate:true} as AxiosRequest)
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data
        console.log('eror ocucred while status updating', err)
    }
}

export const createPost = async (formdata : any, onProgress?: (percentage: number) => void) => {
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
        const response = await axiosInstance.patch(EndPoints.HIDE_POST(postId), null,
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
        const response = await axiosInstance.patch(EndPoints.UNHIDE_POST(postId), null,
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
        const response = await axiosInstance.patch(EndPoints.SAVE_POST(postId), null,
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
            {headers:{'Content-Type':'application/json'},
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
                headers:{'Content-Type':'application/json'}
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
                headers:{"Content-Type": "application/json"},
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
                headers:{"Content-Type": "application/json"},
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
                headers:{'Content-Type':'application/json'},
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

// export const sendConnectionRequest = async (receiverId: string, acted_by: string, acted_user_avatar: string) => {
//     try {
//         const response = await axiosInstance.post(`/v1/user/connect-request/${receiverId}`,
//             {acted_by, acted_user_avatar},
//             {
//                 headers:{'Content-Type': 'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('error occured while sednign connection request', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// }

// export const cancelConnectionRequest = async (receiverId: string) => {
//     try {
//         const response = await axiosInstance.patch(EndPoints.CANCEL_CONNECTION_REQUEST(receiverId),
//             null,
//             {
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log(err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// }

// export const rejectConnectionRequest = async (sender: string) => {
//     try {
//         const response = await axiosInstance.patch(EndPoints.REJECT_CONNECTION_REQUEST,
//             {sender},
//             {
//                 headers:{'Content-Type':'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError

//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// }

// export const acceptConnectionRequest = async (sender: string, acted_by: string, acted_user_avatar: string) => {
//     try {
//         const response = await axiosInstance.patch(EndPoints.ACCEPT_CONNECTION_REQUEST,
//             {sender, acted_by, acted_user_avatar},
//             {
//                 headers:{'Content-Type':'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError

//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// }

// export const getConversations = async () => {
//     try {
//         const response = await axiosInstance.get('/v2/conversations',
//             {sendAuthToken: true} as AxiosRequest
//         )

//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// }
export const initializeConversation = async (receiver: string) => {
    try {
        const response = await axiosInstance.post('/v1/conversation/initialize',
            {receiver},
            {   
                headers:{'Content-Type':'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}
// export const getChats = async (conversationId: string) => {
//     try {
//         const response = await axiosInstance.get(`/v1/chats/${conversationId}`,
            
//             {   
//                 sendAuthToken: true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// }

export const unfollowUser = async (userId : string, acted_by: string, acted_user_avatar: any) => {
    try {
        const response = await axiosInstance.post(EndPoints.UNFOLLOW_A_USER(userId), {
            acted_by,
            acted_user_avatar
        },
            {
                headers:{"Content-Type":'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw error
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

export const loadUserPublicProfile = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/v1/users/${userId}`,
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

// export const getSkillsSuggesion = async (search: string) => {
//     try {
//         const response = await axiosInstance.get('/admin/v1/skills', 
//             {
//                 params:{search},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('Error occured while fetching skills suggestions', err)
//         throw err
//     }
// }

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
        const response = await axiosInstance.patch(EndPoints.BLOCK_USER_BY_ID(userId), null, {
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
        const response = await axiosInstance.patch(EndPoints.UNBLOCK_USER_BY_ID(userId), null, {
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
        const response = await axiosInstance.patch(EndPoints.BAN_USER_BY_ID(userId), null,
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
        const response = await axiosInstance.get('/v1/similar-people', {
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