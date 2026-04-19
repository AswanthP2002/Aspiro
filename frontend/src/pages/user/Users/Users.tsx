import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiCheck, BiGridAlt, BiListUl, BiSearch, BiUserPlus } from 'react-icons/bi';
import { Experience, Skills, UserOverviewForPublic, UserType } from '../../../types/entityTypes';
import { getLocationDetails, getUsersForPublic } from '../../../services/userServices';
import { Notify } from 'notiflix';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdVerified } from 'react-icons/md';
import { Skeleton } from '@mui/material';
import { toast } from 'react-toastify';

export default function UsersFindingPage() {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [users, setUsers] = useState<UserOverviewForPublic[] | null | undefined>(null);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
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

  const amIFollowingThisUser = (user: UserOverviewForPublic): boolean => {
    for (let i = 0; i < user?.followers?.length; i++) {
      if (user.followers[i].follower === logedUser.id) {
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
              <select className="bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                <option value="recently-joined">Recently Joined</option>
                <option value="most-connections">Most Connections</option>
                <option value="suggested">Suggested</option>
              </select>

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

            <select
              onChange={(e) => setRoleTypeFilter(e.target.value)}
              className="text-xs font-medium bg-white border border-gray-200 px-4 py-1.5 rounded-full hover:border-gray-300 transition-colors outline-none cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="Recruiter">Recruiters</option>
            </select>

            <select
              onChange={(e) => setExperienceTypeFilter(e.target.value)}
              className="text-xs font-medium bg-white border border-gray-200 px-4 py-1.5 rounded-full hover:border-gray-300 transition-colors outline-none cursor-pointer"
            >
              <option value="All">All Levels</option>
              <option value="Fresher">Fresher</option>
              <option value="Entry_Level">Entry Level</option>
              <option value="Mid_Level">Mid Level</option>
              <option value="High_Level">Senior Level</option>
            </select>

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
        {/* <div className="w-full bg-white p-2 sticky top-0 z-18 shadow">
                    <div className="flex justify-between">
                        <div>
                            <p>Discover peoples</p>
                            <p className="text-xs text-gray-700 mt-1">Connect with people and expand your professional network</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <select name="" id="" className="border border-gray-200 rounded-md text-xs p-1 outline-none">
                                <option value="recently-joined">Recently joined</option>
                                <option value="most-connections">Most connections </option>
                                <option value="suggested">Suggested</option>
                            </select>
                            <button onClick={() => setView('list')} className={`${view === 'list' ? 'bg-black' : 'bg-white'} border border-gray-200 rounded-md w-7 h-7 flex items-center justify-center`}>
                                <BiListUl color={`${view === 'list' ? 'white' : 'black'}`} />
                            </button>
                            <button onClick={() => setView('grid')} className={`${view === 'grid' ? 'bg-black' : 'bg-whhite'} border border-gray-200 rounded-md w-7 h-7 flex items-center justify-center`}>
                                <BiGridAlt color={`${view === 'grid' ? 'white' : 'black'}`} />
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center bg-gray-200 p-2 rounded-md">
                        <BiSearch color="gray" />
                        <input onKeyUp={(e) => db(e)} type="text" className="!text-xs w-full" placeholder="Search by name, headline, skill" />
                    </div>
                    <div className="flex items-center gap-3 flex-wrap mt-5">
                        <p className="text-xs text-gray-500">Quick filters : </p>
                        <select onChange={(e) => setRoleTypeFilter(e.target.value)} className="text-xs outline-none border border-gray-200 w-fit ps-2 rounded-full py-1">
                            <option value="All">All Users</option>
                            <option value="Recruiter">Recruiters</option>
                        </select>
                        <select onChange={(e) => setExperienceTypeFilter(e.target.value)} className="text-xs outline-none border border-gray-200 w-fit ps-2 rounded-full py-1">
                            <option value="All">All Level</option>
                            <option value="Fresher">Fresher</option>
                            <option value="Entry_Level">Entry Level</option>
                            <option value="Mid_Level">Mid Level</option>
                            <option value="High_Level">High Level</option>
                        </select>
                        <div className="text-xs border border-gray-200 w-fit px-5 rounded-full py-1">Near by</div>
                        <div className="text-xs relative flex gap-2 items-center border border-gray-200 px-5 rounded-md py-1">
                            <input 
                                type="text"
                                className="border !text-xs w-70 border-gray-300 rounded-md px-2 py-1"
                                placeholder="enter the location"
                                value={query}
                                onChange={handleChange}
                            />
                            <button onClick={findByLocation} className="bg-blue-500 text-white rounded-md px-2 py-1">Find</button>
                            {
                                suggestions?.length > 0 && (
                                    <ul className="absolute top-9 bg-white z-10 border border-gray-300 rounded-md shadow-xl space-y-2 m-h-[500px] p-3 overflow-y-scroll">
                                {
                                    suggestions?.map((place: any) => (
                                        <li className="text-xs cursor-pointer text-gray-700" onClick={() => handleLocationSelect(place)} key={place.place_id}>{place.display_name}</li>
                                    ))
                                }
                            </ul>
                                )
                            }
                        </div>
                    </div>
                </div> */}

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
                    <div
                      className={`mt-5 flex items-center gap-2 ${view === 'grid' ? 'justify-center w-full' : ''}`}
                    >
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 text-sm font-semibold rounded-full hover:bg-blue-50 transition-colors">
                        <BiUserPlus className="text-lg" /> Connect
                      </button>

                      <button
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                          amIFollowingThisUser(user)
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-900 text-white hover:bg-black'
                        }`}
                      >
                        {amIFollowingThisUser(user) ? 'Following' : 'Follow'}
                      </button>
                    </div>
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



// <div className="bg-white rounded-md p-5">
              //     <div className={`${view === 'list' ? 'flex flex-row' : 'flex flex-col items-center'} gap-3`}>
              //         <div>
              //             <div onClick={() => navigateToUserPublicProfile(user._id)} className="relative cursor-pointer bg-blue-500 w-15 h-15 rounded-full flex items-center justify-center">
              //                 {
              //                     user.profilePicture?.cloudinarySecureUrl && (
              //                         <img style={{objectFit:'cover'}} className="w-[90%] h-[90%] rounded-full" src={user.profilePicture?.cloudinarySecureUrl} alt="" />
              //                     )
              //                 }
              //                 {
              //                     !user.profilePicture?.cloudinarySecureUrl && (
              //                         <p className="text-white text-xl">{user?.name[0]}</p>
              //                     )
              //                 }
              //                 <div className="bg-green-400 absolute p-1 rounded-full bottom-0 right-3"></div>
              //             </div>
              //         </div>
              //         <div className={`flex flex-col ${view === 'grid' ? 'items-center' : ''}`}>
              //             <div className="flex items-center gap-2">
              //                 <p>{user.name}</p>
              //                 {user.isRecruiter && user.isVerifiedRecruiter
              //                     ? <div className="flex items-center gap-2">
              //                         <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 rounded-md border border-blue-300 py-[3px]">Recruiting</span>
              //                         <span className="flex items-center text-xs gap-2 bg-green-200 px-2 py-[3px] rounded-md border border-green-300 text-green-700"><MdVerified /> Aspiro Verified</span>
              //                       </div>
              //                     : (user.isRecruiter && !user.isVerifiedRecruiter
              //                         ? <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 rounded-md border border-blue-300 py-[3px]">Recruiting</span>
              //                         : <span></span>)
              //                 }
              //             </div>
              //             <p className="text-gray-500 text-sm mt-1">{user.headline}</p>
              //             <p className="mt-1 text-blue-500 text-xs">{0} Mutal connections</p>
              //             <p className={`mt-1 text-gray-500 text-xs ${view === 'grid' ? 'hidden' : ''}`}>{getClippedText(user?.summary as string, 200)}</p>
              //             <div className={`mt-3 flex flex-wrap gap-2 ${view === 'grid' ? 'hidden' : ''}`}>
              //                 {
              //                     getSkillPhills(user.skills as Skills[]).map((skill: string, index: number) => (
              //                         <div className="text-xs bg-gray-200 px-2 py-1 rounded-full" key={index}>{skill}</div>
              //                     ))
              //                 }
              //             </div>
              //             <div className="mt-3 flex items-center gap-3">
              //                 <button className="border border-gray-200 text-xs text-gray-700 px-5 py-2 rounded-md flex items-center gap-2"><BiUserPlus /> Connect</button>
              //                 {
              //                     amIFollowingThisUser(user) && (
              //                         <button className="bg-black text-white text-xs px-5 py-2 rounded-md flex items-center gap-2">Following <BiCheck /></button>
              //                     )
              //                 }
              //                 {
              //                     !amIFollowingThisUser(user) && (
              //                         <button className="bg-black text-white text-xs px-5 py-2 rounded-md">Follow</button>
              //                     )
              //                 }
              //             </div>
              //         </div>
              //     </div>
              // </div>