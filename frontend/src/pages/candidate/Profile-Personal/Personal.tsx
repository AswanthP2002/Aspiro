import { FormEvent, useEffect, useState } from 'react'
import defaultCoverPhoto from '/default-cover-photo.jpg'
import defaultProfile from '/default-img-instagram.png'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Notify } from 'notiflix'
import Swal from 'sweetalert2'
import Loader from '../../../components/candidate/Loader'
import { useNavigate } from 'react-router-dom'
import { Box, Modal, Typography } from '@mui/material'
import { logout } from '../../../redux-toolkit/candidateAuthSlice'
import { addSocialmediaLinks, editCandidateProfile, getCandidateProfileData, getUserPosts, removeSocialLink } from '../../../services/candidateServices'
import SocialmediaLinks from '../../../components/candidate/SocialmediaLinksCard'
import CropComponent from '../../../components/common/CropComponent'
import GeneralModal from '../../../components/common/Modal'
import EditProfilePictureComponent from '../../../components/candidate/EditProfilePhotoComponent'
import EditCoverphotoComponent from '../../../components/candidate/EditCoverPhotoComponent'
import Post from '../../../components/common/Post'
import {CandidatePersonalData, SocialLinks } from '../../../types/entityTypes'


export default function ProfilePersonal(){
    const [candidate, setcandidate] = useState<CandidatePersonalData>({
       _id:"",
       about:"",
       jobTitle:"",
       currentSubscription:"",
       dateOfBirth:"",
       name:"",
       socialLinks:[],
       userDetails:{
        _id:"",
        coverPhoto:{
            cloudinaryPublicId:"",
            cloudinarySecureUrl:""
        },
        email:"",
        phone:"",
        profilePicture:{
            cloudinaryPublicId:"",
            cloudinarySecureUrl:""
        }
       },
       location:{
        city:"",
        district:"",
        state:"",
        country:"",
        pincode:""
       },
       userId:"",
       posts:[],
       followers:[],
       following:[],
       createdAt:""
    })
    const [loading, setloading] = useState(false)
    const [openprofileedit, setopenprofileedit] = useState(false)
    const [userPosts, setUserPosts] = useState<any[]>([])

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

    const [name, setname] = useState<string | undefined>("")
    const [role, setrole] = useState<string | undefined>("")
    const [city, setcity] = useState<string | undefined>("")
    const [district, setdistrict] = useState<string | undefined>("")
    const [state, setstate] = useState<string | undefined>("")
    const [country, setCountry] = useState<string | undefined>("")
    const [about, setabout] = useState<string | undefined>("")
    const [pincode, setpincode] = useState<string | undefined>("")

    const [nameerror, setnamerror] = useState("")
    const [roleerror, setrolerror] = useState("")
    const [cityerror, setcityerror] = useState("")
    const [districterror, setdistricterror] = useState("")
    const [staterror, setstateerror] = useState("")
    const [countryerror, setcountryerror] = useState("")
    const [abouterror, setabouterror] = useState("")
    const [pincodeerror, setpincodeerror] = useState("")

    const dispatcher = useDispatch()
    
    

    const handleOpenProfileEdit = () => setopenprofileedit(true)
    const handCloseProfileEdit = () => setopenprofileedit(false)
 
    const token = useSelector((state : any) => {
        return state?.candidateAuth?.token
    })
    const navigateTo = useNavigate()
    console.log('state token before sending', token)


    async function editProfile(event : any){
        event.preventDefault()

        const nameError = !name || !/^[A-Za-z\s.'-]{2,50}$/.test(name) || false
        const roleError = !role || !/^[A-Za-z\s.'-]{2,50}$/.test(role) || false
        const cityError = !city || !/^[A-Za-z\s.'-]{2,50}$/.test(city) || false
        const districtError = !district || !/^[A-Za-z\s.'-]{2,50}$/.test(district) || false
        const stateError = !/^[A-Za-z\s.'-]{2,50}$/.test(state || "") || false
        const countryError = !/^[A-Za-z\s.'-]{2,50}$/.test(country || "") || false
        const aboutError = !/^[A-Za-z0-9\s.,'";:!()\-]{10,500}$/.test(about || "") || false
        const pincodeError = !/^[1-9][0-9]{5}$/.test(pincode || "") || false

        nameError ? setnamerror('Enter valid name') : setnamerror("")
        roleError ? setrolerror('Enter valid role') : setrolerror("")
        cityError ? setcityerror('Enter valid city') : setcityerror("")
        districtError ? setdistricterror('Enter valid district') : setdistricterror("")
        stateError ? setstateerror('Enter valid state') : setstateerror("")
        countryError ? setcountryerror('Enter valid country') : setcountryerror("")
        aboutError ? setabouterror('Enter valid summary') : setabouterror("")
        pincodeError ? setpincodeerror('Enter a valid pincode') : setpincodeerror("")

        if(nameError || roleError || cityError || districtError || stateError || countryError || aboutError || pincodeError){
            return
        }
        //setloading(true)
        handCloseProfileEdit()

        
            const result = await editCandidateProfile(name, role, city, district, state, country, about, pincode)

            if(result?.success){
                //setloading(false)
                Swal.fire({
                    icon:'success',
                    title:'Updated',
                    text:"Testing flow",
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:3000
                }).then(() => {
                    //edit state
                    const formData = new FormData(event.target)
                    console.log('this is event target', event.target)
                    const data : Record<string, any> = {}
                    formData.forEach((value, key) => {
                        data[key] = value
                    })

                    console.log('Data after traverse', data)

                    setcandidate((prv : any) => {
                        return {
                            ...prv,
                            ...data
                        }
                    })

                    // const formData = new FormData(event.target as any)
                    // console.log('formdata', formData)
                })
            }else{
            //     setloading(false)
                 Swal.fire({
                    icon:'warning',
                    title:'Something went wrong'
                 })
            }

    }

    const profilePictureOnSave = (url : string) => {
        setcandidate((prv : CandidatePersonalData) => {
            if(!prv) return prv
            return{
                ...prv,
                userDetails:{
                    ...prv.userDetails,
                    profilePicture:{
                        ...prv.userDetails.profilePicture,
                        cloudinarySecureUrl:url
                    }
                }
                // profilePicture:{
                //     ...prv.userDetails?.profilePicture,
                //     cloudinarySecureUrl:url
                // }
            }
        })
        closeProfilePhoto()
    }

    const profilePictureOnDelete = () => {
        setcandidate((prv : CandidatePersonalData) => {
            return {
                ...prv,
                userDetails:{
                    ...prv.userDetails,
                    profilePicture:{
                        cloudinaryPublicId:"",
                        cloudinarySecureUrl:""
                    }
                }
                // userDetails?.profilePicture:{
                //     cloudinarySecureUrl:"",
                //     cloudinaryPublicId:""
                // }
            }
        })
        closeProfilePhoto()
    }

    const coverPhotoOnSave = (url : string) => {
        setcandidate((prv : CandidatePersonalData) => {
            if(!prv) return prv
            return {
                ...prv,
                userDetails:{
                    ...prv.userDetails,
                    coverPhoto:{
                        ...prv.userDetails.coverPhoto,
                        cloudinarySecureUrl:url
                    }
                }
            }
        })
        closeCoverphoto()
    }

    const coverPhotoOnDelete = () => {
        setcandidate((prv : CandidatePersonalData) => {
            return {
                ...prv,
                userDetails:{
                    ...prv.userDetails,
                    coverPhoto:{
                        cloudinarySecureUrl:"",
                        cloudinaryPublicId:""
                    }
                }
            }
        })

        closeCoverphoto()
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
                //const postResult = await getUserPosts()

                if(result?.success){
                    //setTimeout(() => {
                    console.log('user personal details from the backend', result)
                        if(!result?.userDetails?.jobTitle){
                            navigateTo('/candidate/store/details', {
                                state:{
                                    candidateName:result?.userDetails?.name,
                                    candidateRole:result?.userDetails?.role,
                                    candidateId:result?.userDetails?._id
                                }
                            })
                            return
                        }
                        setcandidate(result?.userDetails)
                        //setUserPosts(postResult?.result)
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
        setrole(candidate?.userDetails.role)
        setcity(candidate?.location?.city)
        setdistrict(candidate?.location?.district)
        setstate(candidate?.location?.state)
        setCountry(candidate?.location?.country)
        setabout(candidate?.about)
        setpincode(candidate?.location?.pincode)
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
        const url = new URL(socialmediaurl)

        const result = await addSocialmediaLinks(socialmediaurl)

        if(result.success){
            Notify.success(result?.message, {timeout:1000})
            setcandidate((prv : CandidatePersonalData) => {
                return {
                    ...prv,
                    socialLinks:[...prv.socialLinks, {domain:url.hostname, url:socialmediaurl}]
                    // ...prv,
                    // socialLinks:[...prv.socialLinks, {domain:url.hostname, url:socialmediaurl}]
                }
            })
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
            setcandidate((prv : CandidatePersonalData) => {
                return {
                    ...prv,
                    socialLinks:prv.socialLinks.filter((link : SocialLinks) => link.domain !== domain)
                    // ...prv,
                    // socialLinks:prv.socialLinks.filter((link : SocialLinks) => link.domain !== domain)
                }
            })
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
                    <img style={{objectFit:'cover'}} src={candidate?.userDetails.coverPhoto?.cloudinarySecureUrl ? candidate?.userDetails?.coverPhoto?.cloudinarySecureUrl : defaultCoverPhoto} className='w-full h-[220px]' alt="" />
                    <i onClick={openCoverphoto} className="fa-solid fa-pen-to-square cursor-pointer absolute right-2 bottom-2"></i>
                </div>
                <CropComponent crop={crop} zoom={zoom} setCrop={setCrop} setZoom={setZoom} image={image} />
                <div className="absolute bottom-2 left-2 w-fit h-fit">
                    <div className="relative">
                        <img style={{objectFit:'cover'}} src={candidate?.userDetails?.profilePicture?.cloudinarySecureUrl ? candidate?.userDetails?.profilePicture?.cloudinarySecureUrl : defaultProfile} alt="" className="profile-photo rounded-full w-[100px] h-[105px]" />
                        <i onClick={openProfilePhoto} className="cursor-pointer fa-solid fa-pen-to-square absolute bottom-1 left-10"></i>
                    </div>
                </div>
                </div>
                <div className='mt-4 px-5 flex justify-between pb-4'>
                    <div className='w-full'>
                        <p className="font-semibold text-xl">{candidate?.name}</p>
                        <p className='mt-3'><span><i className="fa-solid fa-briefcase me-3"></i></span>{candidate?.jobTitle}</p>
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
                    <p className='text-sm text-gray-500 mt-1'>{candidate?.userDetails?.email}</p>
                </div>
                <div>
                    <p className="text-bold">Phone</p>
                    <p className='text-sm text-gray-500 mt-1'>{candidate?.userDetails?.phone}</p>
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
            <section id="posts" className='py-5 font-semibold'>
                <p>Posts</p>
                <div>
                    {
                        userPosts.length > 0
                            ? <>
                                {
                                    userPosts?.map((post : any, index : number) => {
                                        return <Post key={index} post={post} />
                                    })
                                }
                             </>
                             : <p className='text-gray-500 text-sm text-center mt-5'>No posts created</p>
                    }
                </div>
            </section>
        </div> 

        {/* Prfile edit modal */}
        <Modal open={openprofileedit} onClose={handCloseProfileEdit}>
        <Box sx={style}>
            <form action="#" onSubmit={(event) => editProfile(event)}>
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
          <Box sx={{width:'100%', marginTop:'10px', display:'flex', gap:'30px', justifyContent:'space-between'}}>
            <div className='flex-1'>
                <label htmlFor="">City</label>
                <input value={city} onChange={(event) => setcity(event.target.value)} type="text" name="city" id="city" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label htmlFor="" className="error-label">{cityerror}</label>
            </div>
            <div className='flex-1'>
                <label htmlFor="">District</label>
                <input value={district} onChange={(event) => setdistrict(event.target.value)} type="text" name="district" id="district" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label htmlFor="" className="error-label">{districterror}</label>
            </div>

            <div className='flex-1'>
                <label htmlFor="">State</label>
                <input value={state} onChange={(event) => setstate(event.target.value)} type="text" name="state" id="state" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label htmlFor="" className="error-label">{staterror}</label>
            </div>
          </Box>
          <Box sx={{display:'flex', width:'100%', gap:'30px'}}>
            <div className='w-full flex-1'>
                <label htmlFor="">Country</label>
                <input value={country} onChange={(event) => setCountry(event.target.value)} type="text" name="country" id="country" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label htmlFor="" className="error-label">{countryerror}</label>
            </div>

            <div className='w-full flex-1'>
                <label htmlFor="">Pincode</label>
                <input value={pincode} onChange={(event) => setpincode(event.target.value)} type="text" name="pincode" id="pincode" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                <label htmlFor="" className="error-label">{pincodeerror}</label>
            </div>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <label htmlFor="">About</label>
            <textarea value={about} onChange={(event) => setabout(event.target.value)} name="about" id="about" className='outline-none border border-gray-400 w-full mt-2 block p-2 rounded h-fit'></textarea>
            <label htmlFor="" className="error-label">{abouterror}</label>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <button type="submit" className="bg-blue-500 p-1 w-full rounded">Save</button>
            <button type="button" className="bg-gray-400 p-1 w-full rounded mt-2" onClick={handCloseProfileEdit}>Cancel</button>
          </Box>
          </form>
        </Box>
      </Modal>
   
            <GeneralModal
                size='medium'
                openModal={openProfilePhotoModal} 
                closeModal={closeProfilePhoto}
                children={<EditProfilePictureComponent profilePicture={candidate?.userDetails?.profilePicture} onSaveProfilePhoto={profilePictureOnSave} onDeleteProfilePhoto={profilePictureOnDelete} />}
            />

            <GeneralModal
            size='medium'
                openModal={openCoverphotoModal}
                closeModal={closeCoverphoto}
                children={<EditCoverphotoComponent coverPhoto={candidate?.userDetails?.coverPhoto} onSaveCoverPhoto={coverPhotoOnSave} onDeleteCoverPhoto={coverPhotoOnDelete} />}
            />
        </>
    )
}