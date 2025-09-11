//candidate services :: recruiter services :: adminservices ::
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import { AxiosError } from "axios"

export const adminLogin = async (email : string, password : string) => {
    try {
        const result = await axiosInstance.post('/admin/login', 
            {email, password},
            { 
                headers:{'Content-Type':'application/json'},
                sendCookie:false
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



export const adminServices = {
    refreshToken: async function () {
        const response = await fetch('http://localhost:5000/admin/token/refresh', {
            method: 'GET',
            credentials: 'include'
        })

        const result = await response.json()

        return result?.accessToken
    },//redone
    login: async function (email: string, password: string) {
        return fetch('http://localhost:5000/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        })
    },//redone
    getJobs: async function (accessToken: string, search: string, page: number, sort : string, filter : any) {
        return fetch(`http://localhost:5000/admin/jobs/data?search=${search}&page=${page}&sort=${sort}&filter=${encodeURIComponent(JSON.stringify(filter))}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${accessToken}`
            },
            credentials: 'include'
        })
    },//redone
    getJobDetails: async function (accessToken: string, jobId: string) {
        return fetch(`http://localhost:5000/admin/job/details/${jobId}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${accessToken}`
            },
            credentials: 'include'
        })
    },//redone
    blockUnblockJob: async function (accessToken: string, jobId: string, operation: string) {
        let url: string = ''
        url = operation === 'Block'
            ? `http://localhost:5000/admin/job/block/${jobId}`
            : `http://localhost:5000/admin/job/unblock/${jobId}`

        return fetch(url, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${accessToken}`
            },
            credentials: 'include'
        })
    },//redone
    rejectUnrejectJob: async function (accessToken: string, jobId: string, operation: string) {
        let url: string = ''
        url = operation === 'Reject'
            ? `http://localhost:5000/admin/job/reject/${jobId}`
            : `http://localhost:5000/admin/job/unreject/${jobId}`

        return fetch(url, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${accessToken}`
            },
            credentials: 'include'
        })

    },//redone
    getCompanies: async function (accessToken: string, search: string, page: number, sort : string) {
        return fetch(`http://localhost:5000/admin/companies/data?search=${search}&page=${page}&sort=${sort}`, {
            method: 'GET',
            headers: {
                authorization: `bearer ${accessToken}`
            },
            credentials: 'include'
        })
    },//redone
    getCompanyDetails: async function (accessToken: string, companyId: string) {
        return fetch(`http://localhost:5000/admin/company/details/${companyId}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${accessToken}`
            },
            credentials: 'include'
        })
    },//redone
    blockUnblockCompany: async function (accessToken: string, companyId: string, operation: string) {
        let url: string = ''
        url = operation === 'Block'
            ? `http://localhost:5000/admin/company/block/${companyId}`
            : `http://localhost:5000/admin/company/unblock/${companyId}`

        return fetch(url, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${accessToken}`
            },
            credentials: 'include'
        })
    },//redone
    closeCompany: async function (accessToken: string, companyId: string) {
        return fetch(`http://localhost:5000/admin/company/close/${companyId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${accessToken}`
            },
            credentials: 'include'
        })
    },//redone
    getCandidates: async function (accessToken: string, searchValue: string, page: number, sort : string, filter : any) {
        return fetch(`http://localhost:5000/admin/candidates/data?search=${searchValue}&page=${page}&sort=${sort}&filter=${encodeURIComponent(JSON.stringify(filter))}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include'
        })
    },//redone
    getCandidateDetails: async function (accessToken: string, id: any) {
        return fetch(`http://localhost:5000/admin/candidate/details?candidateId=${id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
    },//redone
    blockCandidate: async function (accessToken: string, candidateId: string) {
        return fetch('http://localhost:5000/admin/candidate/block', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: candidateId })
        })
    },//redone
    unblockCandidate: async function (accessToken: string, candidateId: string) {
        return fetch('http://localhost:5000/admin/candidate/unblock', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: candidateId })
        })
    }//redone
} //refrehs token is pending
/**
 * Recomended : Global token refresh using axios interceptors
 * Not Recomended : Individual token refresh in each and every method :: DRY  violation
 */

export const candidateService = {
    refreshToken: async function () {
        const response = await fetch('http://localhost:5000/candidate/token/refresh', {
            method: 'GET',
            credentials: 'include'
        })

        const result = await response.json()
        // dispatcher(tokenRefresh({ token: result?.accessToken })) disabled seting refresh token ::: temporary

        return result?.accessToken
    }, //redone
    registerCandidate: async function (name: string, email: string, phone: string, username: string, password: string) {
        return fetch('http://localhost:5000/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, username, password })
        })
    },//redone
    loginCandidate: async function (email: string, password: string) {
        return fetch('http://localhost:5000/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        })
    },//redone
    saveBasicDetails: async function (accessToken: string, jobRole: string, city: string, district: string, state: string, country: string, pincode: string, summary: string) {
        return fetch('http://localhost:5000/personal/details/save', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jobRole, city, district, state, country, pincode, summary }),
            credentials: 'include'
        })
    },//redone
    getCandidateProfileData: async function (accessToken: string) {
        return fetch('http://localhost:5000/profile/personal/datas', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${accessToken}`
            },
            credentials: 'include'
        })
    },//redone
    editProfile: async function (accessToken: string, name: string, role: string, city: string, district: string, state: string, country: string, about: string) {
        return fetch('http://localhost:5000/candidate/profile', {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, role, city, district, state, country, about })
        })
    },//redone
    getExperiences: async function (accessToken: string) {
        return fetch('http://localhost:5000/candidate/experience', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${accessToken}`
            },
            credentials: 'include'
        })
    },//redone
    addExperience: async function (accessToken: string, role: string, jobtype: string, location: string, locationtype: string, organization: string, ispresent: boolean, startdate: string, enddate: string) {
        return fetch('http://localhost:5000/candidate/experience/add', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role, jobtype, location, locationtype, organization, ispresent, startdate, enddate }),
            credentials: 'include'
        })
    },//redone
    editExperience: async function (accessToken: string, experienceId: string, editableRole: string, editableJobType: string, editableOrganization: string, editableIsPresent: boolean, editableStartDate: string, editableEndDate: string, editableLocation: string, editableLocationType: string) {
        return fetch(`http://localhost:5000/candidate/experience/edit/${experienceId}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ editableRole, editableJobType, editableOrganization, editableIsPresent, editableStartDate, editableEndDate, editableLocation, editableLocationType }),
            credentials: 'include'
        })
    },//redone
    deleteExperience: async function (accessToken: string, expId: string) {
        return fetch(`http://localhost:5000/candidate/experience/${expId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${accessToken}`
            },
            credentials: 'include'
        })
    },//redone
    verify: async function (otp: any, email: any) {
        return fetch('http://localhost:5000/verify', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ otp, email })
        })
    },//redone
    addSkill: async function (accesstoken : string, type : string, skill : string, level : string) {
        return fetch('http://localhost:5000/candidate/skills/add', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${accesstoken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, skill, level }),
            credentials: 'include'
        })
    },//redone
    getSkills: async function (accessToken : string) {
        return fetch('http://localhost:5000/candidate/skills', {
            method:'GET',
            headers:{
                authorization:`Bearer ${accessToken}`
            },
            credentials:'include'
        })
    },//redone
    deleteSkil: async function (accessToken : string, skillId : string) {
        return fetch(`http://localhost:5000/candidate/skills/${skillId}`, {
            method:'DELETE',
            headers:{
                authorization:`Bearer ${accessToken}`
            },
            credentials:'include'
        })
    },//redone
    addEducation: async function (accessToken : string, level : string, stream : string, organization : string, isPresent : boolean, startYear : string, endYear : string, location : string) {
        return fetch('http://localhost:5000/candidate/education/add', {
            method:'POST',
            headers:{
                authorization:`Bearer ${accessToken}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({level, stream, organization, isPresent, startYear, endYear, location}),
            credentials:'include'
        })
    },//redone
    getEducations: async function (accessToken : string) {
        return fetch('http://localhost:5000/candidate/education', {
            method:'GET',
            headers:{
                authorization:`Bearer ${accessToken}`,
                'Content-Type':'application/json'
            },
            credentials:'include'
        })
    },//redone
    deleteEducation: async function (accessToken : string, educationId : string) {
        return fetch(`http://localhost:5000/candidate/education/${educationId}`, {
            method:'DELETE',
            headers:{
                authorization:`Bearer ${accessToken}`
            },
            credentials:'include'
        })
    },//redone
    editEducation: async function (accessToken : string, educationId : string, level : string, stream : string, organization : string, isPresent : boolean, startYear : string, endYear : string, location : string) {
        return fetch(`http://localhost:5000/candidate/education/${educationId}`, {
            method:'PUT',
            headers:{
                authorization:`Bearer ${accessToken}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({level, stream, organization, isPresent, startYear, endYear, location}),
            credentials:'include'
        })
    },//redone
    loadResumes: async function (accesstoken : string) {
        return fetch('http://localhost:5000/candidate/resumes', {
            method:'GET',
            headers:{
                authorization:`Bearer ${accesstoken}`
            },
            credentials:'include'
        })
    },//redone
    deleteResume: async function (accessToken : string, resumeId : string, publicId : string) {
        return fetch(`http://localhost:5000/candidate/resume/${resumeId}`, {
            method:'DELETE',
            headers:{
                authorization:`Bearer ${accessToken}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({cloudinaryPublicId:publicId}),
            credentials:'include'
        })
    },//redone
    addCertificate: async function (accessToken : string, formData : any) {
        return fetch('http://localhost:5000/candidate/certificate', {
            method:'POST',
            headers:{
                authorization:`Bearer ${accessToken}`
            },
            body:formData,
            credentials:'include'
        })
    },//redone
    loadCertificates: async function (accessToken : string) {
        return fetch('http://localhost:5000/candidate/certificate', {
            method:'GET',
            headers:{
                authorization:`Bearer ${accessToken}`
            },
            credentials:'include'
        })
    },//redone
    applyJob: async function (accessToken : string, jobId : string, formData : any) {
        return fetch(`http://localhost:5000/candidate/job/${jobId}/apply`, {
            method:'POST',
            headers:{
                authorization:`Bearer ${accessToken}`
            },
            body:formData,
            credentials:'include'
        })
    },//redone
}

export const recruiterService = {
    refreshToken: async function () {
        const response = await fetch('http://localhost:5000/recruiter/token/refresh', {
            method: 'GET',
            credentials: 'include'
        })

        const result = await response.json()
        // dispatcher(recruiterTokenRefresh({ token: result?.accessToken })) disabled seting refresh token temporary
        return result?.accessToken
    }, //redone
    recruiterRegister: async function (email: string, username: string, password: string) {
        return fetch('http://localhost:5000/recruiter/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password })
        })
    }, //redone
    addLogoCloudinary: async function (logoFormData: any) {
        return fetch('https://api.cloudinary.com/v1_1/dfb0unqh6/image/upload', {
            method: 'POST',
            body: logoFormData
        })
    },//redone
    addCoverPhotoCloudinary: async function (coverFormData: any) {
        return fetch('https://api.cloudinary.com/v1_1/dfb0unqh6/image/upload', {
            method: 'POST',
            body: coverFormData
        })

    },//redone
    saveIntroDetails: async function (token: string, details: any, logourl: string, coverphotourl: string) {
        return fetch('http://localhost:5000/recruiter/intro/details', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ details, logourl, coverphotourl }),
            credentials: 'include'
        })
    },//redone
    recruiterLogin: async function (email: string, password: string) {
        return fetch('http://localhost:5000/recruiter/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        })
    },//redone
    getProfileOverview: async function (accessToken: string) {
        return fetch(`http://localhost:5000/recruiter/profile/overview`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${accessToken}`
            },
            credentials: 'include'
        })
    },//redone
    postJob: async function (token: string, details: any) {
        return fetch('http://localhost:5000/recruiter/job/create', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details),
            credentials: 'include'
        })
    }, //redone
    getApplicationDetails: async function (accesstoken : string, jobId : string) {
        return fetch(`http://localhost:5000/recruiter/job/${jobId}/application/details`, {
            method:'GET',
            headers:{
                authorization:`Bearer ${accesstoken}`
            },
            credentials:'include'
        })
    }//redone
}//Refresh token is pending
/**
 * Refresh token is implemented through axios interceptors
 */

export const loadJobDetails = async (jobId : string) => {
    try {
        const response = await axiosInstance.get(`/jobs/details/${jobId}`)
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) return err.response.data
        console.log('Error occured while geting job details')
    }
}
export const getCandidates = async (search : string, page : number, limit : number, sort : string, filter : any) => {
    try {
        const response = await axiosInstance.get('/candidates',
            {           
                headers:{'Content-Type':'application/json'},
                params:{
                    search,
                    page,
                    limit,
                    sort,
                    filter:JSON.stringify(filter)
                }
            }
        )
        return response.data
    
    } catch (error : unknown) {
        console.log('Error occured while geting candidates', error)
    }
}
export const getCandidateDetails = async (candidateId : string) => {
    try {
        const response = await axiosInstance.get(`/candidates/${candidateId}`)
        return response.data
    } catch (error : unknown) {
        console.log('Error occ')
    }
}

export const commonService = {
    loadJobDetails: async function (jobId: any) {
        return fetch(`http://localhost:5000/jobs/details/${jobId}`, {
            method: 'GET'
        })
    },
    parsePdf: async function (accessToken : string, formData : any) {
        return fetch('http://localhost:5000/candidate/resume/upload', {
            method:'POST',
            headers:{
                authorization:`Bearer ${accessToken}`
            },
            body:formData
        })
    },
    homePageSearch: async function (searchValue : string) {
        return fetch(`http://localhost:5000/home/jobs?search=${searchValue}`, {
            method:'GET'
        })
    }
}
