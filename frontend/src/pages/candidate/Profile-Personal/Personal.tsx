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
  editUsersProfile,
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

// To switch between seeing the recruiter profile and the "Become a Recruiter" CTA,
// you can change this flag.
// `true` will show the recruiter profile card with dummy data.
// `false` will show the call-to-action to register as a recruiter.
const showDummyRecruiterProfile = true;


export default function ProfilePersonal() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setloading] = useState(false);
  const [openprofileedit, setopenprofileedit] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [activeProfileSection, setActiveProfileSection] = useState('personal');

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

  async function onSubmit(data: ProfileFormState) {
    const { name, headline, city, district, state, country, summary, pincode } = data;
    handCloseProfileEdit();

    //const { name, headline, city, district, state, country, summary, pincode } = formState;
    try {
      const result = await saveBasicDetails(
        headline as string,
        city as string,
        district as string,
        state as string,
        country as string,
        pincode as string,
        summary as string
      );

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
        Swal.fire({
          icon: 'warning',
          title: 'Something went wrong',
        });
      }
    } catch (error) {}
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

    if (result.success) {
      Notify.success(result?.message, { timeout: 1000 });
      setUser((prv) => {
        if (!prv) return null;
        return {
          ...prv, //social links changed optional to required
          socialLinks: [...prv.socialLinks, { domain: url.hostname, url: socialmediaurl }],
        };
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: result?.message,
      });
    }
  }

  async function deleteSocialLink(domain: string) {
    const result = await removeSocialLink(domain);

    if (result?.success) {
      Notify.success(result?.message, { timeout: 1000 });
      setUser((prv) => {
        if (!prv) return null;
        return {
          ...prv,
          socialLinks: prv.socialLinks.filter((link: SocialLinks) => link.domain !== domain),
        };
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops',
        text: result?.message,
      });
    }
  }

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container px-10 py-5">
        <div className="profile-card !p-5 relative height-fit border border-gray-200 shadow-md rounded-lg">
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
        </div>

        <div className="border-b grid grid-cols-2 border-gray-300 w-full !mt-10">
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
        </div>

        {/* To show personal/user related details */}
        {activeProfileSection === 'personal' && (
          <section className="mt-8">
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
          </section>
        )}

        {
            activeProfileSection === 'recruiter' && (
              <section className="!mt-8">
            
              {showDummyRecruiterProfile
                ? <>
                    <div>
                      <RecruiterInfoCard 
                        recruiterDetails={dummyUserWithRecruiterDetails?.recruiterDetails} 
                      />
                      <div className="mt-8">
                          <h3 className="text-xl font-semibold mb-4">Manage Jobs</h3>
                          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-6">
                              {/* Recruiter Metrics Section */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                  {/* Active Jobs */}
                                  <div className="bg-blue-100 border border-blue-200 p-4 rounded-lg flex items-center justify-between">
                                      <div>
                                          <p className="text-sm text-blue-800 font-semibold">Active Jobs</p>
                                          <p className="text-2xl font-bold text-blue-900">0</p>
                                      </div>
                                      <div className="bg-blue-500 text-white p-3 rounded-full"><i className="fa-solid fa-briefcase !text-white"></i></div>
                                  </div>
                                  {/* Total Job Views */}
                                  <div className="bg-orange-100 border border-orange-200 p-4 rounded-lg flex items-center justify-between">
                                      <div>
                                          <p className="text-sm text-orange-800 font-semibold">Total Job Views</p>
                                          <p className="text-2xl font-bold text-orange-900">0</p>
                                      </div>
                                      <div className="bg-orange-500 text-white p-3 rounded-full"><i className="fa-solid fa-eye !text-white"></i></div>
                                  </div>
                                  {/* Jobs Expiring Soon */}
                                  <div className="bg-green-100 border border-green-200 p-4 rounded-lg flex items-center justify-between">
                                      <div>
                                          <p className="text-sm text-green-800 font-semibold">Jobs Expiring Soon</p>
                                          <p className="text-2xl font-bold text-green-900">0</p>
                                      </div>
                                      <div className="bg-green-500 text-white p-3 rounded-full"><i className="fa-solid fa-clock !text-white"></i></div>
                                  </div>
                                  {/* Total Hires */}
                                  <div className="bg-indigo-100 border border-indigo-200 p-4 rounded-lg flex items-center justify-between">
                                      <div>
                                          <p className="text-sm text-indigo-800 font-semibold">Total Hires</p>
                                          <p className="text-2xl font-bold text-indigo-900">0</p>
                                      </div>
                                      <div className="bg-indigo-500 text-white p-3 rounded-full"><i className="fa-solid fa-handshake !text-white"></i></div>
                                    </div>
                              </div>

                              <div className="text-center mt-6">
                                {false && (<p className="text-gray-600 mb-4">You haven't posted any jobs yet.</p>)}
                                
                                <div className="border-t border-gray-200 pt-4 mt-4 !mb-4">
                                  {/* This is a single job card. You can map over an array of jobs to display multiple. */}
                                  {
                                    Array.from(new Array(3)).map((_, index) => {
                                      return (
                                        <div className="grid grid-cols-12 items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                                      {/* Job Title and Info */}
                                      <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                                          <img src={defaultProfile} className="w-12 h-12 rounded-lg object-cover" alt="Company Logo" />
                                          <div>
                                              <p className="font-semibold text-gray-800 text-lg">{'Data Entry Operator'}</p>
                                              <div className="flex items-center text-sm text-gray-500 gap-3 mt-1">
                                                  <span className="inline-flex items-center gap-1">
                                                      <i className="fa-solid fa-location-dot text-xs"></i> Remote
                                                  </span>
                                                  <span className="inline-flex items-center gap-1">
                                                      <i className="fa-solid fa-clock text-xs"></i> 24 days left
                                                  </span>
                                              </div>
                                          </div>
                                      </div>
                                      {/* Status */}
                                      <div className="col-span-6 md:col-span-2 flex items-center justify-start md:justify-center mt-2 md:mt-0">
                                          <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                              Active
                                          </span>
                                      </div>
                                      {/* Applicants */}
                                      <div className="col-span-6 md:col-span-2 flex items-center justify-start md:justify-center mt-2 md:mt-0">
                                          <p className="text-gray-700 font-medium text-sm">{12} Applicants</p>
                                      </div>
                                      {/* Action Button */}
                                      <div className="col-span-12 md:col-span-3 flex justify-end mt-4 md:mt-0">
                                          <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto">View Applicants</button>
                                      </div>
                                  </div>
                                      )
                                    })
                                  }
                                </div>
                                
                                <button onClick={() => navigateTo('/profile/recruiter/post-job')} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                                  Post a New Job
                                </button>
                              </div>
                          </div>
                      </div>
                  </div>
                </>
                  
              : <>
                  <div className="text-center bg-white p-8 rounded-lg shadow-md border border-gray-200">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Unlock Your Recruiting Potential</h3>
                      <p className="text-gray-600 mb-6">
                          Join our network to find top-tier talent, post job openings, and manage applications seamlessly.
                      </p>
                      <Link to="/profile/recruiter/register">
                          <button className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                              Become a Recruiter Now
                          </button>
                      </Link>
                  </div>
                </>
            }
          </section>
            )
        }
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
