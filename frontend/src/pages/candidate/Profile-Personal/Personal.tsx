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
import { addSocialmediaLinks, editCandidateProfile, getCandidateProfileData, getUserPosts, removeSocialLink } from '../../../services/userServices'
import SocialmediaLinks from '../../../components/candidate/SocialmediaLinksCard'
import CropComponent from '../../../components/common/CropComponent'
import GeneralModal from '../../../components/common/Modal'
import EditProfilePictureComponent from '../../../components/candidate/EditProfilePhotoComponent'
import EditCoverphotoComponent from '../../../components/candidate/EditCoverPhotoComponent'
import Post from '../../../components/common/Post'
import { SocialLinks, UserType } from '../../../types/entityTypes'

interface ProfileFormState {
    name?: string;
    headline?: string; // Changed from role
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    summary?: string; // Changed from about
    pincode?: string;
}

type ValidationErrors = Partial<Record<keyof ProfileFormState, string>>;

export default function ProfilePersonal(){
    const [user, setUser] = useState<UserType | null>(null);
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

    const [formState, setFormState] = useState<ProfileFormState>({});
    const [errors, setErrors] = useState<ValidationErrors>({});

    const dispatcher = useDispatch()
    

    const handleOpenProfileEdit = () => setopenprofileedit(true)
    const handCloseProfileEdit = () => setopenprofileedit(false)
 
    const navigateTo = useNavigate()

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};
        if (!formState.name || !/^[A-Za-z\s.'-]{2,50}$/.test(formState.name)) newErrors.name = 'Enter a valid name';
        if (!formState.headline || !/^[A-Za-z\s.'-]{2,50}$/.test(formState.headline)) newErrors.headline = 'Enter a valid headline/role';
        if (!formState.city || !/^[A-Za-z\s.'-]{2,50}$/.test(formState.city)) newErrors.city = 'Enter a valid city';
        if (!formState.district || !/^[A-Za-z\s.'-]{2,50}$/.test(formState.district)) newErrors.district = 'Enter a valid district';
        if (!formState.state || !/^[A-Za-z\s.'-]{2,50}$/.test(formState.state)) newErrors.state = 'Enter a valid state';
        if (!formState.country || !/^[A-Za-z\s.'-]{2,50}$/.test(formState.country)) newErrors.country = 'Enter a valid country';
        if (!formState.summary || formState.summary.length < 10) newErrors.summary = 'Summary must be at least 10 characters';
        if (!formState.pincode || !/^[1-9][0-9]{5}$/.test(formState.pincode)) newErrors.pincode = 'Enter a valid 6-digit pincode';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function editProfile(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()

        if (!validateForm()) return;
        
        handCloseProfileEdit()

        const { name, headline, city, district, state, country, summary, pincode } = formState;
        const result = await editCandidateProfile(name, headline, city, district, state, country, summary, pincode);

            if(result?.success){
                //setloading(false)
                Swal.fire({
                    icon:'success',
                    title:'Updated',
                    text:"Your profile has been updated successfully.",
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:3000
                }).then(() => {
                    setUser((prev) => {
                        if (!prev) return null;
                        return {
                            ...prev,
                            name: formState.name,
                            headline: formState.headline,
                            summary: formState.summary,
                            location: {
                                ...prev.location,
                                city: formState.city,
                                district: formState.district,
                                state: formState.state,
                                country: formState.country,
                                pincode: formState.pincode,
                            }
                        };
                    });
                })
            }else{
                 Swal.fire({
                    icon:'warning',
                    title:'Something went wrong'
                 })
            }

    }

    const profilePictureOnSave = (url : string) => {
        setUser((prv) => {
            if(!prv) return prv
            return{
                ...prv,
                profilePicture:{
                    ...prv.profilePicture,
                    cloudinarySecureUrl:url
                }
            }
        })
        closeProfilePhoto()
    }

    const profilePictureOnDelete = () => {
        setUser((prv) => {
            if (!prv) return null;
            return {
                ...prv,
                profilePicture:{
                    cloudinaryPublicId:"",
                    cloudinarySecureUrl:""
                }
            }
        })
        closeProfilePhoto()
    }

    const coverPhotoOnSave = (url : string) => {
        setUser((prv) => {
            if(!prv) return prv
            return {
                ...prv,
                coverPhoto:{
                    ...prv.coverPhoto,
                    cloudinarySecureUrl:url
                }
            }
        })
        closeCoverphoto()
    }

    const coverPhotoOnDelete = () => {
        setUser((prv) => {
            if (!prv) return null;
            return {
                ...prv,
                coverPhoto:{
                    cloudinarySecureUrl:"",
                    cloudinaryPublicId:""
                }
            }
        })

        closeCoverphoto()
    }

    useEffect(() => {
        const fetchCandidateData = async () => {
            setloading(true)

            const result = await getCandidateProfileData()

            if(result?.success){
                console.log('user personal details from the backend', result)
                //This check might be for first-time users to complete their profile.
                if(!result?.userDetails?.headline){
                    navigateTo('/store/details', {
                        state:{
                            userName:result?.userDetails?.name,
                            userId:result?.userDetails?._id
                        }
                    })
                    return
                }
                setUser(result?.userDetails)
                //setUserPosts(postResult?.result)
                setloading(false)
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
        // When the edit modal is opened, populate the form with the current user data.
        if (user && openprofileedit) {
            setFormState({
                name: user.name,
                headline: user.headline,
                city: user.location?.city,
                district: user.location?.district,
                state: user.location?.state,
                country: user.location?.country,
                summary: user.summary,
                pincode: user.location?.pincode,
            });
        }
    }, [user, openprofileedit]);

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
            setUser((prv) => {
                if (!prv) return null;
                return {
                    ...prv, //social links changed optional to required
                    socialLinks:[...prv.socialLinks, {domain:url.hostname, url:socialmediaurl}]
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
            setUser((prv) => {
                if (!prv) return null;
                return {
                    ...prv,
                    socialLinks:prv.socialLinks.filter((link : SocialLinks) => link.domain !== domain)
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
                    <img style={{objectFit:'cover'}} src={user?.coverPhoto?.cloudinarySecureUrl || defaultCoverPhoto} className='w-full h-[220px]' alt="Cover photo" />
                    <i onClick={openCoverphoto} className="fa-solid fa-pen-to-square cursor-pointer absolute right-2 bottom-2"></i>
                </div>
                <CropComponent crop={crop} zoom={zoom} setCrop={setCrop} setZoom={setZoom} image={image} />
                <div className="absolute bottom-2 left-2 w-fit h-fit">
                    <div className="relative">
                        <img style={{objectFit:'cover'}} src={user?.profilePicture?.cloudinarySecureUrl || defaultProfile} alt="Profile" className="profile-photo rounded-full w-[100px] h-[105px]" />
                        <i onClick={openProfilePhoto} className="cursor-pointer fa-solid fa-pen-to-square absolute bottom-1 left-10"></i>
                    </div>
                </div>
                </div>
                <div className='mt-4 px-5 flex justify-between pb-4'>
                    <div className='w-full'>
                        <p className="font-semibold text-xl">{user?.name}</p>
                        <p className='mt-3'><span><i className="fa-solid fa-briefcase me-3"></i></span>{user?.headline}</p>
                        <p className="text-gray-400 text-sm mt-1"><span><i className="fa-solid fa-location-dot !text-sm !text-gray-400 me-3"></i>{user?.location?.district}, {user?.location?.state}</span></p>
                    </div>
                    <div className="w-full flex justify-end items-end pb-5">
                        <button onClick={handleOpenProfileEdit} className='border rounded border-gray-300 text-sm px-2 py-1'>Edit profile <i className="!text-sm fa-solid fa-pen-to-square"></i></button>
                    </div>
                </div>
            </div>
            <section className='mt-8'>
            <div>
                <p className="title font-semibold">About</p>
                <p className='mt-3 text-sm text-gray-500'>{user?.summary}</p>
            </div>
            <div className='flex gap-20 mt-5'>
                <div>
                    <p className="text-bold">Email</p>
                    <p className='text-sm text-gray-500 mt-1'>{user?.email}</p>
                </div>
                <div>
                    <p className="text-bold">Phone</p>
                    <p className='text-sm text-gray-500 mt-1'>{user?.phone}</p>
                </div>
                <div>
                    <p className="text-bold">Location</p>
                    <p className='text-sm text-gray-500 mt-1'>{user?.location?.district}, {user?.location?.state}, {user?.location?.country}</p>
                </div>
            </div>
            </section>
            <hr className='mt-5' />
            <div>
                <p className="font-semibold mt-3">Social Links</p>
                <div className="social-links">
                    {
                        user && user?.socialLinks?.length > 0
                            ?
                            user?.socialLinks?.map((links : any, index : number) => {
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
        <Modal open={openprofileedit} onClose={handCloseProfileEdit} aria-labelledby="edit-profile-modal-title">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', minWidth: 400, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4 }}>
            <form onSubmit={editProfile}>
            <div className='w-full flex justify-end'>
                <button onClick={handCloseProfileEdit} type="button" className=""><i className="fa-solid fa-close"></i></button>
            </div>
          <Typography id="edit-profile-modal-title" variant="h6" component="h2" sx={{textAlign:'center'}}>Edit Profile</Typography>
          <Box sx={{width:'100%'}}>
            <label htmlFor="">Name</label>
            <input value={formState.name} onChange={handleFormChange} type="text" name="name" id="name" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
            {errors.name && <label className='error-label'>{errors.name}</label>}
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <label htmlFor="">Headline</label>
            <input value={formState.headline} onChange={handleFormChange} type="text" name="headline" id="headline" className="outline-none border border-gray-400 w-full md:w-200 mt-2 block p-2 rounded" />
            {errors.headline && <label htmlFor="" className="error-label">{errors.headline}</label>}
          </Box>
          <Box sx={{width:'100%', marginTop:'10px', display:'flex', gap:'30px', justifyContent:'space-between'}}>
            <div className='flex-1'>
                <label htmlFor="">City</label>
                <input value={formState.city} onChange={handleFormChange} type="text" name="city" id="city" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                {errors.city && <label htmlFor="" className="error-label">{errors.city}</label>}
            </div>
            <div className='flex-1'>
                <label htmlFor="">District</label>
                <input value={formState.district} onChange={handleFormChange} type="text" name="district" id="district" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                {errors.district && <label htmlFor="" className="error-label">{errors.district}</label>}
            </div>

            <div className='flex-1'>
                <label htmlFor="">State</label>
                <input value={formState.state} onChange={handleFormChange} type="text" name="state" id="state" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                {errors.state && <label htmlFor="" className="error-label">{errors.state}</label>}
            </div>
          </Box>
          <Box sx={{display:'flex', width:'100%', gap:'30px'}}>
            <div className='w-full flex-1'>
                <label htmlFor="">Country</label>
                <input value={formState.country} onChange={handleFormChange} type="text" name="country" id="country" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                {errors.country && <label htmlFor="" className="error-label">{errors.country}</label>}
            </div>

            <div className='w-full flex-1'>
                <label htmlFor="">Pincode</label>
                <input value={formState.pincode} onChange={handleFormChange} type="text" name="pincode" id="pincode" className="outline-none border border-gray-400 w-full mt-2 block p-2 rounded" />
                {errors.pincode && <label htmlFor="" className="error-label">{errors.pincode}</label>}
            </div>
          </Box>
          <Box sx={{width:'100%', marginTop:'10px'}}>
            <label htmlFor="">Summary</label>
            <textarea value={formState.summary} onChange={handleFormChange} name="summary" id="summary" className='outline-none border border-gray-400 w-full mt-2 block p-2 rounded h-fit'></textarea>
            {errors.summary && <label htmlFor="" className="error-label">{errors.summary}</label>}
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
                closeModal={closeProfilePhoto} >
                <EditProfilePictureComponent profilePicture={user?.profilePicture} onSaveProfilePhoto={profilePictureOnSave} onDeleteProfilePhoto={profilePictureOnDelete} />
            </GeneralModal>

            <GeneralModal
                size='medium'
                openModal={openCoverphotoModal}
                closeModal={closeCoverphoto} >
                <EditCoverphotoComponent coverPhoto={user?.coverPhoto} onSaveCoverPhoto={coverPhotoOnSave} onDeleteCoverPhoto={coverPhotoOnDelete} />
            </GeneralModal>
        </>
    )
}