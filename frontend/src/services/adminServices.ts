import { AxiosError, AxiosInterceptorManager, AxiosInterceptorOptions } from "axios"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import Swal from "sweetalert2"
import { Notify } from "notiflix"
import { logout } from "../redux/userAuthSlice"
import { AdminEndPoints } from "../constants/endPoints/admin.endpoints"


export const adminLogin = async (email : string, password : string) => {
    try {
        const result = await axiosInstance.post(AdminEndPoints.ADMIN_LOGIN, 
            {email, password},
            { 
                headers:{'Content-Type':'application/json'}
            } as AxiosRequest
        )
        return result.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500){
            return err.response.data
        }

        console.log(error)
    }
}

export const logoutAdmin = async (dispatch: Function, navigate: Function) => {
    try {
        const result = await axiosInstance.post('/admin/logout', null, {
            sendCookie:true,
            sendAuthToken:true
        } as AxiosRequest)

        Notify.info(result?.data?.message, {timeout:1500})

        setTimeout(() => {
            dispatch(logout())
            navigate('/admin/login')
        }, 1500);
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--error--', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) {
            throw err
        }
    }
}

export const getJobs = async (search: string, page: number, limit: number, statusFilter: string, jobTypeFilter: string, reportsCount: number) => {
    try {
        const response = await axiosInstance.get(AdminEndPoints.ADMIN_JOBS_LOAD_ALL_JOBS, {
            params: {search, page, limit, statusFilter, jobTypeFilter, reportsCount},
            sendAuthToken: true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log(err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const getJobDetails = async (jobId : string) => {
    try {
        const response = await axiosInstance.get(AdminEndPoints.ADMIN_JOB_DETAILS_BY_ID(jobId), {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log(err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err

        console.log('Error occured while geting job details', err)
    }
}

// export const blockJobUnblockJob = async (jobId : string, operation : string) => {
//     let url: string = ''
//         url = operation === 'Block'
//             ? `/admin/job/block/${jobId}`
//             : `/admin/job/unblock/${jobId}`
        
//         try {
//             const response = await axiosInstance.put(url, null, {
//                 sendAuthTokenAdmin:true
//             } as AxiosRequest)

//             return response.data
//         } catch (error : unknown) {
//             const err = error as AxiosError
//             if(err.response && err.response.data){
//                 const {message} : any = err.response.data

//                 Swal.fire({
//                     icon:'error',
//                     title:'Error',
//                     text:message
//                 })
//             }

//             console.log('Error occured while blocking / unblocking job', err)

//         }
// }

// export const rejectJobUnrejectJob = async (jobId : string, operation : string) => {
//     let url: string = ''
//         url = operation === 'Reject'
//             ? `/admin/job/reject/${jobId}`
//             : `/admin/job/unreject/${jobId}`

//     try {
//         const response = await axiosInstance.put(url, null, {
//             sendAuthTokenAdmin:true
//         } as AxiosRequest)

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError

//         if(err.response && err.response.data){
//             const {message} : any = err.response.data

//             Swal.fire({
//                 icon:'error',
//                 title:'Error',
//                 text:message
//             })
//         }
//     }
// }

// export const getRecruiters = async (search: string, page: number, sort : string, recruiterType: string, recruiterStatus: string) => {
//     try {
//         const response = await axiosInstance.get(AdminEndPoints.ADMIN_LOAD_RECRUITERS, {
//             params:{search, page, sort, recruiterType, recruiterStatus},
//             sendAuthToken:true
//         } as AxiosRequest)

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
//         console.log('Error occured while geting company details', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// } moved for modularity


// export const getRecruiterDetails = async (recruiterId: string) => {
//     try {
//         const response = await axiosInstance.get(AdminEndPoints.ADMIN_RECRUITER_DETAILS(recruiterId), {
//             sendAuthToken:true
//         } as AxiosRequest)

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError
//         console.log('Error occured while geting company details', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// } moved for modularity

// export const getCompanyDetails = async (companyId : string) => {
//     try {
//         const response = await axiosInstance.get(`/admin/company/details/${companyId}`, {
//             sendAuthTokenAdmin:true
//         } as AxiosRequest)

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError

//         if(err.response && err.response.data){
//             const {message} : any = err.response.data
//             Swal.fire({
//                 icon:'error',
//                 title:'Error',
//                 text:message
//             })
//         }

//         console.log('Error occured while geting company details')
//     }
// }



export const blockCompanyUnblockCompany = async (companyId : string, operation : string) => {
    let url: string = ''
    url = operation === 'Block'
        ? `/admin/recruiter/block/${companyId}`
        : `/admin/recruiter/unblock/${companyId}`

    try {
        const response = await axiosInstance.patch(url, null, {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while blocking / unblocking the company', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const deleteCompany = async (companyId : string) => { //delete / close company should also delete company jobs
    try {
        const response = await axiosInstance.delete(`/admin/recruiter/close/${companyId}`, {
            sendAuthToken:true
        } as AxiosRequest)

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

         console.log('Error occured while closing the company data', err)
         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const deleteRecruiterData = async (recruiterId: string) => {
    try {
        const response = await axiosInstance.delete(AdminEndPoints.ADMIN_DELETE_RECRUITER(recruiterId),
        {sendAuthToken: true} as AxiosRequest
        )

        return response.data
    } catch (error) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

// export const getUsers = async (search: string, page: number, sort : string, filter : any) => {
//     try {
//         const response = await axiosInstance.get(AdminEndPoints.LOAD_USERS, {
//             params:{search, page, sort, filter:JSON.stringify(filter)},
//             sendAuthToken:true
//         } as AxiosRequest)

//         return response.data
//     } catch (error : unknown) {
//         // Log the error for debugging purposes
//         console.log('Error occurred while getting user list', error);
//         // Re-throw the error to be handled by the calling function's catch block
//         // or the global Axios error interceptor.
//         throw error;
//     }
// } // moved for modularity

// export const getUserDetails = async (userId : any) => {
//     try {
//         const response = await axiosInstance.get(AdminEndPoints.LOAD_USER_DETAILS(userId), {
//             sendAuthToken:true
//         } as AxiosRequest)

//         return response.data
//     } catch (error : unknown) {
//        const err = error as AxiosError

//        if(err.response && err.response.status < 500 && err.response.status !== 403){
//         throw error
//        }
//     }
// } moved for modularity

// export const userBlock = async (userId : string) => {
//     try {
//         const response = await axiosInstance.patch(AdminEndPoints.BLOCK_USER(userId), null, {
//             sendAuthToken:true
//         } as AxiosRequest)

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError

//         if(err.response && err.response.status < 500  && err.response.status !== 403) throw error

//         console.log('Error occured while blocking the candidate', err)
//     }
// } moved for modularity

// export const handleRecruiterVerification = async (recrutierId: string, action: "Verified" | "Revoked") => {
//     try {
//         const response = await axiosInstance.patch(AdminEndPoints.ADMIN_REVOKE_RECRUITER_VERIFICATION(recrutierId), null, {
//             params:{action},
//             sendAuthToken:true
//         } as AxiosRequest)

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError

//         if(err.response && err.response.status < 500  && err.response.status !== 403) throw error

//         console.log('Error occured while blocking the candidate', err)
//     }
// } // moved for modularity

// export const handleRecruiterPermissions = async (recrutierId: string, action: "Revoke" | "Un-Revoke") => {
//     try {
//         const response = await axiosInstance.patch(AdminEndPoints.ADMIN_REVOKE_RECRUITER_PERMISSIONS(recrutierId), null, {
//             params:{action},
//             sendAuthToken:true
//         } as AxiosRequest)

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError

//         if(err.response && err.response.status < 500  && err.response.status !== 403) throw error

//         console.log('Error occured while blocking the candidate', err)
//     }
// }


// export const userUnblock = async (userId : string) => {
//     try {
//         const response = await axiosInstance.patch(AdminEndPoints.UNBLOCK_USER(userId), null, {
//             sendAuthToken:true
//         } as AxiosRequest)

//         return response.data
//     } catch (error : unknown) {
//         const err = error as AxiosError

//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw error
//         }

//         console.log('Error occured while unblocking the candidate', err)
//     }
// } moved for modularity
// export const banUser = async (userId: string) => {
//     try {
//         const response = await axiosInstance.patch(AdminEndPoints.BAN_USER(userId), null,
//     {
//         sendAuthToken: true
//     } as AxiosRequest)

//     return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('-Error occured while blocking user-', err)

//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw error
//         }
//     }
// }

// export const deleteUser = async (userId: string) => {
//     try {
//         const response = await axiosInstance.delete(AdminEndPoints.DELETE_USER(userId), 
//             {
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError

//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw error
//         }
//     }
// } moved for modularity

export const requestReset = async (email: string) => {
    try {
        const response = await axiosInstance.post(AdminEndPoints.REQUEST_PASSWORD_RESET, 
            {email},
            {
                headers:{"Content-Type": "application/json"},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('Error occured while ereseting user password', err)

        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const resetUserPassword = async (code: string, token: string, userId: string, userEmail: string) => {
    try {
        const response = await axiosInstance.patch(AdminEndPoints.RESET_USER_PASSWORD, 
            {code,token, userId, userEmail},
            {
                headers:{"Content-Type": "application/json"},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('Error occured while ereseting user password', err)

        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}

export const refreshAdminToken = async () => {
    try {
        const response = await axiosInstance.get('/admin/token/refresh')
        return response.data?.accessToken
    } catch (error : unknown) {
        console.log('Error occured while refreshing admin access token', error)
    }
}

// export const loadRecruiterApplications = async (page: number, limit: number) => {
//     try {
//         const response = await axiosInstance.get(AdminEndPoints.LOAD_RECRUITER_APPLICATIONS, {
//             params:{page, limit},
//             sendAuthToken:true
//         } as AxiosRequest

//         )

//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('--error occured--', error)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw error
//         }
//     }
// } moved for modularity

export const loadRecruiterAppicationDetails = async (applicationId: string) => {
    try {
        const response = await axiosInstance.get(AdminEndPoints.LOAD_RECRUITER_APPLICATION_DETAILS(applicationId), {
            sendAuthToken:true
        } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw error
        }
    }
}

// export const rejectRecruiterApplication = async (recruiterId: string, reason: string, feedback? : string) => {
//     try {
//         const response = await axiosInstance.patch(AdminEndPoints.REJECT_RECRUITER_APPLICATION(recruiterId), 
//             {reason, feedback},
//             {
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('--error occured--', error)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw error
//         }
//     }
// } moved for modularity

// export const approveRecruiterApplication = async (recruiterId: string) => {
//     try {
//         const response = await axiosInstance.patch(AdminEndPoints.APPROVE_RECRUITER_APPLICATION(recruiterId), {},
//             {
//                 sendAuthToken:true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('--error occured--', error)

//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw error
//         }
//     }
// } moved for modularity

// export const changeStatusToUnderReview = async (applicationId: string) => {
//     try {
//         const response = await axiosInstance.patch(AdminEndPoints.ADMIN_RECRUITER_APPLICATION_STATUS_UNDER_REVIEW(applicationId), null,
//         {
//             sendAuthToken: true
//         } as AxiosRequest
//     )
//     return response.data
//     } catch (error) {
//         const err = error as AxiosError
//         console.log('--Error occured--', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// }

// export const adminAddSkill = async (skills: string) => {
//     try {
//         const response = await axiosInstance.post(AdminEndPoints.ADMIN_ADD_SKILL,
//             {skills},
//             {
//                 headers:{"Content-Type":'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('--error occured--', error)

//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

// export const adminUpdateSkill = async (skillId: string, skills: string, isVerified: boolean) => {
//     try {
//         const response = await axiosInstance.patch(AdminEndPoints.ADMIN_UPDATE_SKILL(skillId),
//             {skills, isVerified},
//             {
//                 headers:{"Content-Type":'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('--error occured--', error)

//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

// export const adminGetSkills = async (search: string, limit?: number, page?: number) => {
//     try {
//         const response = await axiosInstance.get(AdminEndPoints.ADMIN_GET_SKILLS,
//             {
//                 params:{search, limit, page},
//                 headers:{"Content-Type":'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('--error occured--', error)

//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

// export const adminDeleteSkills = async (skillId: string) => {
//     try {
//         const response = await axiosInstance.delete(AdminEndPoints.ADMIN_DELETE_SKILLS(skillId),
//             {
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('--error occured--', error)

//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

// export const adminAddWorkMode = async (name: string, isActive: boolean) => {
//     try {
//         const response = await axiosInstance.post(AdminEndPoints.ADMIN_ADD_WORKMODE, {name, isActive},
//             {   
//                 headers:{
//                     "Content-Type": 'application/json'
//                 },
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('--error occured--', error)

//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

// export const adminGetWorkModes = async (search: string, page: number, limit: number) => {
//     try {
//         const response = await axiosInstance.get(AdminEndPoints.ADMIN_GET_WORKMODES,
//             {   params: {search, page, limit},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('--error occured--', error)

//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

// export const adminChangeWorkmodeStatus = async (id: string, status: 'active' | 'inactive') => {
//     try {
//         const response = await axiosInstance.patch(AdminEndPoints.ADMIN_CHANGE_WORKMODE_STATUS(id), {status},
//             {
//                 headers:{'Content-Type':'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error: unknown) {
//         const err = error as AxiosError
//         console.log('--Error occured while chaning workmode status--', err)

//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

// export const adminDeleteWorkMode = async (id: string) => {
//     try {
//         const response = await axiosInstance.delete(AdminEndPoints.ADMIN_DELETE_WORKMODE(id),
//             {
//                 sendAuthToken: true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error) {
//         const err = error as AxiosError
//         console.log('Error occured while deleting work mode', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

// export const adminEditWorkMode = async (id: string, name: string) => {
//     try {
//         const response = await axiosInstance.patch(AdminEndPoints.ADMIN_EDIT_WORKMODE(id), {name}, 
//             {
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error) {
//         const err = error as AxiosError
//         console.log('--Error occured while editing workmode--',err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// }

// export const adminAddJobLevel = async (name: string, isActive: boolean) => {
//     try {
//         const response = await axiosInstance.post(AdminEndPoints.ADMIN_ADD_JOBLEVEL, 
//             {name, isActive},
//             {
//                 headers: {'Content-Type': 'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error) {
//         const err = error as AxiosError
//         console.log('--Error occured while adding a job level--', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
//     }
// }

// export const adminGetJobLevels = async (search: string, page: number) => {
//     try {
//         const response = await axiosInstance.get(AdminEndPoints.ADMIN_GET_JOBLEVELS,
//             {
//                 params:{search, page},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )

//         return response.data
//     } catch (error) {
//         const err = error as AxiosError
//         console.log('-- Error occured', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

// export const adminEditJobLevel = async (id: string, name: string) => {
//     try {
//         const response = await axiosInstance.patch(AdminEndPoints.ADMIN_EDIT_JOBLEVEL(id),
//             {name},
//             {
//                 headers:{'Content-Type': 'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error) {
//          const err = error as AxiosError
//         console.log('-- Error occured', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

// export const adminChangeJobLevelStatus = async (id: string, isActive: boolean) => {
//     try {
//         const response = await axiosInstance.patch(AdminEndPoints.ADMIN_CHANGE_JOBLEVEL_STATUS(id),
//             {isActive},
//             {
//                 headers:{'Content-Type': 'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error) {
//          const err = error as AxiosError
//         console.log('-- Error occured', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

// export const adminDeleteJobLevel = async (id: string) => {
//     try {
//         const response = await axiosInstance.delete(AdminEndPoints.ADMIN_DELETE_JOBLEVEL(id),
//             {
//                 headers:{'Content-Type': 'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error) {
//          const err = error as AxiosError
//         console.log('-- Error occured', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

export const adminDeleteJob = async (id: string) => {
    try {
        const response = await axiosInstance.delete(AdminEndPoints.ADMIN_DELETE_JOB_BY_ID(id),
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
         const err = error as AxiosError
        console.log('-- Error occured', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
}

export const adminBlockJob = async (id: string) => {
    try {
        const response = await axiosInstance.patch(AdminEndPoints.ADMIN_BLOCK_JOB(id), null,
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
         const err = error as AxiosError
        console.log('-- Error occured', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
}

export const adminUnblockJob = async (id: string) => {
    try {
        const response = await axiosInstance.patch(AdminEndPoints.ADMIN_UNBLOCK_JOB(id), null,
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
         const err = error as AxiosError
        console.log('-- Error occured', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
}


export const adminToggleFlagJob = async (id: string, action: 'flag' | 'un-flag') => {
    try {
        const response = await axiosInstance.patch(AdminEndPoints.ADMIN_FLAG_JOB(id),
            {action},
            {   
                headers:{'Content-Type': 'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
         const err = error as AxiosError
        console.log('-- Error occured', err)
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }
    }
}


// export const adminAddJobType = async (name: string, isActive: boolean) => {
//     try {
//         const response = await axiosInstance.post(`/admin/v1/jobtype`,
//             {name, isActive},
//             {
//                 headers:{'Content-Type': 'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error) {
//          const err = error as AxiosError
//         console.log('-- Error occured', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

// export const adminUpdateJobType = async (id: string, name: string) => {
//     try {
//         const response = await axiosInstance.patch(`/admin/v1/jobtype/${id}/update`,
//             {name},
//             {
//                 headers:{'Content-Type': 'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error) {
//          const err = error as AxiosError
//         console.log('-- Error occured', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

// export const adminChangeJobTypeStatus = async (id: string, isActive: boolean) => {
//     try {
//         const response = await axiosInstance.patch(`/admin/v1/jobtype/${id}/status`,
//             {isActive},
//             {
//                 headers:{'Content-Type': 'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error) {
//          const err = error as AxiosError
//         console.log('-- Error occured', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }


// export const adminGetJobTypes = async (search: string) => {
//     try {
//         const response = await axiosInstance.get(`/admin/v1/jobtypes`,
//             {   
//                 params:{search},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error) {
//          const err = error as AxiosError
//         console.log('-- Error occured', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }

// export const adminDeleteJobType = async (id: string) => {
//     try {
//         const response = await axiosInstance.delete(`/admin/v1/jobtype/${id}`,
//             {
//                 headers:{'Content-Type': 'application/json'},
//                 sendAuthToken: true
//             } as AxiosRequest
//         )
//         return response.data
//     } catch (error) {
//          const err = error as AxiosError
//         console.log('-- Error occured', err)
//         if(err.response && err.response.status < 500 && err.response.status !== 403){
//             throw err
//         }
//     }
// }


