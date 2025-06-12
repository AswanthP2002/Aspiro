import { useEffect, useState } from 'react'
import defaultCoverPhoto from '/default-cover-photo.jpg'
import defaultProfile from '/default-img-instagram.png'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import Loader from '../../../components/candidate/Loader'
import { useNavigate } from 'react-router-dom'
import { Box, Input, InputLabel, Modal, OutlinedInput, TextField, Typography } from '@mui/material'
import { loginSucess, logout, tokenRefresh } from '../../../redux-toolkit/candidateAuthSlice'
import useRefreshToken from '../../../hooks/refreshToken'
import { candidateLogout } from '../../../hooks/Logouts'
import { candidateService } from '../../../services/apiServices'

interface Candidate {
    name : string
    role : string
}

//cover photo update modal
//profile photo update modal
//profile edit modal

export default function ProfilePersonal(){
    const [candidate, setcandidate] = useState<any>({})
    const [loading, setloading] = useState(false)
    const [openprofileedit, setopenprofileedit] = useState(false)
    const [openphotedit, setopenphotoedit] = useState(false)

    const [name, setname] = useState("")
    const [role, setrole] = useState("")
    const [city, setcity] = useState("")
    const [district, setdistrict] = useState("")
    const [state, setstate] = useState("")
    const [country, setCountry] = useState("")
    const [about, setabout] = useState("")

    const [nameerror, setnamerror] = useState("")
    const [roleerror, setrolerror] = useState("")
    const [cityerror, setcityerror] = useState("")
    const [districterror, setdistricterror] = useState("")
    const [staterror, setstateerror] = useState("")
    const [countryerror, setcountryerror] = useState("")
    const [abouterror, setabouterror] = useState("")

    const dispatcher = useDispatch()
    
    

    const handleOpenProfileEdit = () => setopenprofileedit(true)
    const handCloseProfileEdit = () => setopenprofileedit(false)

    const handleOpenPhotoEdit = () => setopenphotoedit(true)
    const handleClosePhotoEdit = () => setopenphotoedit(false)
 
    const token = useSelector((state : any) => {
        return state?.candidateAuth?.token
    })
    const navigator = useNavigate()
    console.log('state token before sending', token)


    async function editProfile(){
        const nameError = !name || !/^[A-Za-z\s.'-]{2,50}$/.test(name) || false
        const roleError = !role || !/^[A-Za-z\s.'-]{2,50}$/.test(role) || false
        const cityError = !city || !/^[A-Za-z\s.'-]{2,50}$/.test(city) || false
        const districtError = !district || !/^[A-Za-z\s.'-]{2,50}$/.test(district) || false
        const stateError = !/^[A-Za-z\s.'-]{2,50}$/.test(state) || false
        const countryError = !/^[A-Za-z\s.'-]{2,50}$/.test(country) || false
        const aboutError = !/^[A-Za-z0-9\s.,'";:!()\-]{10,500}$/.test(about) || false

        nameError ? setnamerror('Enter valid name') : setnamerror("")
        roleError ? setrolerror('Enter valid role') : setrolerror("")
        cityError ? setcityerror('Enter valid city') : setcityerror("")
        districtError ? setdistricterror('Enter valid district') : setdistricterror("")
        stateError ? setstateerror('Enter valid state') : setstateerror("")
        countryError ? setcountryerror('Enter valid country') : setcountryerror("")
        aboutError ? setabouterror('Enter valid summary') : setabouterror("")

        if(nameError || roleError || cityError || districtError || stateError || countryError || aboutError){
            return
        }
        setloading(true)
        handCloseProfileEdit()

        try {
            let response = await candidateService.editProfile(token, name, role, city, district, state, country, about)
            
            if(response.status === 401){
                const newAccessToken = await candidateService.refreshToken()
                response = await candidateService.editProfile(newAccessToken, name, role, city, district, state, country, about)
            }

            if (response.status === 403) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Blocked',
                    text: 'Your account has been blocked by the admin. You will logout shortly..',
                    showConfirmButton: false,
                    showCancelButton: false,
                    allowOutsideClick: false,
                    timer: 4000
                }).then(() => candidateLogout(token))
            }

            const result = await response.json()

            if(result.success){
                setloading(false)
                Swal.fire({
                    icon:'success',
                    title:'Updated',
                    text:result.message,
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:3000
                }).then(() => window.location.reload())
            }else{
                setloading(false)
                Swal.fire({
                    icon:'warning',
                    title:'Something went wrong'
                })
            }

        } catch (error : unknown) {
            console.log('error occured while saving candidate personal details')
            if (error instanceof Error) {
                setloading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: error.message
                })
            }
        }

    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:'auto',
        minWidth:400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        const fetchCandidateData = async () => {
            setloading(true)

            try {
                let fetchResponse = await candidateService.getCandidateProfileData(token)
                
                if(fetchResponse.status === 401){
                    const accessToken = await candidateService.refreshToken()
                    dispatcher(tokenRefresh({token:accessToken}))
                    fetchResponse = await candidateService.getCandidateProfileData(accessToken)
                }
                
                if(fetchResponse.status === 403){
                    Swal.fire({
                        icon:'warning',
                        title:'Blocked',
                        text:'Your account has been blocked by the admin. You will logout shortly..',
                        showConfirmButton:false,
                        showCancelButton:false,
                        allowOutsideClick:false,
                        timer:4000
                    }).then(() => candidateLogout(token))
                }

                const result = await fetchResponse.json()

                if(result?.success){
                    setTimeout(() => {
                        if(!result?.userDetails?.role){
                            navigator('/store/details')
                            return
                        }
                        setcandidate(result?.userDetails)
                        console.log('Result from the backend', result?.userDetails)
                        setloading(false)
                    }, 2000)
                }else{
                    setloading(false)
                    Swal.fire({
                        icon:'error',
                        title:'Oops',
                        text:result.message
                    }).then((result) => {
                        if(result.isConfirmed){
                            dispatcher(logout())
                            navigator('/')

                        }
                    })
                }

            } catch (error : unknown) {
                console.log('Error occured while fetching candidate profile data', error)
                if (error instanceof Error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.message,
                        showConfirmButton: true,
                        confirmButtonText: 'Home',
                        showCancelButton: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            dispatcher(logout())
                            navigator('/')
                        }
                    })
                }
            }

        }

        fetchCandidateData()

    }, [])

    useEffect(() => {
        setname(candidate?.name)
        setrole(candidate?.role)
        setcity(candidate?.location?.city)
        setdistrict(candidate?.location?.district)
        setstate(candidate?.location?.state)
        setCountry(candidate?.location?.country)
        setabout(candidate?.about)
    }, [candidate])

    return(
        <>
        {
            loading ? <Loader /> : null
        }
        <div className="container px-10 py-5">
            
            <div className="profile-card relative height-fit border border-gray-400">
                <div className="relative">
                    <div className="cover-photo">
                    <img src={defaultCoverPhoto} className='w-full h-[220px]' alt="" />
                </div>
                <div className="absolute bottom-2 left-2 w-fit h-fit">
                    <img src={candidate?.profilePicture ? candidate?.profilePicture : defaultProfile} alt="" className="profile-photo rounded-full w-[100px] h-[100px]" />
                    <i onClick={handleOpenPhotoEdit} className="fa-solid fa-pen-to-square absolute bottom-2"></i>
                </div>
                </div>
                <div className='mt-4 px-5'>
                    <p className="text-bold text-xl">{candidate?.name}</p>
                    <p>{candidate?.role}</p>
                    <p className="text-gray-400"><span><i className="fa-solid fa-location text-gray-400 me-3"></i>{candidate?.location?.district}, {candidate?.location?.state}</span></p>
                    <div className="w-full flex justify-end pb-5">
                        <button onClick={handleOpenProfileEdit} className='border border-gray-400'>Edit profile <i className="fa-solid fa-pencil"></i></button>
                    </div>
                </div>
            </div>
            <div>
                <p className="title text-xl">About</p>
                <p>{candidate?.about}</p>
            </div>
            <div className='flex gap-10'>
                <div>
                    <p className="text-bold">Email</p>
                    <p>{candidate?.email}</p>
                </div>
                <div>
                    <p className="text-bold">Phone</p>
                    <p>{candidate?.phone}</p>
                </div>
                <div>
                    <p className="text-bold">Location</p>
                    <p>{candidate?.location?.district}, {candidate?.location?.state}, {candidate?.location?.country}</p>
                </div>
            </div>
            <hr />
            <div>
                <p className="text-bold">Social Links</p>
                <div className="social-links"></div>
                <button type="button" className="border bg-gray-300 w-full p-2 border-dark-gray-400">Add Social links <span><i className="fa-solid fa-plus-circle"></i></span></button>
            </div>
        </div>

        {/* Prfile edit modal */}
        <Modal open={openprofileedit} onClose={handCloseProfileEdit}>
        <Box sx={style}>
            <div className='w-full flex justify-end'>
                <button onClick={handCloseProfileEdit} type="button" className=""><i className="fa-solid fa-close"></i></button>
            </div>
          <Typography variant="h6" component="h2" sx={{textAlign:'center'}}>Edit Profile</Typography>
          <Box sx={{width:'100%'}}>
            <label htmlFor="">Name</label>
            <input value={name} onChange={(event) => setname(event.target.value)} type="text" name="name" id="name" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
            <label className='error-label'>{nameerror}</label>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <label htmlFor="">Role</label>
            <input value={role} onChange={(event) => setrole(event.target.value)} type="text" name="role" id="role" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
            <label htmlFor="" className="error-label">{roleerror}</label>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px', display:'flex', justifyContent:'space-between'}}>
            <div>
                <label htmlFor="">City</label>
                <input value={city} onChange={(event) => setcity(event.target.value)} type="text" name="city" id="city" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label htmlFor="" className="error-label">{cityerror}</label>
            </div>
            <div>
                <label htmlFor="">District</label>
                <input value={district} onChange={(event) => setdistrict(event.target.value)} type="text" name="district" id="district" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label htmlFor="" className="error-label">{districterror}</label>
            </div>

            <div>
                <label htmlFor="">State</label>
                <input value={state} onChange={(event) => setstate(event.target.value)} type="text" name="state" id="state" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label htmlFor="" className="error-label">{staterror}</label>
            </div>

            <div>
                <label htmlFor="">Country</label>
                <input value={country} onChange={(event) => setCountry(event.target.value)} type="text" name="country" id="country" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label htmlFor="" className="error-label">{countryerror}</label>
            </div>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <label htmlFor="">About</label>
            <textarea value={about} onChange={(event) => setabout(event.target.value)} name="about" id="about" className='outline-none border border-gray-400 w-full mt-2 block p-2 rounded h-fit'></textarea>
            <label htmlFor="" className="error-label">{abouterror}</label>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <button type="button" className="bg-blue-500 p-1 w-full rounded" onClick={editProfile}>Save</button>
            <button type="button" className="bg-gray-400 p-1 w-full rounded mt-2" onClick={handCloseProfileEdit}>Cancel</button>
          </Box>
        </Box>
      </Modal>
        {/* ================= */}

        {/* Profile photo edit modal */}
        <Modal open={openphotedit} onClose={handleClosePhotoEdit}>
            <Box sx={style}>
                <div className="flex justify-end"><i className="fa-solid fa-close" onClick={handleClosePhotoEdit}></i></div>
                <h2>Edit profile</h2>
            </Box>
        </Modal>
        {/* ================ */}
        </>
    )
}