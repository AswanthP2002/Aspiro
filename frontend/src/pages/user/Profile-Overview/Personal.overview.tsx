import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Notify } from 'notiflix';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, Modal } from '@mui/material';
import { logout } from '../../../redux/candidateAuthSlice';
import {
  addSocialmediaLinks,
  editUserProfile,
  getMyProfileData,
  removeSocialLink,
} from '../../../services/userServices';
import GeneralModal from '../../../components/common/Modal';
import EditProfilePictureComponent from '../../../components/candidate/EditProfilePhotoComponent';
import EditCoverphotoComponent from '../../../components/candidate/EditCoverPhotoComponent';
import { FollowerData, MyProfileDTO, SocialLinks } from '../../../types/entityTypes';
import { Controller, useForm } from 'react-hook-form';
import { FaEye, FaGithub, FaGlobe, FaInstagram, FaLinkedin, FaPenSquare, FaPlus } from 'react-icons/fa';
import { BsEnvelope } from 'react-icons/bs';
import { FaCircleXmark } from 'react-icons/fa6';
import { LuPhone, LuUser } from 'react-icons/lu';
import { BiAlignLeft, BiCheckCircle, BiMapPin, BiSearch } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { toast } from 'react-toastify';
import { getFollowers, removeAFollower } from '../../../services/followServices';
import FollowersModal from '../../../components/user/Followers.modal';
import FollowingsModal from '../../../components/user/Followings.modal';
import ConnectionsModal from '../../../components/user/Connections.modal';

interface ProfileFormState {
  name: string;
  headline: string; // Changed from role
  city: string;
  district: string;
  state: string;
  country: string;
  summary: string; // Changed from about
  pincode: string;
  phone: string
}


export default function ProfilePersonal() {
  const [user, setUser] = useState<MyProfileDTO | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  const [openprofileedit, setopenprofileedit] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)

  const [isConnectionsModalOpen, setIsConnectionsModalOpen] = useState(false)


  const openFollowersModal = () => setIsFollowersModalOpen(true)
  const closeFollowerModal = () => setIsFollowersModalOpen(false)

  const openFollowingModal = () => setIsFollowingModalOpen(true)
  const closeFollowingModal = () => setIsFollowingModalOpen(false)

  const openConnectionsModal = () => setIsConnectionsModalOpen(true)
  const closeConnectionsModal = () => setIsConnectionsModalOpen(false)

  const getSocialMediaIcons = (domain: string) => {
    if(domain.includes('linkedin')){
      return <FaLinkedin color='blue' size={20} />
    }else if(domain.includes('instagram')){
      return <FaInstagram color='red' size={20} />
    }else if(domain.includes('github')){
      return <FaGithub color='black' size={20}/>
    }else{
      return <FaGlobe color='gray' size={20} />
    }
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormState>({
    defaultValues: {
      name: user?.name,
      headline: user?.headline,
      city: user?.location?.city,
      district: user?.location?.district,
      state: user?.location?.state,
      country: user?.location?.country,
      summary: user?.summary,
      pincode: user?.location?.pincode,
      phone: user?.phone
    },
  });

  const [openProfilePhotoModal, setOpenProfilePhotoModal] = useState(false);
  const openProfilePhoto = () => setOpenProfilePhotoModal(true);
  const closeProfilePhoto = () => setOpenProfilePhotoModal(false);

  const [openCoverphotoModal, setOpenCoverphotoModal] = useState(false);
  const openCoverphoto = () => setOpenCoverphotoModal(true);
  const closeCoverphoto = () => setOpenCoverphotoModal(false);

  const [isAddLinkButtonClicked, setIsAddLinkButtonClicked] = useState(false);
  const [socialmediaurl, setsocialmediaurl] = useState('');
  const [socialmediaurlerror, setsocialmediaurlerror] = useState('');

  const dispatcher = useDispatch();

  const handleOpenProfileEdit = () => setopenprofileedit(true);
  const handCloseProfileEdit = () => setopenprofileedit(false);

  const navigateTo = useNavigate();

  async function profileEditOnSubmit(data: ProfileFormState) {
    const { name, headline, city, district, state, country, summary, pincode, phone } = data;
    toast.success('checking flow success')
    try {
      setloading(true)
      const result = await editUserProfile(
        name,
        headline,
        city,
        district,
        state,
        country,
        summary,
        pincode,
        phone
      )

      if (result?.success) {
        Swal.fire({
          icon: 'success',
          title: 'Updated',
          text: 'Your profile has been updated successfully.',
          showConfirmButton: false,
          showCancelButton: false,
          allowOutsideClick: false,
          timer: 3000,
        }).then(() => {
          setUser((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              name: name,
              headline: headline,
              summary: summary,
              location: {
                ...prev.location,
                city: city,
                district: district,
                state: state,
                country: country,
                pincode: pincode,
              },
              phone: phone
            };
          });
        });
      } else {
        Notify.failure(result?.message, { timeout: 1500 })
      }
    } catch (error: unknown) {
      Notify.failure(error instanceof Error ? error.message : "Something went wrong", {timeout:1700})
    } finally {
      setloading(false)
      handCloseProfileEdit();
    }
  }

  const profilePictureOnSave = (url: string, publicId: string) => {
    setUser((prv: MyProfileDTO | null) => {
      if (!prv) return null;
      return {
        ...prv,
        profilePicture:{
          cloudinaryPublicId: publicId,
          cloudinarySecureUrl: url
        }
      };
    });
    closeProfilePhoto();
  };

  const profilePictureOnDelete = () => {
    setUser((prv: MyProfileDTO | null) => {
      if (!prv) return null;
      return {
        ...prv,
        profilePicture:{
          cloudinaryPublicId: '',
          cloudinarySecureUrl: ''
        }
      };
    });
    closeProfilePhoto();
  };

  const coverPhotoOnSave = (url: string, publicId: string) => {
    setUser((prv: MyProfileDTO | null) => {
      if (!prv) return null;
      return {
       ...prv,
       coverPhoto:{
        cloudinaryPublicId: publicId,
        cloudinarySecureUrl: url
       }
      };
    });
    closeCoverphoto();
  };

  const coverPhotoOnDelete = () => {
    setUser((prv) => {
      if (!prv) return null;
      return {
        ...prv,
        coverPhoto: {
          cloudinarySecureUrl: '',
          cloudinaryPublicId: '',
        },
      };
    });

    closeCoverphoto();
  };

  const onRemovingFollower = () => {
    setUser((userData: MyProfileDTO | null) => {
      if(!userData) return null
      return {
        ...userData,
        followers: userData.followers && userData.followers > 0 ? userData.followers -1 : 0
      }
    })
  }

  const onRemoveconnection = () => {
    setUser((userData: MyProfileDTO | null) => {
      if(!userData) return null
      return {
        ...userData,
        connections: userData.connections && userData.connections > 0 ? userData.connections - 1 : 0
      }
    })
  }

  const onUnFollow = () => {
    setUser((userData: MyProfileDTO | null) => {
      if(!userData) return null
      return {
        ...userData,
        following: userData.following && userData.following > 0 ? userData.following - 1 : 0
      }
    })
  }

  useEffect(() => {
    const fetchCandidateData = async () => {
      setloading(true);

      const result = await getMyProfileData();

      if (result?.success) {
        
        if (!result?.userDetails?.headline) {
          navigateTo('/store/details', {
            state: {
              userName: result?.userDetails?.name,
              userId: result?.userDetails?._id,
            },
          });
          return;
        }
        setUser(result?.userDetails);
        setloading(false);
      } else {
        setloading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: result.message,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatcher(logout());
            navigateTo('/');
          }
        });
      }
    };

    fetchCandidateData();
  }, []);

  useEffect(() => {
    if (user && openprofileedit) {
      reset({
        name: user.name,
        headline: user.headline,
        city: user.location?.city,
        district: user.location?.district,
        state: user.location?.state,
        country: user.location?.country,
        summary: user.summary,
        pincode: user.location?.pincode,
        phone: user.phone
      });
    }
  }, [user, openprofileedit]);

  async function addSocialMedialink() {
    setloading(true)
    if (
      !/https?:\/\/(www\.)?(linkedin\.com|twitter\.com|facebook\.com|instagram\.com|github\.com|t\.me|youtube\.com|behance\.net|dribbble\.com)\/[a-zA-Z0-9._\-\/]+/.test(
        socialmediaurl
      )
    ) {
      setsocialmediaurlerror('This url is not valid');
      setloading(false)
      return;
    } else {
      setsocialmediaurlerror('');
    }

    if (
      socialmediaurl.includes('<script>') ||
      socialmediaurl.includes('</script>') ||
      !socialmediaurl
    ) {
      setsocialmediaurl('Invalid url');
      setloading(false)
      return;
    } else {
      setsocialmediaurlerror('');
    }
    const url = new URL(socialmediaurl);

    const result = await addSocialmediaLinks(socialmediaurl);

    try {
      if (result.success) {
        toast.success(result?.message)
        setUser((prv) => {
          if (!prv) return null;
          return {
            ...prv,
            socialLinks: [...prv.socialLinks, { domain: url.hostname, url: socialmediaurl }],
          };
        });
        setsocialmediaurl('');
        setIsAddLinkButtonClicked(false);
      } else {
        Notify.failure(result?.message, { timeout: 1000 });
      }
    } catch (error: unknown) {
      Notify.failure(error instanceof Error ? error?.message : 'Something went wrong', {timeout:1500})
    } finally {
      setloading(false)
    }
  }

  async function deleteSocialLink(domain: string) {
    Swal.fire({
      icon:'warning',
      title:'Delete Link?',
      showConfirmButton:true,
      confirmButtonText:'Delete',
      showCancelButton:true,
      allowOutsideClick:false,
    }).then(async (result) => {
      if(result.isConfirmed){
        try {
      const result = await removeSocialLink(domain);
  
      if (result?.success) {
        toast.success(result?.message)
        setUser((prv) => {
          if (!prv) return null;
          return {
            ...prv,
            socialLinks: prv?.socialLinks.filter((link: SocialLinks) => link.domain !== domain),
          };
        });
      } else {
        toast.warn(result.message)
      }
    } catch (error: unknown) {
          toast.error(error instanceof Error ? error.message : 'Can not remove social link')
    }
      }else{
        return
      }
    })
  }


  return (
    <>
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
        {user?.coverPhoto?.cloudinarySecureUrl && (
          <img className='w-full h-full object-cover' src={user.coverPhoto.cloudinarySecureUrl} alt="" />
        )}
        <button onClick={openCoverphoto} className="absolute top-4 right-4 !xl:bottom-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all">
          <FaPenSquare size={18} />
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-24 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="relative">
                {user?.profilePicture?.cloudinarySecureUrl
                  ? <>
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-slate-300 p-1">
                        <img className='w-full h-full object-cover rounded-full' src={user.profilePicture.cloudinarySecureUrl} alt="" />
                      </div>
                    </>
                  : <>
                      <div className="w-32 h-32 md:w-40 md:h-40 bg-indigo-500 rounded-full border-4 border-white shadow-md flex items-center justify-center text-white text-5xl font-bold">
                        <p>{user && user.name ? user?.name[0] : "U"}</p>
                      </div>
                    </>
                }
                <button onClick={openProfilePhoto} className="absolute bottom-2 right-2 p-2 bg-white shadow-lg rounded-full border border-gray-100 text-gray-600 hover:text-blue-600">
                  <FaPenSquare size={16} />
                </button>
              </div>

              <div className="text-center md:text-left pb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-blue-600 font-medium text-lg">{user?.headline}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-sm text-gray-500 font-medium">
                  <span onClick={openFollowersModal} className="hover:text-blue-600 cursor-pointer">{user?.followers} followers</span>
                  <span onClick={openConnectionsModal} className="hover:text-blue-600 cursor-pointer">{user?.connections} connections</span>
                  <span className="flex items-center gap-1"><BiMapPin size={14}/> {user?.location?.city}, {user?.location?.district}, {user?.location?.state}, {user?.location?.country}</span>
                </div>
              </div>
            </div>

            <button onClick={handleOpenProfileEdit} className="flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
              <FaPenSquare size={18} />
              Edit profile
            </button>
          </div>

          <div className="grid grid-cols-3 mt-10 pt-8 border-t border-gray-100">
            <div className="text-center border-r border-gray-100">
              <p className="text-xl font-bold text-gray-900">{user?.applicationsCount?.length}</p>
              <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-semibold">Applications</p>
            </div>
            <div className="text-center border-r border-gray-100">
              <p className="text-xl font-bold text-gray-900">{user?.savedJobs?.length}</p>
              <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-semibold">Saved Jobs</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900 flex items-center justify-center gap-1">
                <FaEye size={20} className="text-gray-400" /> {user?.views?.length}
              </p>
              <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-semibold">Profile Views</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {/* About Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="!text-lg font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {user?.summary}
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="!text-lg font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><BsEnvelope size={20}/></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                  <p className="text-sm text-gray-900 font-medium break-all">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-50 rounded-lg text-green-600"><LuPhone size={20}/></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Phone</p>
                  {user?.phone
                    ? <p className="text-sm text-gray-900 font-medium break-all">{user.phone}</p>
                    : <p className="text-sm text-gray-500 italic font-medium">Not provided</p>
                  }
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><BiMapPin size={20}/></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Location</p>
                  <p className="text-sm text-gray-900 font-medium">{`${user?.location?.city}, ${user?.location?.district}, ${user?.location?.state}`}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Social Links */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="!text-lg font-bold text-gray-900">Social Links</h2>
              <button onClick={() => setIsAddLinkButtonClicked(prv => !prv)} className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <FaPlus size={16} /> Add link
              </button>
            </div>
            <div>
              {
                isAddLinkButtonClicked && (
                  <>
                  <div className="w-full border border-slate-300  flex px-2 py-1 mt-3 items-center gap-2 border border-gray-200 rounded-md ">
                    <input value={socialmediaurl} onChange={(e) => setsocialmediaurl(e.target.value)} placeholder='Enter url' type="text" className='flex-1' />
                    <Button
                      variant='contained'
                      loading={loading}
                      sx={{
                        height:'30px'
                      }}
                      onClick={addSocialMedialink}
                    >Add</Button>
                  </div>
                  <label htmlFor="" className="absolute error-label !text-xs text-red block">
                       {socialmediaurlerror}
                  </label>
                  </>
                )
              }
            </div>
            <div className="grid grid-cols-1 gap-2 mt-5">
              {
                user?.socialLinks?.map((link: {domain: string, url: string}, index: number) => (
                  <div 
  key={index} 
  className="group flex gap-4 items-center p-3 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-200"
>
  <div className="bg-blue-50 w-12 h-12 flex shrink-0 justify-center items-center rounded-xl text-blue-600 group-hover:bg-blue-200 group-hover:text-white transition-colors duration-200">
    {getSocialMediaIcons(link.domain)}
  </div>

  <div className="flex-1 min-w-0">
    <p className="text-sm font-bold text-gray-900 capitalize tracking-tight">
      {link.domain.split(".").slice(1, 2)}
    </p>
    <p className="text-xs text-gray-500 truncate font-medium">
      {link.url.replace(/^https?:\/\//, '')}
    </p>
  </div>

  <div className="flex justify-end items-center">
    <button 
      onClick={() => deleteSocialLink(link.domain)}
      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
      title="Remove link"
    >
      <FaCircleXmark size={18} />
    </button>
  </div>
</div>
                ))
              }
            </div>
            {user?.socialLinks?.length === 0 && (
              <p className="text-center py-8 text-gray-400 font-medium italic border-2 border-dashed border-gray-100 rounded-xl">
              No links added yet
            </p>
            )}
          </section>
        </div>
      </div>
    </div>

      {/* Prfile edit modal */}
      {openprofileedit && (
        <Modal
      open={openprofileedit}
      onClose={handCloseProfileEdit}
      aria-labelledby="edit-profile-modal-title"
      className="flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden outline-none flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white">
          <div>
            <h3 id="edit-profile-modal-title" className="text-xl font-bold text-gray-900">Edit Profile</h3>
            <p className="text-sm text-gray-500 font-medium">Update your Aspiro professional identity</p>
          </div>
          <button 
            onClick={handCloseProfileEdit}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CgClose size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit(profileEditOnSubmit)} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <LuUser size={14} /> Basic Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required', minLength: 3, pattern:{value: /^[a-zA-ZÀ-ÿ-'.]+(?: [a-zA-ZÀ-ÿ-'.]+)*$/, message: 'Enter a valid name'} }}
                  render={({ field }) => (
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                      <input 
                        {...field}
                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50/30' : 'border-gray-200'} focus:ring-4 focus:ring-blue-50 outline-none transition-all`}
                      />
                      {errors.name && <p className="text-[10px] text-red-500 ml-1">{errors.name.message}</p>}
                    </div>
                  )}
                />
                <Controller
                  name="headline"
                  control={control}
                  rules={{required: 'Headline can not be empty',}}
                  render={({ field }) => (
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Professional Headline</label>
                      <input 
                        {...field}
                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.headline ? 'border-red-500' : 'border-gray-200'} focus:ring-4 focus:ring-blue-50 outline-none transition-all`}
                      />
                      {errors.headline && <p className="text-[10px] text-red-500 ml-1">{errors.headline.message}</p>}
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50">
              <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <BiMapPin size={14} /> Location & Region
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Controller name="city" control={control} rules={{required: 'City can not be emtpy', pattern:{value: /^[a-zA-ZÀ-ÿ-'.]+(?: [a-zA-ZÀ-ÿ-'.]+)*$/, message: 'Enter a valid city name'}}} render={({ field }) => (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 ml-1">City</label>
                    <input {...field} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-purple-400" />
                    {errors.city && <p className="text-[10px] text-red-500 ml-1">{errors.city.message}</p>}
                  </div>
                )} />
                <Controller name="district" control={control} rules={{required: 'District can not be emtpy', pattern:{value: /^[a-zA-ZÀ-ÿ-'.]+(?: [a-zA-ZÀ-ÿ-'.]+)*$/, message: 'Enter a valid district name'}}} render={({ field }) => (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 ml-1">District</label>
                    <input {...field} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-purple-400" />
                    {errors.district && <p className="text-[10px] text-red-500 ml-1">{errors.district.message}</p>}
                  </div>
                )} />
                <Controller name="state" control={control} rules={{required: 'State can not be emtpy', pattern:{value: /^[a-zA-ZÀ-ÿ-'.]+(?: [a-zA-ZÀ-ÿ-'.]+)*$/, message: 'Enter a valid state name'}}} render={({ field }) => (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 ml-1">State</label>
                    <input {...field} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-purple-400" />
                    {errors.state && <p className="text-[10px] text-red-500 ml-1">{errors.state.message}</p>}
                  </div>
                )} />
                <Controller name="country" control={control} rules={{required: 'Country can not be emtpy', pattern:{value: /^[a-zA-ZÀ-ÿ-'.]+(?: [a-zA-ZÀ-ÿ-'.]+)*$/, message: 'Enter a valid country name'}}} render={({ field }) => (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 ml-1">Country</label>
                    <input {...field} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-purple-400" />
                    {errors.country && <p className="text-[10px] text-red-500 ml-1">{errors.country.message}</p>}
                  </div>
                )} />
                <Controller name="pincode" control={control} rules={{required: 'Pincode can not be emtpy', pattern:{value: /^[1-9][0-9]{5}$/, message: 'Enter a valid pincode'}}} render={({ field }) => (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 ml-1">Pincode</label>
                    <input {...field} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-purple-400" />
                    {errors.pincode && <p className="text-[10px] text-red-500 ml-1">{errors.pincode.message}</p>}
                  </div>
                )} />
                <Controller name="phone" control={control} rules={{required: 'Phone number is required', pattern:{value: /^(?:\+91|0)?[6-9]\d{9}$/, message: 'Enter a valid number'}}} render={({ field }) => (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 ml-1">Phone</label>
                    <input {...field} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-purple-400" />
                    {errors.phone && <p className="text-[10px] text-red-500 ml-1">{errors.phone.message}</p>}
                  </div>
                )} />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50">
              <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <BiAlignLeft size={14} /> About You
              </h4>
              <Controller
                name="summary"
                control={control}
                rules={{
                  required: 'Summary can not be empty',
                  minLength: {value: 30, message: 'Minimum 30 charecters'},
                  max: {value: 400, message: "Maximum 400 charecters"}
                }}
                render={({ field }) => (
                  <div className="space-y-1">
                    <textarea 
                      {...field}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.summary ? 'border-red-500' : 'border-gray-200'} focus:ring-4 focus:ring-green-50 outline-none transition-all text-sm leading-relaxed resize-none`}
                      placeholder="Share your story..."
                    />
                    {errors.summary && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.summary.message}</p>}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 flex gap-3">
            <button 
              type="button"
              onClick={handCloseProfileEdit}
              className="flex-1 px-6 py-3 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <CircularProgress size={18} color="inherit" /> : <><BiCheckCircle size={18} /> Save changes</>}
            </button>
          </div>
        </form>
      </div>
    </Modal>
      )}

      <GeneralModal size="medium" openModal={openProfilePhotoModal} closeModal={closeProfilePhoto}>
        <EditProfilePictureComponent
          profilePicture={user?.profilePicture}
          onSaveProfilePhoto={profilePictureOnSave}
          onDeleteProfilePhoto={profilePictureOnDelete}
        />
      </GeneralModal>

      <GeneralModal size="medium" openModal={openCoverphotoModal} closeModal={closeCoverphoto}>
        <EditCoverphotoComponent
          coverPhoto={user?.coverPhoto}
          onSaveCoverPhoto={coverPhotoOnSave}
          onDeleteCoverPhoto={coverPhotoOnDelete}
        />
      </GeneralModal>

      {isFollowersModalOpen && (<FollowersModal onFollowerRemoval={onRemovingFollower} isOpen={isFollowersModalOpen} onClose={closeFollowerModal} userId={user?._id as string} />)}
      {isFollowingModalOpen && (<FollowingsModal onUnFollow={onUnFollow} isOpen={isFollowingModalOpen} onClose={closeFollowingModal} userId={user?._id as string} />)}
      {isConnectionsModalOpen && (<ConnectionsModal isOpen={isConnectionsModalOpen} onClose={closeConnectionsModal} userId={user?._id as string} onRemoveConnection={onRemoveconnection} />)}
    </>
  );
}