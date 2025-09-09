import { useEffect, useState } from 'react'
import defaultCoverPhoto from '/default-cover-photo.jpg'
import defaultProfile from '/default-img-instagram.png'
import { useDispatch, useSelector } from 'react-redux'
import { Notify } from 'notiflix'
import Swal from 'sweetalert2'
import Loader from '../../../components/candidate/Loader'
import { useNavigate } from 'react-router-dom'
import { Box, Modal, Typography } from '@mui/material'
import { logout } from '../../../redux-toolkit/candidateAuthSlice'
import { addSocialmediaLinks, editCandidateProfile, getCandidateProfileData, removeSocialLink } from '../../../services/candidateServices'
import SocialmediaLinks from '../../../components/candidate/SocialmediaLinksCard'
import CropComponent from '../../../components/common/CropComponent'
import GeneralModal from '../../../components/common/Modal'
import EditProfilePictureComponent from '../../../components/candidate/EditProfilePhotoComponent'
import EditCoverphotoComponent from '../../../components/candidate/EditCoverPhotoComponent'

interface Candidate {
    name : string
    role : string
}

export default function ProfilePersonal(){
    const [candidate, setcandidate] = useState<any>({})
    const [loading, setloading] = useState(false)
    const [openprofileedit, setopenprofileedit] = useState(false)

    const [openProfilePhotoModal, setOpenProfilePhotoModal] = useState(false)
    const openProfilePhoto = () => setOpenProfilePhotoModal(true)
    const closeProfilePhoto = () => setOpenProfilePhotoModal(false)

    const [openCoverphotoModal, setOpenCoverphotoModal] = useState(false)
    const openCoverphoto = () => setOpenCoverphotoModal(true)
    const closeCoverphoto = () => setOpenCoverphotoModal(false)

    const [zoom, setZoom] = useState(1)
    const [crop, setCrop] = useState({x:0, y:0})
    const [image, setImage] = useState(null)

    const [isAddLinkButtonClicked, setIsAddLinkButtonClicked] = useState(false)
    const [socialmediaurl, setsocialmediaurl] = useState("")
    const [socialmediaurlerror, setsocialmediaurlerror] = useState("")

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
 
    const token = useSelector((state : any) => {
        return state?.candidateAuth?.token
    })
    const navigateTo = useNavigate()
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
        //setloading(true)
        handCloseProfileEdit()

        
            const result = await editCandidateProfile(name, role, city, district, state, country, about)

            if(result.success){
                //setloading(false)
                Swal.fire({
                    icon:'success',
                    title:'Updated',
                    text:result.message,
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:3000
                }).then(() => window.location.reload())
            }else{
            //     setloading(false)
                 Swal.fire({
                    icon:'warning',
                    title:'Something went wrong'
                 })
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

           
                const result = await getCandidateProfileData()

                if(result?.success){
                    //setTimeout(() => {
                        if(!result?.userDetails?.role){
                            navigateTo('/store/details', {
                                state:{
                                    candidateName:result?.userDetails?.name,
                                    candidateRole:result?.userDetails?.role,
                                    candidateId:result?.userDetails?._id
                                }
                            })
                            return
                        }
                        setcandidate(result?.userDetails)
                        console.log('Result from the backend', result?.userDetails)
                        setloading(false)
                    //}, 2000)
                }else{
                    setloading(false)
                    Swal.fire({
                        icon:'error',
                        title:'Oops',
                        text:result.message
                    }).then((result) => {
                        if(result.isConfirmed){
                            dispatcher(logout())
                            navigateTo('/')

                        }
                    })
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

    async function addSocialMedialink(){
        if(!/https?:\/\/(www\.)?(linkedin\.com|twitter\.com|facebook\.com|instagram\.com|github\.com|t\.me|youtube\.com|behance\.net|dribbble\.com)\/[a-zA-Z0-9._\-\/]+/.test(socialmediaurl)){
            setsocialmediaurlerror('This url is not valid')
            return
        }else{
            setsocialmediaurlerror("")
        }

        if(socialmediaurl.includes('<script>') || socialmediaurl.includes('</script>') || !socialmediaurl){
            setsocialmediaurl('Invalid url')
            return
        }else{
            setsocialmediaurlerror("")
        }

        const result = await addSocialmediaLinks(socialmediaurl)

        if(result.success){
            Notify.success(result?.message, {timeout:1000})
            setTimeout(() => window.location.reload(), 1000)
        }else{
            Swal.fire({
                icon:'warning',
                title:'Oops!',
                text:result?.message
            })
        }
    }

    async function deleteSocialLink(domain : string) {
        const result = await removeSocialLink(domain)

        if(result?.success){
            Notify.success(result?.message, {timeout:1000})
            setTimeout(() => window.location.reload(), 1000)
        }else{
            Swal.fire({
                icon:'warning',
                title:'Oops',
                text:result?.message
            })
        }
    }

    return(
        <>
        {
            loading ? <Loader /> : null
        }
        <div className="container px-10 py-5">
            
            <div className="profile-card relative height-fit border border-gray-300">
                <div className="relative">
                    <div className="cover-photo">
                    <img style={{objectFit:'cover'}} src={candidate?.coverPhoto?.cloudinarySecureUrl ? candidate?.coverPhoto?.cloudinarySecureUrl : defaultCoverPhoto} className='w-full h-[220px]' alt="" />
                    <i onClick={openCoverphoto} className="fa-solid fa-pen-to-square cursor-pointer absolute right-2 bottom-2"></i>
                </div>
                <CropComponent crop={crop} zoom={zoom} setCrop={setCrop} setZoom={setZoom} image={image} />
                <div className="absolute bottom-2 left-2 w-fit h-fit">
                    <div className="relative">
                        <img style={{objectFit:'cover'}} src={candidate?.profilePicture?.cloudinarySecureUrl ? candidate?.profilePicture?.cloudinarySecureUrl : defaultProfile} alt="" className="profile-photo rounded-full w-[100px] h-[105px]" />
                        <i onClick={openProfilePhoto} className="cursor-pointer fa-solid fa-pen-to-square absolute bottom-1 left-10"></i>
                    </div>
                </div>
                </div>
                <div className='mt-4 px-5 flex justify-between pb-4'>
                    <div className='w-full'>
                        <p className="font-semibold text-xl">{candidate?.name}</p>
                        <p className='mt-3'><span><i className="fa-solid fa-briefcase me-3"></i></span>{candidate?.role}</p>
                        <p className="text-gray-400 text-sm mt-1"><span><i className="fa-solid fa-location-dot !text-sm !text-gray-400 me-3"></i>{candidate?.location?.district}, {candidate?.location?.state}</span></p>
                    </div>
                    <div className="w-full flex justify-end items-end pb-5">
                        <button onClick={handleOpenProfileEdit} className='border rounded border-gray-300 text-sm px-2 py-1'>Edit profile <i className="!text-sm fa-solid fa-pen-to-square"></i></button>
                    </div>
                </div>
            </div>
            <section className='mt-8'>
            <div>
                <p className="title font-semibold">About</p>
                <p className='mt-3 text-sm text-gray-500'>{candidate?.about}</p>
            </div>
            <div className='flex gap-20 mt-5'>
                <div>
                    <p className="text-bold">Email</p>
                    <p className='text-sm text-gray-500 mt-1'>{candidate?.email}</p>
                </div>
                <div>
                    <p className="text-bold">Phone</p>
                    <p className='text-sm text-gray-500 mt-1'>{candidate?.phone}</p>
                </div>
                <div>
                    <p className="text-bold">Location</p>
                    <p className='text-sm text-gray-500 mt-1'>{candidate?.location?.district}, {candidate?.location?.state}, {candidate?.location?.country}</p>
                </div>
            </div>
            </section>
            <hr className='mt-5' />
            <div>
                <p className="font-semibold mt-3">Social Links</p>
                <div className="social-links">
                    {
                        candidate?.socialLinks?.length > 0
                            ?
                            candidate?.socialLinks?.map((links : any, index : number) => {
                                return <SocialmediaLinks key={index} removeLink={() => deleteSocialLink(links?.domain)} data={links} />
                            })
                            : <>
                                {isAddLinkButtonClicked === false && (
                                    <p className='text-center text-xs text-gray-400 mt-3'>No links added</p>
                                )}
                                
                              </>
                    }
                    {
                        isAddLinkButtonClicked && (
                            <div className='mt-2 mb-2 flex items-center'>
                                <div className='relative'>
                                <input value={socialmediaurl} onChange={(event) => setsocialmediaurl(event.target.value)} type="text" placeholder='enter url' className='border w-[400px] border-gray-300 rounded p-1' />
                                <label htmlFor="" className="absolute error-label text-xs text-red block">{socialmediaurlerror}</label>
                                </div>
                                <button onClick={addSocialMedialink} className='text-sm bg-black text-white rounded px-2 py-1 ms-1'>Add</button>
                                <button onClick={() => setIsAddLinkButtonClicked(false)} className='text-sm border border-gray-300 rounded ms-1 py-1 px-2'><i className="fa-solid fa-xmark-circle"></i></button>
                            </div>
                        )
                    }
                </div>
                <button onClick={() => setIsAddLinkButtonClicked(true)} type="button" className="mt-2 border border-gray-400 rounded bg-gray-300 w-full p-2 border-dark-gray-400 text-xs">Add Social links <span><i className="fa-solid fa-plus-circle"></i></span></button>
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
   
            <GeneralModal 
                openModal={openProfilePhotoModal} 
                closeModal={closeProfilePhoto}
                children={<EditProfilePictureComponent profilePicture={candidate?.profilePicture} />}
            />

            <GeneralModal 
                openModal={openCoverphotoModal}
                closeModal={closeCoverphoto}
                children={<EditCoverphotoComponent coverPhoto={candidate?.coverPhoto} />}
            />
        </>
    )
}