import React, { useEffect, useState } from "react";
import { BiCheck, BiGridAlt, BiListUl, BiSearch, BiUserPlus } from "react-icons/bi";
import { Experience, Skills, UserOverviewForPublic, UserType } from "../../../types/entityTypes";
import { getLocationDetails, getUsersForPublic } from "../../../services/userServices";
import { Notify } from "notiflix";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function UsersFindingPage(){
    
    const [view, setView] = useState<'list' | 'grid'>('list')
    const [users, setUsers] = useState<UserOverviewForPublic[] | null | undefined>(null)
    const [search, setSearch] = useState<string>('')
    const [roleTypeFilter, setRoleTypeFilter] = useState<'All' | 'Recruiter'>('All')
    const [experienceTypeFilter, setExperienceTypeFilter] = useState<'All' | 'Fresher' | 'Entry_Level' | 'Mid_Level' | 'High_Level'>('All')
    const [query, setQuery] = useState("")
    const [suggestions, setSuggestion] = useState([])
    const [location, setLocation] = useState("")
    // const [selectedLocation, setSelectedLocation] = useState()

    const logedUser = useSelector((state: any) => {
        return state.userAuth.user
    })
    
    const findByLocation = () => setLocation(query)

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        if(value.length < 3){
            setSuggestion([])
            return
        }

        try {
            const result = await getLocationDetails(value)
            setSuggestion(result)
        } catch (error: unknown) {
            console.log('error occured while geting location details', error)
            Notify.failure('Something went wrong while searching user by location')
        }
    }

    const handleLocationSelect = (place: any) => {
        setQuery(place.display_name)
        setSuggestion([])
    }

    const navigate = useNavigate()

    const searchUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const debouncedSearch = (fn: Function, delay: number) => {
        let timer: any
        return function(...args: any){
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...args)
            }, delay);
        }
    }

    const db = debouncedSearch(searchUsers, 500)

    const getExperienceLabel = (experiences: Experience[]) => {
        let experienceInMonths = 0
        let experienceLabel;
        const n = experiences.length

        for(let i = 0; i < n; i++){
            const startDate = new Date(experiences[i].startDate)
            const endDate = experiences[i].isPresent ? new Date() : new Date(experiences[i].endDate)

            const yearDif = endDate.getFullYear() - startDate.getFullYear()
            const monthDif = endDate.getMonth() - startDate.getMonth()

            const fullMonthsDif = (yearDif * 12) + monthDif
            experienceInMonths += fullMonthsDif
        }

        if(experienceInMonths >= (12 * 4)){
            experienceLabel = 'High Level'
        }else if(experienceInMonths >= (12 * 2) && experienceInMonths < (12 * 4)){
            experienceLabel = 'Mid Level'
        }else if(experienceInMonths >= 12 && experienceInMonths < (12 * 2)){
            experienceLabel = 'Entry Level'
        }else {
            experienceLabel = 'Fresher'
        }

        return experienceLabel
    }

    const navigateToUserPublicProfile = (userId: string) => {
        if(!userId) return

        if(logedUser._id === userId){
           return navigate('/profile/personal')
        }else {
            return navigate(`/users/${userId}`, {state:{userId}})

        }
    }

    const getSkillPhills = (skills: Skills[]) => {
        const totalSkills = skills.length
        const combedSkills = []
        if(totalSkills <= 4) return skills
        for(let i = 0; i <= totalSkills; i++){
            combedSkills.push(skills[i].skill)
            if(i === 4) break
        }

        return [...combedSkills, `${totalSkills - 4}+`]

    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await getUsersForPublic(search, roleTypeFilter, experienceTypeFilter, location)
                if(result?.success){
                    console.log('--users from the backend--', result)
                    setUsers(result?.result?.users)
                }else{
                    Notify.failure(result?.message, {timeout: 3000})
                    return
                }
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
            }
        }

        fetchUsers()
    }, [search, roleTypeFilter, experienceTypeFilter, location])

    console.log('User Type Filter values ', roleTypeFilter)

    const getClippedText = (text: string, buffer: number) => {
        if(text.length <= buffer){
            return text
        }else{
            return `${text.slice(0, buffer)}...`
        }
    }

    const amIFollowingThisUser = (user: UserOverviewForPublic): boolean => {
        for(let i = 0; i < user?.followers?.length; i++){
            if(user.followers[i].follower === logedUser.id){
                return true
            }
        }

        return false
    }

    return(
        <>
            <div>
                <div className="w-full bg-white p-2 sticky top-0 z-18 shadow">
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
                </div>

                <div className="mt-5">
                    <div className={`grid gap-5 ${view === 'list' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        {
                            users?.map((user: UserOverviewForPublic) => (
                                <div className="bg-white rounded-md p-5">
                                    <div className={`${view === 'list' ? 'flex flex-row' : 'flex flex-col items-center'} gap-3`}>
                                        <div>
                                            <div onClick={() => navigateToUserPublicProfile(user._id)} className="relative cursor-pointer bg-blue-500 w-15 h-15 rounded-full flex items-center justify-center">
                                                {   
                                                    user.profilePicture?.cloudinarySecureUrl && (
                                                        <img style={{objectFit:'cover'}} className="w-[90%] h-[90%] rounded-full" src={user.profilePicture?.cloudinarySecureUrl} alt="" />
                                                    )
                                                }
                                                {
                                                    !user.profilePicture?.cloudinarySecureUrl && (
                                                        <p className="text-white text-xl">{user?.name[0]}</p>
                                                    )
                                                }
                                                <div className="bg-green-400 absolute p-1 rounded-full bottom-0 right-3"></div>
                                            </div>
                                        </div>
                                        <div className={`flex flex-col ${view === 'grid' ? 'items-center' : ''}`}>
                                            <div className="flex items-center gap-2">
                                                <p>{user.name}</p>
                                                <span className="text-xs border border-gray-200 px-2 py-1 rounded-full">{getExperienceLabel([])}</span>
                                            </div>
                                            <p className="text-gray-500 text-sm mt-1">{user.headline}</p>
                                            <p className="mt-1 text-blue-500 text-xs">{0} Mutal connections</p>
                                            <p className={`mt-1 text-gray-500 text-xs ${view === 'grid' ? 'hidden' : ''}`}>{getClippedText(user?.summary as string, 200)}</p>
                                            <div className={`mt-3 flex flex-wrap gap-2 ${view === 'grid' ? 'hidden' : ''}`}>
                                                {
                                                    getSkillPhills(user.skills || []).map((s: string, index: number) => (
                                                        <div className="text-xs bg-gray-200 px-2 py-1 rounded-full" key={index}>{s.skill}</div>
                                                    ))
                                                }
                                            </div>
                                            <div className="mt-3 flex items-center gap-3">
                                                <button className="border border-gray-200 text-xs text-gray-700 px-5 py-2 rounded-md flex items-center gap-2"><BiUserPlus /> Connect</button>
                                                {
                                                    amIFollowingThisUser(user) && (
                                                        <button className="bg-black text-white text-xs px-5 py-2 rounded-md flex items-center gap-2">Following <BiCheck /></button>
                                                    )
                                                }
                                                {
                                                    !amIFollowingThisUser(user) && (
                                                        <button className="bg-black text-white text-xs px-5 py-2 rounded-md">Follow</button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            users?.length === 0 && (
                                <div className="flex items-center justify-center">
                                    <p className="text-xs text-gray-700">No users available</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
