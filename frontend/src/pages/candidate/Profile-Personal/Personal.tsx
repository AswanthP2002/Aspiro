import { useEffect, useState } from 'react';
import defaultCoverPhoto from '/default-cover-photo.jpg';
import defaultProfile from '/default-img-instagram.png';
import { useDispatch } from 'react-redux';
import { Notify } from 'notiflix';
import Swal from 'sweetalert2';
import Loader from '../../../components/candidate/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { Box, FormControl, Modal, TextField, Typography } from '@mui/material';
import { logout } from '../../../redux-toolkit/candidateAuthSlice';
import {
  addSocialmediaLinks,
  editUserProfile,
  getCandidateProfileData,
  removeSocialLink,
  saveBasicDetails,
} from '../../../services/userServices';
import SocialmediaLinks from '../../../components/candidate/SocialmediaLinksCard';
import CropComponent from '../../../components/common/CropComponent';
import GeneralModal from '../../../components/common/Modal';
import EditProfilePictureComponent from '../../../components/candidate/EditProfilePhotoComponent';
import EditCoverphotoComponent from '../../../components/candidate/EditCoverPhotoComponent';
import Post from '../../../components/common/Post';
import { SocialLinks, UserType } from '../../../types/entityTypes';
import { Controller, useForm } from 'react-hook-form';
import { Textarea } from '@mui/joy';
import RecruiterInfoCard from '../../../components/recruiter/RecruiterInfoCard';
import { IoLocation } from 'react-icons/io5';
import { FaEye, FaGithub, FaInstagram, FaLinkedin, FaPlus } from 'react-icons/fa';
import { MdOutlineCall } from 'react-icons/md';
import { BsEnvelope } from 'react-icons/bs';
import { FaCircleXmark } from 'react-icons/fa6';

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

// Dummy data for testing the recruiter profile view
const dummyUserWithRecruiterDetails = {
    isRecruiter: true,
    recruiterDetails: {
         _id: '12',
        userId: '11',
        employerType: 'company',
        organizationDetails: {
        organizationName: 'Aspiro',
        organizationType: 'Startup',
        industry: 'Information Technology',
        organizationContactNumber: '7560856614',
        organizationEmail: 'aspiro.hiring@gmail.com',
        socialLinks: [],
        teamStrength: '1-3',
        aboutCompany: 'Innovate Inc. is a leading provider of cutting-edge software solutions, dedicated to pushing the boundaries of technology and innovation. We foster a collaborative and creative environment.',
        website: 'https://www.aspiro.com',
        vision: 'To be the global leader in next-generation software solutions that empower businesses and individuals.',
    },
    }
};


const showDummyRecruiterProfile = true;


export default function ProfilePersonal() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setloading] = useState(false);
  const [openprofileedit, setopenprofileedit] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [activeProfileSection, setActiveProfileSection] = useState('personal');

  const getSocialMediaIcons = (domain: string) => {
    if(domain.includes('linkedin')){
      return <FaLinkedin color='blue' size={20} />
    }else if(domain.includes('instagram')){
      return <FaInstagram color='red' size={20} />
    }else if(domain.includes('github')){
      return <FaGithub color='black' size={20}/>
    }else{
      return
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
    },
  });

  const [openProfilePhotoModal, setOpenProfilePhotoModal] = useState(false);
  const openProfilePhoto = () => setOpenProfilePhotoModal(true);
  const closeProfilePhoto = () => setOpenProfilePhotoModal(false);

  const [openCoverphotoModal, setOpenCoverphotoModal] = useState(false);
  const openCoverphoto = () => setOpenCoverphotoModal(true);
  const closeCoverphoto = () => setOpenCoverphotoModal(false);

  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [image, setImage] = useState(null);

  const [isAddLinkButtonClicked, setIsAddLinkButtonClicked] = useState(false);
  const [socialmediaurl, setsocialmediaurl] = useState('');
  const [socialmediaurlerror, setsocialmediaurlerror] = useState('');

  const dispatcher = useDispatch();

  const handleOpenProfileEdit = () => setopenprofileedit(true);
  const handCloseProfileEdit = () => setopenprofileedit(false);

  const navigateTo = useNavigate();

  async function profileEditOnSubmit(data: ProfileFormState) {
    const { name, headline, city, district, state, country, summary, pincode } = data;
    handCloseProfileEdit();

    //const { name, headline, city, district, state, country, summary, pincode } = formState;
    try {
      // const result = await saveBasicDetails(
      //   headline as string,
      //   city as string,
      //   district as string,
      //   state as string,
      //   country as string,
      //   pincode as string,
      //   summary as string
      // );
      const result = await editUserProfile(
        name,
        headline,
        city,
        district,
        state,
        country,
        summary,
        pincode
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
            };
          });
        });
      } else {
        Notify.failure(result?.message, { timeout: 1500 })
      }
    } catch (error: unknown) {
      Notify.failure(error instanceof Error ? error.message : "Something went wrong", {timeout:1700})
    }
  }

  const profilePictureOnSave = (url: string) => {
    setUser((prv) => {
      if (!prv) return prv;
      return {
        ...prv,
        profilePicture: {
          ...prv.profilePicture,
          cloudinarySecureUrl: url,
        },
      };
    });
    closeProfilePhoto();
  };

  const profilePictureOnDelete = () => {
    setUser((prv) => {
      if (!prv) return null;
      return {
        ...prv,
        profilePicture: {
          cloudinaryPublicId: '',
          cloudinarySecureUrl: '',
        },
      };
    });
    closeProfilePhoto();
  };

  const coverPhotoOnSave = (url: string) => {
    setUser((prv) => {
      if (!prv) return prv;
      return {
        ...prv,
        coverPhoto: {
          ...prv.coverPhoto,
          cloudinarySecureUrl: url,
        },
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

  useEffect(() => {
    const fetchCandidateData = async () => {
      setloading(true);

      const result = await getCandidateProfileData();

      if (result?.success) {
        console.log('user personal details from the backend', result);
        //This check might be for first-time users to complete their profile.
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
        //setUserPosts(postResult?.result)
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
    // When the edit modal is opened, populate the form with the current user data.
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
      });
    }
  }, [user, openprofileedit]);

  async function addSocialMedialink() {
    if (
      !/https?:\/\/(www\.)?(linkedin\.com|twitter\.com|facebook\.com|instagram\.com|github\.com|t\.me|youtube\.com|behance\.net|dribbble\.com)\/[a-zA-Z0-9._\-\/]+/.test(
        socialmediaurl
      )
    ) {
      setsocialmediaurlerror('This url is not valid');
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
      return;
    } else {
      setsocialmediaurlerror('');
    }
    const url = new URL(socialmediaurl);

    const result = await addSocialmediaLinks(socialmediaurl);

    try {
      if (result.success) {
        Notify.success(result?.message, { timeout: 1000 });
        setUser((prv) => {
          if (!prv) return null;
          return {
            ...prv, //social links changed optional to required
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
        Notify.success(result?.message, { timeout: 1500 });
        setUser((prv) => {
          if (!prv) return null;
          return {
            ...prv,
            socialLinks: prv.socialLinks.filter((link: SocialLinks) => link.domain !== domain),
          };
        });
      } else {
        Notify.failure(result?.message, { timeout: 1500 });
      }
    } catch (error: unknown) {
        Notify.failure(error instanceof Error ? error?.message : 'Something went wrong', {timeout:1500})
    }
      }else{
        return
      }
    })
  }

  return (
    <>
      {/* {loading ? <Loader /> : null} */}
      <div className="p-0 md:p-5 lg:p-10">
        <div className="profile-card bg-white border border-gray-100">
          <div className="relative banner rounded-t-md bg-gradient-to-br from-blue-500 to-indigo-600 w-full h-40">
            {
              user?.coverPhoto?.cloudinaryPublicId && (
                <img style={{objectFit:'cover'}} className='w-full h-full' src={user?.coverPhoto?.cloudinarySecureUrl} alt="" />
              )
            }
            <i
                onClick={openCoverphoto}
                className="fa-solid fa-pen-to-square cursor-pointer absolute right-2 bottom-2"
              ></i>
          </div>
          <div className="flex flex-col md:flex-row px-3 gap-3" style={{marginTop:'-50px'}}>
            <div className="profile">
              <div className="relative flex items-center justify-center w-25 h-25 p-1 bg-white shadow-lg rounded-full">
                {
                  user?.profilePicture?.cloudinaryPublicId
                      ? (
                        <img style={{width:'100%', height:'100%', objectFit:'cover'}} className='rounded-full' src={user?.profilePicture?.cloudinarySecureUrl} alt="" />
                      )
                      : (
                        <div className="w-full h-full rounded-full flex justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-600">
                          <p className='text-white text-2xl'>C</p>
                        </div>
                      )
                }
                <i
                  onClick={openProfilePhoto}
                  className="cursor-pointer fa-solid fa-pen-to-square absolute -bottom-1 left-10"
                ></i>
              </div>
            </div>
            <div className="details">
              <p className='mt-3 md:mt-6 text-gray-700'>{user?.name}</p>
              <p className='mt-1 text-gray-700 text-sm font-light'>{user?.headline}</p>
              <div className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                <IoLocation />
                <p>{user?.location?.district}, {user?.location?.state}, {user?.location?.country}</p>
              </div>
            </div>
            <div className="action flex-1 flex md:justify-end items-end">
              <button
                onClick={handleOpenProfileEdit}
                className="border border-2 rounded-md text-sm px-2 flex items-center gap-2 py-1 text-blue-500 border-blue-500 "
              >
                Edit profile <i className="!text-sm !text-blue-500 fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          </div>
          <div className="border-t-2 py-3 border-gray-200 w-full flex justify-between mt-5">
            <div className='flex flex-col items-center justify-center w-1/3'>
              <p>12</p>
              <p className='text-sm text-gray-500'>Applications</p>
            </div>
            <div className='border-x border-gray-200 flex flex-col items-center justify-center w-1/3'>
              <p>8</p>
              <p className='text-sm text-gray-500'>Saved Jobs</p>
            </div>
            <div className='flex flex-col items-center justify-center w-1/3'>
              <span className='flex items-center gap-2'>
                <FaEye />
                14
              </span>
              <p className='text-sm text-gray-500'>Profile views</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-3 p-3'>
          <div className="border border-gray-100 rounded-md p-5 bg-white">
              <p className='text-sm font-medium'>About</p>
              <p className='mt-3 text-xs text-gray-500 leading-relaxed'>
                {user?.summary}
              </p>
          </div>

          <div className="border border-gray-100 rounded-md p-5 bg-white ">
              <p className='text-sm font-medium'>Contact Information</p>
              <div className="grid grid-cols-1 md w-full md:grid-cols-3 gap-5 mt-3">
                <div className='flex gap-2'>
                  <div><BsEnvelope color='gray' /></div>
                  <div>
                    <p className='text-xs text-gray-500'>Email</p>
                    <p className='text-sm mt-1'>{user?.email}</p>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div><MdOutlineCall color='gray' /></div>
                  <div>
                    <p className='text-xs text-gray-500'>Phone</p>
                    <p className='text-sm mt-1'>{user?.phone}</p>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <div><IoLocation color='gray' /></div>
                  <div>
                    <p className='text-xs text-gray-500'>Location</p>
                    <p className='text-sm mt-1'>{user?.location?.city}, {user?.location?.district}, {user?.location?.state}, {user?.location?.country}</p>
                  </div>
                </div>
              </div>
          </div>

          <div className="social-links p-5 bg-white border border-gray-100 rounded-md">
            <div className="w-full flex justify-between items-center">
              <p className='text-sm font-medium'>Social Links</p>
              <button onClick={() => setIsAddLinkButtonClicked(prv => !prv)} className='text-xs flex items-center justify-center gap-2 border border-gray-300 rounded-md p-2'>
                <FaPlus />
                Add link
              </button>
            </div>
            <div>
              {
                isAddLinkButtonClicked && (
                  <>
                  <div className="w-full bg-gray-200 flex px-2 py-1 mt-3 items-center gap-2 border border-gray-200 rounded-md ">
                    <input value={socialmediaurl} onChange={(e) => setsocialmediaurl(e.target.value)} placeholder='Enter url' type="text" className='flex-1' />
                    <button onClick={addSocialMedialink} className='border border-gray-200 text-xs !py-1 px-3 rounded-md bg-blue-200'>Add</button>
                  </div>
                  <label htmlFor="" className="absolute error-label !text-xs text-red block">
                       {socialmediaurlerror}
                  </label>
                  </>
                  // <div className="mt-2 mb-2 flex items-center">
                  //   <div className="relative">
                  //     <input
                  //       value={socialmediaurl}
                  //       onChange={(event) => setsocialmediaurl(event.target.value)}
                  //       type="text"
                  //       placeholder="enter url"
                  //       className="border w-[400px] border-gray-300 rounded p-1"
                  //     />
                  //     <label htmlFor="" className="absolute error-label text-xs text-red block">
                  //       {socialmediaurlerror}
                  //     </label>
                  //   </div>
                  //   <button
                  //     onClick={addSocialMedialink}
                  //     className="text-sm bg-black text-white rounded px-2 py-1 ms-1"
                  //   >
                  //     Add
                  //   </button>
                  //   <button
                  //     onClick={() => setIsAddLinkButtonClicked(false)}
                  //     className="text-sm border border-gray-300 rounded ms-1 py-1 px-2"
                  //   >
                  //     <i className="fa-solid fa-xmark-circle"></i>
                  //   </button>
                  // </div>
                )
              }
            </div>
            <div className="grid grid-cols-1 gap-2 mt-5">
              {
                user?.socialLinks?.map((link: {domain: string, url: string}, index: number) => (
                  <div key={index} className="flex gap-2 items-center">
                    <div className='bg-blue-100 w-10 h-10 flex justify-center items-center'>
                      {getSocialMediaIcons(link.domain)}
                    </div>
                    <div>
                      <p className='text-xs font-medium text-gray-500 '>{link.domain.split(".").slice(1, 2)}</p>
                      <p className='text-xs text-gray-700'>{link.url}</p>
                    </div>
                    <div className="flex-1 flex justify-end text-gray-700 items-center">
                      <button onClick={() => deleteSocialLink(link.domain)}><FaCircleXmark size={15} /></button>
                    </div>
                  </div>
                ))
              }
              {
                user?.socialLinks?.length === 0 && (
                  <p className='text-center text-xs text-gray-500'>No links added</p>
                )
              }
            </div>
          </div>

          <div className="social-links p-5 bg-white border border-gray-100 rounded-md">
            <div className="w-full flex justify-between items-center">
              <p className='text-sm font-medium'>Posts</p>
              <button className='text-xs flex items-center justify-center gap-2 border border-gray-300 rounded-md p-2'>
                <FaPlus />
                Create Post
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-5 bg-gray-100 p-5 rounded-md">
              <p className='text-center text-xs text-gray-500'>No posts created</p>
            </div>
          </div>
        </div>

        {/* <div className="profile-card !p-5 relative height-fit border border-gray-200 shadow-md rounded-lg">
          <div className="relative">
            <div className="cover-photo">
              <img
                style={{ objectFit: 'cover' }}
                src={user?.coverPhoto?.cloudinarySecureUrl || defaultCoverPhoto}
                className="w-full h-[220px]"
                alt="Cover photo"
              />
              <i
                onClick={openCoverphoto}
                className="fa-solid fa-pen-to-square cursor-pointer absolute right-2 bottom-2"
              ></i>
            </div>
            <CropComponent
              crop={crop}
              zoom={zoom}
              setCrop={setCrop}
              setZoom={setZoom}
              image={image}
            />
            <div className="absolute bottom-2 left-2 w-fit h-fit">
              <div className="relative">
                <img
                  style={{ objectFit: 'cover' }}
                  src={user?.profilePicture?.cloudinarySecureUrl || defaultProfile}
                  alt="Profile"
                  className="profile-photo rounded-full w-[100px] h-[105px]"
                />
                <i
                  onClick={openProfilePhoto}
                  className="cursor-pointer fa-solid fa-pen-to-square absolute bottom-1 left-10"
                ></i>
              </div>
            </div>
          </div>
          <div className="mt-4 px-5 flex justify-between pb-4">
            <div className="w-full">
              <p className="font-semibold text-xl">{user?.name}</p>
              <p className="mt-3">
                <span>
                  <i className="fa-solid fa-briefcase me-3"></i>
                </span>
                {user?.headline}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                <span>
                  <i className="fa-solid fa-location-dot !text-sm !text-gray-400 me-3"></i>
                  {user?.location?.district}, {user?.location?.state}
                </span>
              </p>
            </div>
            <div className="w-full flex justify-end items-end pb-5">
              <button
                onClick={handleOpenProfileEdit}
                className="border rounded border-gray-300 text-sm px-2 py-1"
              >
                Edit profile <i className="!text-sm fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          </div>
        </div> */}

        {/* <div className="border-b grid grid-cols-2 border-gray-300 w-full !mt-10">
          <div
            className={`${
              activeProfileSection === 'personal' ? 'border-b border-blue-500 shadow-lg' : ''
            }`}
          >
            <p
              onClick={() => setActiveProfileSection('personal')}
              className={`text-center ${
                activeProfileSection === 'personal'
                  ? 'text-blue-500 font-semibold text-base'
                  : 'font-medium text-sm'
              } cursor-pointer`}
            >
              Personal Profile
            </p>
          </div>
          <div
            className={`${
              activeProfileSection === 'recruiter' ? 'border-b border-blue-500 shadow-lg' : ''
            }`}
          >
            <p
              onClick={() => setActiveProfileSection('recruiter')}
              className={`text-center ${
                activeProfileSection === 'recruiter'
                  ? 'text-blue-500 font-semibold text-base'
                  : 'font-medium text-sm'
              } cursor-pointer`}
            >
              Recruiter Profile
            </p>
          </div>
        </div> */}

        {/* To show personal/user related details */}

          {/* <section className="mt-8">
            <div>
              <p className="title font-semibold">About</p>
              <p className="mt-3 text-sm text-gray-500">{user?.summary}</p>
            </div>
            <div className="flex gap-20 mt-5">
              <div>
                <p className="text-bold">Email</p>
                <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
              </div>
              <div>
                <p className="text-bold">Phone</p>
                <p className="text-sm text-gray-500 mt-1">{user?.phone}</p>
              </div>
              <div>
                <p className="text-bold">Location</p>
                <p className="text-sm text-gray-500 mt-1">
                  {user?.location?.district}, {user?.location?.state}, {user?.location?.country}
                </p>
              </div>
            </div>
            <hr className="mt-5" />
            <div>
              <p className="font-semibold mt-3">Social Links</p>
              <div className="social-links">
                {user && user?.socialLinks?.length > 0 ? (
                  user?.socialLinks?.map((links: any, index: number) => {
                    return (
                      <SocialmediaLinks
                        key={index}
                        removeLink={() => deleteSocialLink(links?.domain)}
                        data={links}
                      />
                    );
                  })
                ) : (
                  <>
                    {isAddLinkButtonClicked === false && (
                      <p className="text-center text-xs text-gray-400 mt-3">No links added</p>
                    )}
                  </>
                )}
                {isAddLinkButtonClicked && (
                  <div className="mt-2 mb-2 flex items-center">
                    <div className="relative">
                      <input
                        value={socialmediaurl}
                        onChange={(event) => setsocialmediaurl(event.target.value)}
                        type="text"
                        placeholder="enter url"
                        className="border w-[400px] border-gray-300 rounded p-1"
                      />
                      <label htmlFor="" className="absolute error-label text-xs text-red block">
                        {socialmediaurlerror}
                      </label>
                    </div>
                    <button
                      onClick={addSocialMedialink}
                      className="text-sm bg-black text-white rounded px-2 py-1 ms-1"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setIsAddLinkButtonClicked(false)}
                      className="text-sm border border-gray-300 rounded ms-1 py-1 px-2"
                    >
                      <i className="fa-solid fa-xmark-circle"></i>
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsAddLinkButtonClicked(true)}
                type="button"
                className="mt-2 border border-gray-400 rounded bg-gray-300 w-full p-2 border-dark-gray-400 text-xs"
              >
                Add Social links{' '}
                <span>
                  <i className="fa-solid fa-plus-circle"></i>
                </span>
              </button>
            </div>

            <div id="posts" className="py-5 font-semibold">
              <p>Posts</p>
              <div>
                {userPosts.length > 0 ? (
                  <>
                    {userPosts?.map((post: any, index: number) => {
                      return <Post key={index} post={post} />;
                    })}
                  </>
                ) : (
                  <p className="text-gray-500 text-sm text-center mt-5">No posts created</p>
                )}
              </div>
            </div>
          </section> */}

      
      </div>

      {/* Prfile edit modal */}
      <Modal
        open={openprofileedit}
        onClose={handCloseProfileEdit}
        aria-labelledby="edit-profile-modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            minWidth: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={handleSubmit(profileEditOnSubmit)}>
            <div className="w-full flex justify-end">
              <button onClick={handCloseProfileEdit} type="button" className="">
                <i className="fa-solid fa-close"></i>
              </button>
            </div>
            <Typography
              id="edit-profile-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: 'center' }}
            >
              Edit Profile
            </Typography>
            <FormControl fullWidth>
              <Controller
                name="name"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Name"
                      variant="outlined"
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                    />
                  );
                }}
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: '12px' }}>
              <Controller
                name="headline"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Headline"
                      variant="outlined"
                      error={Boolean(errors.headline)}
                      helperText={errors.headline?.message}
                    />
                  );
                }}
              />
            </FormControl>
            <Box
              sx={{
                width: '100%',
                marginTop: '10px',
                display: 'flex',
                gap: '30px',
                justifyContent: 'space-between',
              }}
            >
              <FormControl fullWidth>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="City"
                        variant="outlined"
                        error={Boolean(errors.city)}
                        helperText={errors.city?.message}
                      />
                    );
                  }}
                />
              </FormControl>

              <FormControl fullWidth>
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="District"
                        variant="outlined"
                        error={Boolean(errors.district)}
                        helperText={errors.district?.message}
                      />
                    );
                  }}
                />
              </FormControl>

              <FormControl fullWidth>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="State"
                        variant="outlined"
                        error={Boolean(errors.state)}
                        helperText={errors.state?.message}
                      />
                    );
                  }}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', width: '100%', gap: '30px' }}>
              <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="Country"
                        variant="outlined"
                        error={Boolean(errors.country)}
                        helperText={errors.country?.message}
                      />
                    );
                  }}
                />
              </FormControl>

              <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <Controller
                  name="pincode"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="Pincode"
                        variant="outlined"
                        error={Boolean(errors.pincode)}
                        helperText={errors.pincode?.message}
                      />
                    );
                  }}
                />
              </FormControl>
            </Box>
            <FormControl fullWidth sx={{ marginTop: '10px' }}>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => {
                  return (
                    <Textarea minRows={5} {...field} placeholder="Enter a little about you..." />
                  );
                }}
              />
            </FormControl>
            <Box sx={{ width: '100%', marginTop: '10px' }}>
              <button
                type="submit"
                className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm w-full !py-2 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="bg-gray-400 !py-2 text-sm w-full rounded mt-2"
                onClick={handCloseProfileEdit}
              >
                Cancel
              </button>
            </Box>
          </form>
        </Box>
      </Modal>

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
    </>
  );
}
