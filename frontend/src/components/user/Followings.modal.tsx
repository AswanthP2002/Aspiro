import { useCallback, useEffect, useRef, useState } from "react"
import { FollowerData, FollowingsData } from "../../types/entityTypes"
import { getFollowers, getFollowings, removeAFollower } from "../../services/followServices"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { Modal, Skeleton } from "@mui/material"
import { CgClose } from "react-icons/cg"
import { BiSearch } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { unfollowUser } from "../../services/userServices"

type RootUser = {
    userAuth: {
        user:{
        _id: string
    }
    }
}

export default function FollowingsModal({isOpen, onClose, onUnFollow, userId}: {isOpen: boolean, onClose: () => void, onUnFollow: () => void, userId: string}){
  const [loading, setLoading] = useState(false)
  const [followings, setFollowings] = useState<FollowingsData[]>([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [limit, setLimit] = useState(5)
  const navigate = useNavigate()
  
  const logedUser = useSelector((state: RootUser) => {
    return state.userAuth.user
  })

  console.log('-- checking loged user -- ', logedUser)

  const observer = useRef<any>(null)
  const lastFollowerRef = useCallback((node) => {
    if(loading) return
    if(observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting){
        console.log('last element is visible now', entries[0])
        setPage(prv => prv + 1)
      }
    })

    if(node) observer.current.observe(node)


  }, [loading])

  async function fetchFollowings(){
      setLoading(true)
      try {
        const result = await getFollowings(userId, search, page, limit)
        if(result?.success){
          // toast.success('Followers fetched')
          console.log('-- follow fetching reuslt ==', result)
          setFollowings((prv: FollowingsData[]) => [...prv, ...result.result])
          setHasMore(result?.result?.length > 0)
        }else{
          setFollowings([])
        }
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 2000);
      }
  }

  const navigateToUserProfile = (userId: string) => {
    if(!userId) return

    if(userId === logedUser._id){
        navigate('/profile/personal', {state: {userId}})
    }else{
        navigate(`/users/${userId}`)
    }

  }

  const searchFollowing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const debouncedSearch = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout
    return function(...args: any){
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, delay);
    }
  }

  const dSearch = debouncedSearch(searchFollowing, 500)

  const unFollowAUser = async (followingId: string, name: string) => {
    if(!followingId) return

    const confirm = await Swal.fire({
      icon: 'question',
      title: `Unfollow ${name} ?`,
      text: `Are you sure to unfollow ${name}?`,
      showConfirmButton: true,
      confirmButtonText: 'Unfollow',
      showCancelButton: true,
      cancelButtonText: 'No',
      didOpen: () => {
        const container = Swal.getContainer()
        if(container){
          container.style.zIndex = '999999'
        }
      }
    })

    if(!confirm.isConfirmed) return

    try {
      await unfollowUser(followingId, '', '')
      toast.success('Unfollowed')
      setFollowings((followings: FollowingsData[]) => {
        return followings.filter((following: FollowingsData) => following.following !== followingId)
      })
      onUnFollow()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  useEffect(() => {
    setFollowings([])
    setPage(1)
    setHasMore(true)
  }, [search])

  useEffect(() => {
    // fetchFollowers()
    if(hasMore){
      fetchFollowings()
    }
  }, [page, search, limit])
  return(
    <>
    <Modal open={isOpen} className='flex items-center justify-center p-4 backdrop-blur-sm bg-black/20'>
  <div className='w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100'>
    {/* Header */}
    <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100 bg-gray-50/50">
      <h3 className='font-semibold text-gray-800 text-lg'>Following</h3>
      <button 
        onClick={onClose} 
        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
      >
        <CgClose size={20} />
      </button>
    </div>

    <div className="p-4">
      {/* Search Bar */}
      <div className="relative mb-4 group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
        </div>
        <input
          onChange={(e) => dSearch(e)}
          type="text" 
          className='w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400' 
          placeholder='Search by name...' 
        />
      </div>

      {/* List Container */}
      <div className="max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
        {followings.map((data: FollowerData, index: number) => (
          <div
            ref={followings.length === index + 1 ? lastFollowerRef : null}
            key={data._id}
            className='group p-3 flex items-center gap-4 rounded-xl hover:bg-blue-50/50 transition-all cursor-pointer border border-transparent hover:border-blue-100 mb-1'
          >
            {/* Avatar with Initials */}
           {loading
            ? <Skeleton width={50} height={50} variant='circular' />
            :  (
              data.userDetails?.profilePicture
                ? <div className='shrink-0 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center w-11 h-11 rounded-full shadow-sm font-medium text-sm tracking-tighter'>
                  <img src={data.userDetails.profilePicture} className='w-full h-full object-cover rounded-full' alt="" />
            </div>
               : <div className='shrink-0 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center w-11 h-11 rounded-full shadow-sm font-medium text-sm tracking-tighter'>
              { data.userDetails?.name && data?.userDetails?.name.split(' ').map(n => n[0]).join('')}
            </div>
            )
           }

            {/* Content */}
            <div onClick={() => navigateToUserProfile(data.userDetails?._id as string)} className="flex-1 cursor-pointer min-w-0">
              {loading
                ? <Skeleton width={100} />
                : <p className='text-[14px] font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors'>
                {data.userDetails?.name}
              </p>
              }
              {loading
                ? <Skeleton height={12} />
                : <p className='text-[12px] text-gray-500 truncate leading-relaxed'>
                {data.userDetails?.headline}
              </p>
              }
            </div>
            
            {/* Optional Action Button (Follow/Unfollow) */}
            {loading
              ? <Skeleton width={50} />
              : (logedUser._id === userId ? <button onClick={() => unFollowAUser(data.userDetails?._id as string, data.userDetails?.name as string)} className="text-xs font-medium text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors">
              Unfollow
            </button> : null)
            }
          </div>
        ))}
        {followings.length === 0 && (
          <div>
            <p className='text-center text-xs text-gray-700'>No following found</p>
          </div>
        )}
      </div>
    </div>
  </div>
</Modal>
    </>
  )
}