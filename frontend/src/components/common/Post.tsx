import { Notify } from "notiflix"
import { likePost, unlikePost } from "../../services/candidateServices"
import { useState } from "react"
import { useSelector } from "react-redux"
import { FaHeart, FaRegComment } from "react-icons/fa6"
import { CiHeart } from "react-icons/ci"
import { PiShareFat } from "react-icons/pi"
import defaultPicture from '/default-img-instagram.png'
import { useNavigate } from "react-router-dom"

export default function Post({ post }: any) {

    const logedUser = useSelector((state : any) => {
        return state?.candidateAuth?.user
    })

    const navitateTo = useNavigate()

    const parsed = JSON.parse(logedUser)

    const [likedPosts, setLikedPosts] = useState<any[]>([])

    const postLiking = async (postId : string, creatorId : string) => {        
            const result = await likePost(postId, creatorId)
            if(result?.success){
                setLikedPosts(prv => [...prv, postId])
            }else{
                Notify.failure('Something went wrong', {timeout:1200})
            }
    }
    
    const postUnliking = async (postId : string) => {
            const result = await unlikePost(postId)
            if(result.success){
                setLikedPosts(prv => prv.filter((id : string) => id !== postId))
            }else{
                Notify.failure('Something went wrong', {timeout:1200})
            }
    }

    const goToAuthorDetails = (candidateId : string) => {
        navitateTo(`/candidates/${candidateId}`)
    }

    return (
        <div className="border border-gray-200 rounded-md mx-auto mb-3 w-[510px] max-w-[500px]">
            <div onClick={() => goToAuthorDetails(post?.creatorId)} className="header flex gap-2 items-center p-2">
                <div><img src={post?.creatorDetails?.profilePicture?.cloudinarySecureUrl ? post?.creatorDetails?.profilePicture?.cloudinarySecureUrl : defaultPicture} className="w-9" alt="" /></div>
                <div>
                    <p className="text-sm">{post?.creatorDetails?.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{post?.creatorDetails?.role}</p>
                </div>
            </div>
            <div className="body mt-2">
                <div className="image">
                    <img src={post?.media?.url} className="w-full" alt="" />
                </div>
                <div className="actions flex gap-4 mt-2 p-2">
                    {
                        likedPosts.includes(post?._id) || post?.likes?.includes(parsed?.id)
                            ? <div onClick={() => postUnliking(post?._id)} className="relative">
                                <button className="relative"><FaHeart size={25} color="red" /></button>
                                <p className="absolute text-sm" style={{ bottom: '-13px', left: '8px' }}>{post?.likes?.length}</p>
                            </div>
                            : <div onClick={() => postLiking(post?._id, post?.creatorId)} className="relative">
                                <button className="relative"><CiHeart size={28} /></button>
                                <p className="absolute text-sm" style={{ bottom: '-13px', left: '8px' }}>{post?.likes?.length}</p>
                            </div>
                    }
                    <div><button><FaRegComment size={25} color="gray" /></button></div>
                    <div><button><PiShareFat size={25} /></button></div>
                </div>
                <div className="content p-2">
                    <p className="text-sm font-normal">{post?.content}</p>
                </div>
            </div>
        </div>
    )
}