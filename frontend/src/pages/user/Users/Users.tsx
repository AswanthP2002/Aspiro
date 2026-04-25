import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiGridAlt, BiListUl, BiSearch, BiUserCheck, BiUserPlus } from 'react-icons/bi';
import { ConnectionRequests, Experience, Follow, Skills, UserOverviewForPublic, UserPublicProfileData } from '../../../types/entityTypes';
import { followUser, getLocationDetails, getUsersForPublic, unfollowUser } from '../../../services/userServices';
import { Notify } from 'notiflix';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdVerified } from 'react-icons/md';
import { Skeleton } from '@mui/material';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { cancelConnectionRequest, removeConnection, sendConnectionRequest } from '../../../services/connectionServices';

export default function UsersFindingPage() {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [users, setUsers] = useState<UserOverviewForPublic[] | null | undefined>(null);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [sort, setSort] = useState<"recently_joined" | "most_connection" | "suggested">("recently_joined")
  const [hasMore, setHasMore] = useState(true)
  const [roleTypeFilter, setRoleTypeFilter] = useState<'All' | 'Recruiter'>('All');
  const [experienceTypeFilter, setExperienceTypeFilter] = useState<
    'All' | 'Fresher' | 'Entry_Level' | 'Mid_Level' | 'High_Level'
  >('All');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestion] = useState([]);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null)
  // const [selectedLocation, setSelectedLocation] = useState()
  const [roleTypeFilterOpen, setRoleTypeFilterOpen] = useState(false)
  const [levelTypeFilterOpen, setLevelTypeFilterOpen] = useState(false)
  const [sortMenuOpen, setSortMenuOpen] = useState(false)

  const toggleSortMenuOpen = () => {
    setLevelTypeFilterOpen(false)
    setRoleTypeFilterOpen(false)
    setSortMenuOpen((prv) => !prv)
  }

  const toggleRoleTypeFilter = () => {
    setLevelTypeFilterOpen(false)
    setRoleTypeFilterOpen((prv) => {
      if(prv){
        return false
      }else{
        return true
      }
    })
  }

  const toggleLevelTypeFilter = () => {
    setRoleTypeFilterOpen(false)
    setLevelTypeFilterOpen((prv) => !prv)
  }

  const logedUser = useSelector((state: {userAuth: {user: {_id: string, name: string}}}) => {
    return state.userAuth.user;
  });

  const findByLocation = () => setLocation(query);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 3) {
      setSuggestion([]);
      return;
    }

    try {
      const result = await getLocationDetails(value);
      setSuggestion(result);
    } catch (error: unknown) {
      console.log('error occured while geting location details', error);
      Notify.failure('Something went wrong while searching user by location');
    }
  };

  const handleLocationSelect = (place: {display_name: string}) => {
    setQuery(place.display_name);
    setSuggestion([]);
  };

  const navigate = useNavigate();

  const searchUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedSearch = <T extends (...args: never[]) => void>(fn: T, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<T>) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const db = debouncedSearch(searchUsers, 500);

  const getExperienceLabel = (experiences: Experience[]) => {
    let experienceInMonths = 0;
    let experienceLabel;
    const n = experiences.length;

    for (let i = 0; i < n; i++) {
      const startDate = new Date(experiences[i].startDate);
      const endDate = experiences[i].isPresent ? new Date() : new Date(experiences[i].endDate);

      const yearDif = endDate.getFullYear() - startDate.getFullYear();
      const monthDif = endDate.getMonth() - startDate.getMonth();

      const fullMonthsDif = yearDif * 12 + monthDif;
      experienceInMonths += fullMonthsDif;
    }

    if (experienceInMonths >= 12 * 4) {
      experienceLabel = 'High Level';
    } else if (experienceInMonths >= 12 * 2 && experienceInMonths < 12 * 4) {
      experienceLabel = 'Mid Level';
    } else if (experienceInMonths >= 12 && experienceInMonths < 12 * 2) {
      experienceLabel = 'Entry Level';
    } else {
      experienceLabel = 'Fresher';
    }

    return experienceLabel;
  };

  const followAUser = async (userId: string) => {
    if(!userId) return toast.error('Something went wrong')
    try {
      const result = await followUser(userId, logedUser.name, '')
      if(result?.success){
        setUsers((users: UserOverviewForPublic[] | null | undefined) => {
          if(!users) return null
          return users.map((user: UserOverviewForPublic) => {
            if(user._id === userId){
              return {
                ...user,
                followers:[
                  ...user.followers as Follow[],
                  {
                    _id: result?.result._id,
                    follower: result?.result.follower,
                    following: result?.result.following,
                    createdAt: result?.result.createdAt,
                    updatedAt: result?.result.updatedAt,
                    type: 'candidate'
                  }
                ]
              }
            }else{
              return user
            }
          })
        })
      }
    } catch (error: unknown) {
      console.log('Error occured while following a user')
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const unfollowAUser = async (userId: string, name: string) => {
    if(!userId) return toast.error('Something went wrong')
    const confirmation = await Swal.fire({
      icon: 'question',
      title: `Unfollow ${name}?`,
      showConfirmButton: true, 
      showCancelButton: true,
      confirmButtonText:'Unfollow',
      allowOutsideClick: false,
      allowEscapeKey: false
    })

    if(!confirmation.isConfirmed) return

    try {
      const result = await unfollowUser(userId, logedUser.name, '')
      if(result.success){
        toast.info(`Unfollowed ${name}`)
        setUsers((users: UserOverviewForPublic[] | null | undefined) => {
          if(!users) return null
          return users.map((user: UserOverviewForPublic) => {
            if(user._id === userId){
              return {
                ...user,
                followers: user.followers?.filter((follow: Follow) => follow.follower !== logedUser._id)
              }
            }else{
              return user
            }
          })
        })
      }
    } catch (error: unknown) {
      console.log('error occured while unfollowing a user', error)
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const sendConnectionRequestToAUser = async (userId: string, name: string) => {
    if(!userId) return toast.error('Something went wrong')
    const confirm = await Swal.fire({
      icon: 'question',
      title: 'Send connection request?',
      text: `Your request will be pending until ${name} accepts it`,
      showConfirmButton: true,
      confirmButtonText: 'Send',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    })

    if(!confirm.isConfirmed) return

    try {
      const result = await sendConnectionRequest(userId, logedUser.name, "")
      if(result.success){
        toast.success('Connection request send')
        setUsers((users: UserOverviewForPublic[] | null | undefined) => {
          if(!users) return null
          return users.map((user: UserOverviewForPublic) => {
            if(user._id === userId){
              return {
                ...user,
                connectionRequests: [...user.connectionRequests as ConnectionRequests[], result?.result]
              }
            }else {
              return user
            }
          })
        })
      }
    } catch (error: unknown) {
      console.log('error occured while sending connection request', error)
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const cancelConnectionRequests = async (userId: string) => {
    if(!userId) return toast.error('Something went wrong')
    const confirmation = await Swal.fire({
      icon: 'question',
      title: 'Cancel Request',
      showConfirmButton: true,
      showCancelButton: true,
      allowEscapeKey: false,
      allowOutsideClick: false
    })
    if(!confirmation.isConfirmed) return
    try {
      const result = await cancelConnectionRequest(userId)
      if(result.success){
        toast.info('Connection Request Cancelled')
        setUsers((users: UserOverviewForPublic[] | null | undefined) => {
          if(!users) return null
          return users.map((user: UserOverviewForPublic) => {
            if(user._id === userId){
              return {
                ...user,
                connectionRequests: user.connectionRequests?.filter((connection: ConnectionRequests) => connection.sender !== logedUser._id)
              }
            }else{
              return user
            }
          })
        })
      }
    } catch (error) {
      
    }
  }

  const removeFromMyConnection = async (userId: string, name: string) => {
    if(!userId) return toast.error('Something went wrong')
    const confirmation = await Swal.fire({
      icon: 'question',
      title: 'Break Connection ?',
      text: `Are you sure to remove ${name} from your connection?.`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Remove',
      allowOutsideClick: false,
      allowEscapeKey: false
    })

    if(!confirmation.isConfirmed) return

    try {
      const result = await removeConnection(userId)
      if(result.success){
        toast.info(`${name} removed from your connection`)
        setUsers((users: UserOverviewForPublic[] | null | undefined) => {
          if(!users) return null
          return users.map((user: UserOverviewForPublic) => {
            if(user._id === userId){
              return {
                ...user,
                connections: user.connections?.filter((connection: string) => connection !== logedUser._id)
              }
            }else{
              return user
            }
          })
        })
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const navigateToUserPublicProfile = (userId: string) => {
    if (!userId) return;

    if (logedUser._id === userId) {
      return navigate('/profile/personal');
    } else {
      return navigate(`/users/${userId}`, { state: { userId } });
    }
  };

  const getSkillPhills = (skills: Skills[]): string[] => {
    const totalSkills = skills.length;
    const combedSkills = [];
    if (totalSkills <= 4) return skills.map((skill: Skills) => skill.skill);
    for (let i = 0; i <= totalSkills; i++) {
      combedSkills.push(skills[i].skill);
      if (i === 4) break;
    }

    return [...combedSkills, `${totalSkills - 4}+`];
  };

  useEffect(() => {
    setPage(1)
    setUsers([])
    setHasMore(true)
  }, [search, roleTypeFilter, experienceTypeFilter, location])

  const lastUserObserverComponent = useCallback((node) => {
    if(loading) return
    if(observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting){
        console.log('-observing last component-')
        setPage(prv => prv + 1)
      }
    })

    if(node) observer.current.observe(node)
  }, [loading])

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setHasMore(true)
      try {
        const result = await getUsersForPublic(
          search,
          roleTypeFilter,
          experienceTypeFilter,
          location,
          page,
          limit
        );
        if (result?.success) {
          console.log('--users from the backend--', result);
          setUsers((prv: UserOverviewForPublic[] | null | undefined) => {
            if(!prv) return null
            return [...prv, ...result.result.users]
          })
          setHasMore(result.result?.users.length > 0)
        } else {
          toast.error(result?.message)
          return;
        }
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    };

    if(hasMore){
      fetchUsers();
    }
  }, [search, roleTypeFilter, experienceTypeFilter, location, page, limit]);

  console.log('User Type Filter values ', roleTypeFilter);

  const getClippedText = (text: string, buffer: number) => {
    if (text.length <= buffer) {
      return text;
    } else {
      return `${text.slice(0, buffer)}...`;
    }
  };

  const isConnectionRequestSend = (user: UserOverviewForPublic) => {
    for(let i = 0; i < user?.connectionRequests?.length; i++){
      if(user.connectionRequests && user.connectionRequests[i].sender === logedUser._id && user.connectionRequests[i].status === 'PENDING'){
        return true
      }
    }

    return false
  }

  const isAConnection = (user: UserOverviewForPublic) => {
    if(user.connections?.includes(logedUser._id)){
      return true
    }else{
      return false
    }
    // for(let i = 0; i < user?.connectionRequests?.length; i++){
    //   if(user.connectionRequests && user.connectionRequests[i].sender === logedUser._id && user.connectionRequests[i].status === 'ACCEPTED'){
    //     return true
    //   }
    // }

    // return false
  }

  const amIFollowingThisUser = (user: UserOverviewForPublic): boolean => {
    for (let i = 0; i < user?.followers?.length; i++) {
      if (user.followers && user.followers[i].follower === logedUser._id) {
        return true;
      }
    }

    return false;
  };

  return (
    <>
      <div>
        <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4">
          {/* Top Row: Title & View Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Discover People</h1>
              <p className="text-sm text-gray-500 font-medium">
                Connect with professionals and expand your network
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Select */}
              <div onClick={toggleSortMenuOpen} className='border border-slate-200 relative rounded-lg px-5 py-2 text-sm text-gray-600 cursor-pointer min-w-40'>
                {sort === 'recently_joined' && (<p className='text-center'>Recently Joined</p>)}
                {sort === 'most_connection' && (<p className='text-center'>Most Connections</p>)}
                {sort === 'suggested' && (<p className='text-center'>Suggested</p>)}
                {sortMenuOpen && (
                  <div className="absolute z-5 bg-white shadow-xl border border-slate-100 transition-all duration-300 w-full left-0 top-10 rounded-lg">
                  <ul className='p-1'>
                    <li onClick={() => setSort('recently_joined')} className='text-center text-xs font-medium text-gray-600 py-2 hover:bg-blue-500 hover:text-white transition-color duration-300 rounded-md'>Recently Joined</li>
                    <li onClick={() => setSort('most_connection')} className='text-center text-xs font-medium text-gray-600 py-2 hover:bg-blue-500 hover:text-white transition-color duration-300 rounded-md'>Most Connections</li>
                    <li onClick={() => setSort('suggested')} className='text-center text-xs font-medium text-gray-600 py-2 hover:bg-blue-500 hover:text-white transition-color duration-300 rounded-md'>Suggested</li>
                  </ul>
                </div>
                )}
              </div>
              {/* <select className="bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                <option value="recently-joined">Recently Joined</option>
                <option value="most-connections">Most Connections</option>
                <option value="suggested">Suggested</option>
              </select> */}

              {/* View Toggles */}
              <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                <button
                  onClick={() => setView('list')}
                  className={`p-1.5 rounded-md transition-all ${view === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <BiListUl size={18} />
                </button>
                <button
                  onClick={() => setView('grid')}
                  className={`p-1.5 rounded-md transition-all ${view === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <BiGridAlt size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Middle Row: Search Bar */}
          <div className="mt-5 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BiSearch
                className="text-gray-400 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
            </div>
            <input
              onKeyUp={(e) => db(e)}
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Search by name, headline, or skill..."
            />
          </div>

          {/* Bottom Row: Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Quick Filters
            </span>
            <div onClick={toggleRoleTypeFilter} className='relative border border-slate-200 py-2 px-7 rounded-xl text-gray-600 cursor-pointer'>
              <p className='text-xs font-medium'>{roleTypeFilter === 'All' ? "All roles" : roleTypeFilter}</p>
              {roleTypeFilterOpen && (
                <div className="absolute z-5 transition-all duration-300 bg-white border border-slate-100 top-9 w-full left-0 rounded-lg text-xs shadow-xl">
                <ul className='w-full p-1'>
                  <li onClick={() => {setRoleTypeFilter('All');setRoleTypeFilterOpen(false)}} className='text-center p-2 hover:bg-blue-500 hover:text-white transition-color duration-300 rounded-md'>All Roles</li>
                  <li onClick={() => {setRoleTypeFilter('Recruiter');setRoleTypeFilterOpen(false)}} className='text-center p-2 hover:bg-blue-500 hover:text-white transition-color duration-300 rounded-md'>Recruiter</li>
                </ul>
              </div>
              )}
            </div>
            {/* <select
              onChange={(e) => setRoleTypeFilter(e.target.value)}
              className="text-xs font-medium bg-white border border-gray-200 px-4 py-1.5 rounded-full hover:border-gray-300 transition-colors outline-none cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="Recruiter">Recruiters</option>
            </select> */}
            <div onClick={toggleLevelTypeFilter} className='relative border border-slate-200 py-2 px-7 rounded-xl text-gray-600 cursor-pointer'>
              <p className='text-xs font-medium'>{experienceTypeFilter === 'All' ? "All Level" : experienceTypeFilter}</p>
              {levelTypeFilterOpen && (
                <div className="absolute z-5 transition-all duration-300 bg-white border border-slate-100 top-9 w-full left-0 rounded-lg text-xs shadow-xl">
                <ul className='w-full p-1'>
                  <li onClick={() => setExperienceTypeFilter('All')} className='text-center p-2 hover:bg-blue-500 hover:text-white transition-color duration-300 rounded-md'>All Levels</li>
                  <li onClick={() => setExperienceTypeFilter('Fresher')} className='text-center p-2 hover:bg-blue-500 hover:text-white transition-color duration-300 rounded-md'>Fresher</li>
                  <li onClick={() => setExperienceTypeFilter('Entry_Level')} className='text-center p-2 hover:bg-blue-500 hover:text-white transition-color duration-300 rounded-md'>Entry Level</li>
                  <li onClick={() => setExperienceTypeFilter('Mid_Level')} className='text-center p-2 hover:bg-blue-500 hover:text-white transition-color duration-300 rounded-md'>Mid Level</li>
                  <li onClick={() => setExperienceTypeFilter('High_Level')} className='text-center p-2 hover:bg-blue-500 hover:text-white transition-color duration-300 rounded-md'>Senior Level</li>
                </ul>
              </div>
              )}
            </div>
            {/* <select
              onChange={(e) => setExperienceTypeFilter(e.target.value)}
              className="text-xs font-medium bg-white border border-gray-200 px-4 py-1.5 rounded-full hover:border-gray-300 transition-colors outline-none cursor-pointer"
            >
              <option value="All">All Levels</option>
              <option value="Fresher">Fresher</option>
              <option value="Entry_Level">Entry Level</option>
              <option value="Mid_Level">Mid Level</option>
              <option value="High_Level">Senior Level</option>
            </select> */}

            {/* Location Search Group */}
            <div className="relative flex items-center bg-white border border-gray-200 rounded-full pl-4 pr-1 py-1 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <span className="text-xs text-gray-400 mr-2 border-r pr-2">Location</span>
              <input
                type="text"
                className="text-xs outline-none w-48"
                placeholder="Enter city..."
                value={query}
                onChange={handleChange}
              />
              <button
                onClick={findByLocation}
                className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-3 py-1 rounded-full transition-colors"
              >
                Find
              </button>

              {suggestions?.length > 0 && (
                <ul className="absolute top-10 left-0 w-full bg-white z-50 border border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto p-2 list-none">
                  {suggestions.map((place: any) => (
                    <li
                      className="text-xs p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => handleLocationSelect(place)}
                      key={place.place_id}
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className={`grid gap-5 ${view === 'list' ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {users?.map((user: UserOverviewForPublic, index: number) => (
              <div
                ref={users.length === index + 1 ? lastUserObserverComponent : null}
                key={user._id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className={`${view === 'list' ? 'flex flex-row items-start' : 'flex flex-col items-center text-center'} gap-6`}
                >
                  {/* Avatar Section */}
                  <div className="relative flex-shrink-0">
                    <div
                      onClick={() => navigateToUserPublicProfile(user._id)}
                      className="cursor-pointer w-20 h-20 rounded-full border-2 border-gray-100 flex items-center justify-center overflow-hidden bg-slate-100"
                    >
                      {user.profilePicture?.cloudinarySecureUrl ? (
                        <img
                          src={user.profilePicture.cloudinarySecureUrl}
                          className="w-full h-full object-cover"
                          alt={user.name}
                        />
                      ) : (
                        <span className="text-2xl font-semibold text-slate-500">
                          {user?.name[0]}
                        </span>
                      )}
                    </div>
                    {/* Online Status Indicator */}
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`flex ${view === 'grid' ? 'flex-col' : 'flex-row'} flex-wrap items-center gap-2 ${view === 'grid' ? 'justify-center' : ''}`}
                    >
                      <h3 className="text-lg font-bold text-gray-900 truncate">{user.name}</h3>

                      {user.isRecruiter && (
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-50 text-blue-700 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border border-blue-100">
                            Recruiter
                          </span>
                          {user.isVerifiedRecruiter && (
                            <span className="flex items-center gap-1 bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-100">
                              <MdVerified className="text-sm" /> Verified
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm font-medium mt-0.5 leading-snug">
                      {user.headline}
                    </p>

                    <div
                      className={`mt-2 flex items-center gap-1 text-gray-400 text-xs ${view === 'grid' ? 'justify-center' : ''}`}
                    >
                      <span className="font-medium text-blue-600">0 Mutual connections</span>
                    </div>

                    {view !== 'grid' && (
                      <>
                        <p className="mt-3 text-gray-500 text-sm line-clamp-2 leading-relaxed">
                          {user?.summary}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {getSkillPhills(user.skills as Skills[])
                            .slice(0, 4)
                            .map((skill: string, index: number) => (
                              <span
                                key={index}
                                className="text-[11px] font-medium bg-gray-50 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-md"
                              >
                                {skill}
                              </span>
                            ))}
                        </div>
                      </>
                    )}

                    {/* Action Buttons */}
                    {user._id !== logedUser._id && (
                      <div
                      className={`mt-5 flex items-center gap-2 ${view === 'grid' ? 'justify-center w-full' : ''}`}
                    >
                      {
                        isAConnection(user) ? (
                          <button onClick={() => removeFromMyConnection(user._id as string, user.name as string)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 text-sm font-semibold rounded-full hover:bg-blue-50 transition-colors">
                            <BiUserCheck className="text-lg" /> Connected
                          </button>
                        ) : isConnectionRequestSend(user) ? (
                          <button onClick={() => cancelConnectionRequests(user._id as string)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 text-sm font-semibold rounded-full hover:bg-blue-50 transition-colors">
                            Pending
                          </button>
                        ) : (
                          <button onClick={() => sendConnectionRequestToAUser(user._id as string, user.name as string)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 text-sm font-semibold rounded-full hover:bg-blue-50 transition-colors">
                            <BiUserPlus className="text-lg" /> Connect
                          </button>
                        )
                      }
                      {
                        amIFollowingThisUser(user)
                          ? <button
                          onClick={() => unfollowAUser(user._id as string, user.name as string)}
                         className={`flex-1 sm:flex-none px-4 py-2 rounded-full text-sm font-semibold transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200`}
                      >
                        Following
                      </button>
                      : <button
                        onClick={() => followAUser(user._id as string)}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-full text-sm font-semibold transition-colors bg-gray-900 text-white hover:bg-black`}
                      >
                        Follow
                      </button>
                      }
                      

                      
                    </div>
                    )}
                  </div>
                </div>
              </div>
              
            ))}

            {loading && (
              Array.from(new Array(3)).map(() => (
                <div className='bg-gray-50 flex gap-3 rounded-md p-5'>
                  <Skeleton variant='circular' width={50} height={50} />
                  <div className='flex-1'>
                    <Skeleton width={150} />
                    <Skeleton height={15} width={200} />
                  </div>
                </div>
              ))
            )}
            {users?.length === 0 && (
              <div className="flex items-center justify-center">
                <p className="text-xs text-gray-700">No users available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}