import { Notify } from "notiflix"
import { addComment, deleteComment, likePost, unlikePost } from "../../services/userServices"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FaHeart } from "react-icons/fa6"
import { CiHeart } from "react-icons/ci"
import { PiShareFatThin } from "react-icons/pi"
import {AiOutlineComment} from 'react-icons/ai'
import defaultPicture from '/default-img-instagram.png'
import { useNavigate } from "react-router-dom"
import { formatRelativeTime } from "../../services/util/formatDate"
import { Skeleton } from "@mui/material"
import { AnimatePresence, motion } from "motion/react"
import { Comments } from "../../types/entityTypes"
import Swal from "sweetalert2"

export default function Post({ postData, loading }: any) {
    const [post, setPost] = useState<any>()
    const [likes, setLikes] = useState<any>([])
    const [comments, setComments] = useState<Comments[]>([])
    const [isTextExpanded, setIsTextExpanded] = useState(false)
    const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false)
    const [commentText, setCommentText] = useState('')

    const [postLiked, setPostLiked] = useState(false)
    const [animationShowing, setAnimationShowing] = useState(false)

    const expandText = () => setIsTextExpanded(true)
    const collapseText = () => setIsTextExpanded(false)

    console.log('posts', post)
    console.log('Checking comments ', post?.comments)
    console.log('accessing one commet', post?.comments[0]?.userDetails?.name)
    const logedUser = useSelector((state : any) => {
        return state?.userAuth?.user
    })

    // problem while listing comments need to fix it
    useEffect(() => {
        setPost(postData)
        setLikes(postData?.likes)
        setComments(postData?.comments || [])
    }, [postData])

    const dummyComments = [
        {
            id: 1,
            user: {
                name: 'John Doe',
                profilePic: defaultPicture,
            },
            comment: 'This is a great post! Thanks for sharing.',
        },
        {
            id: 2,
            user: {
                name: 'Jane Smith',
                profilePic: defaultPicture,
            },
            comment: 'Very insightful. I learned a lot.',
        },
        {
            id: 3,
            user: {
                name: 'Alex Johnson',
                profilePic: defaultPicture,
            },
            comment: 'Could you share more details about the process?',
        },
    ];


    const displayDiscription = (text : string, maxLength : number = 50) => {
        if(isTextExpanded){
            return text
        }else {
            return text && text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text
        }
    }



    const navitateTo = useNavigate()
    console.log(logedUser)
    console.log('this is loged user id', logedUser?.id)

    const postLiking = async (postId : string) => {  
            setPostLiked(true)
            setAnimationShowing(true)
            setTimeout(() => {
                setAnimationShowing(false)
            }, 600);
            
            try {
                const result = await likePost(postId)
                if(!result?.success){
                    Notify.failure('Something went wrong', {timeout:2000})
                }
            } catch (error : unknown) {
                Notify.failure('Something went wrong', {timeout:2000})
            }
    }
    
    const postUnliking = async (postId : string) => {
            setPostLiked(false)
            setAnimationShowing(true)
            setTimeout(() => {
                setAnimationShowing(false)
            }, 600);
            
            try {
                const result = await unlikePost(postId)
                if(!result?.success){
                    Notify.failure('Something went wrong', {timeout:2000})
                }
            } catch (error : unknown) {
                Notify.failure('Something went wrong', {timeout:2000})
            }
    }

    const postComment = async (postId: string) => {
        try {
            const result = await addComment(postId, commentText)

            if(result?.success){
                setCommentText('');
                // To reflect the new comment without a page reload
                const newComment = result.comment;
                setComments(prevComments => [newComment, ...prevComments]);
                Notify.success('Comment added', {timeout:1200})
            }else{
                Notify.failure('Something went wrong', {timeout:1200})
            }
        } catch (error: unknown) {
            Notify.failure('Something went wrong', {timeout:1200})
        }
    }

    const deleteUserComment = async (commentId: string) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            allowOutsideClick:false,
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if(result?.isConfirmed){
                try {
                    const result = await deleteComment(post?._id, commentId)
                    if(result?.success){
                        Notify.success('Comment deleted', {timeout:1200})
                // To reflect the new comment without a page reload
                        setComments((prvComments: Comments[]) => {
                            return prvComments.filter((comment: Comments) => comment._id !== commentId)
                        })
                    }else{
                        Notify.failure('Something went wrong', {timeout:1200})
                    }
            
                } catch (error: unknown) {
                    Notify.failure('Something went wrong', {timeout:1200})
                }
            }else{
                return
            }
        })
        
    }

    const goToAuthorDetails = (candidateId : string) => {
        navitateTo(`/candidates/${candidateId}`)
    }

    // console.log('this is userid', parsed)
    console.log('this is likes', likes)

    return (
        <div className="border border-gray-200 rounded-md mx-auto mb-3 w-[510px] max-w-[500px]">
            <div onClick={() => goToAuthorDetails(post?.creatorId)} className="header flex gap-2 items-center p-2">
                <div>
                    {
                        loading
                            ? <Skeleton variant="circular" width={40} height={40} />
                            : <img src={post?.userDetails?.profilePicture?.cloudinarySecureUrl ? post?.userDetails?.profilePicture?.cloudinarySecureUrl : defaultPicture} className="w-9 rounded-full h-9" style={{objectFit:'cover'}} alt="" />
                    }
                </div>
                <div>
                    {
                        loading
                            ? <Skeleton variant="text" height={15} width={100} />
                            : <p className="text-sm">{post?.userDetails?.name || 'Aswanth P'}</p>
                    }
                    {
                        loading
                            ? <Skeleton variant="text" height={10} width={70} />
                            : <p className="text-xs text-gray-500">{post?.userDetails?.headline || 'Software Engineer'}</p>  
                    }
                </div>
            </div>
            <div className="body mt-2">
                {
                    loading
                        ? <Skeleton variant="rectangular" height={300} />
                        : <div className="image relative flex justify-center items-center">
                            {
                                animationShowing && (
                                <AnimatePresence>
                                <motion.div className="absolute"
                                    key='heart-animate'
                                    initial={{scale:0, opacity:0}}
                                    animate={{scale:1.8, opacity:1}}
                                    exit={{scale:0, opacity:0}}
                                    transition={{duration:0.2, ease:'easeOut'}}
                                >
                                    <FaHeart color={postLiked ? 'red' : 'white'} size={55} />
                                </motion.div>
                                </AnimatePresence>
                                )
                            }
                            <img src={post?.media?.cloudUrl} className="w-full" alt="" />
                          </div>
                }

                {
                    loading
                        ? <div className="flex flex-col gap-2 p-2">
                            <Skeleton variant="text" width={100} height={15} />
                            <Skeleton variant="text" width={300} height={15} />
                            <Skeleton variant="text" width={100} height={15} />
                          </div>
                        :
                <>
                <div className="actions flex gap-4 mt-2 p-2">
                    {
                        //likes?.includes(logedUser?.id)
                        postLiked || post?.likes?.includes(logedUser?.id)
                            ? <div className="relative">
                                <button onClick={() => postUnliking(post?._id)} className="relative"><FaHeart size={25} color="red" /></button>
                                {/* <p className="text-xs text-center" style={{ bottom: '-13px', left: '8px' }}>{likes?.length} {likes?.length > 1 ? "likes" : "like"}</p> */}
                            </div>
                            : <div className="relative">
                                <button onClick={() => postLiking(post?._id)} className="relative"><CiHeart size={28} /></button>
                                {/* <p className="text-xs text-center" style={{ bottom: '-13px', left: '8px' }}>{likes?.length} {likes?.length > 1 ? "likes" : "like"}</p> */}
                            </div>
                    }
                    <div><button onClick={() => setIsCommentBoxOpen(!isCommentBoxOpen)}><AiOutlineComment size={25} color="gray" /></button></div>
                    <div><button><PiShareFatThin size={25} /></button></div>
                </div>
                <p className="text-xs ms-2">{likes.length} {likes && likes?.length > 1 ? "likes" : "like"}</p>
                <div className="content p-2">
                    <p className="text-sm font-normal">{displayDiscription(post?.description)}
                        {
                            isTextExpanded
                                ? <span className="ms-2 text-xs text-gray-500 cursor-pointer" onClick={collapseText}>Read less</span>
                                : <span className="ms-2 text-xs text-gray-500 cursor-pointer" onClick={expandText}>Read more</span>
                        }
                    </p>
                </div>
                <div className="timeline p-2">
                    <p className="text-xs text-gray-500">{formatRelativeTime(post?.createdAt)}</p>
                </div>
                {isCommentBoxOpen && (
                    <div className="comment-section p-2 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-4">
                            <img src={logedUser?.profilePicture?.cloudinarySecureUrl || defaultPicture} className="w-8 h-8 rounded-full object-cover" alt="user" />
                            <input value={commentText} onChange={(event) => setCommentText(event.target.value)} type="text" placeholder="Add a comment..." className="flex-grow border border-gray-300 rounded-full px-4 py-1 text-sm outline-none focus:border-blue-500" />
                            <button disabled={!commentText} onClick={() => postComment(post?._id)} className="text-sm font-semibold text-blue-500 hover:text-blue-700">Post</button>
                        </div>
                        {
                            comments && comments?.length && (
                                <div className="space-y-3 max-h-48 overflow-y-auto p-1">
                            {comments.map((comment: Comments) => (
                                <div key={comment._id} className="flex items-start gap-2">
                                    <img src={comment?.userDetails?.profilePicture?.cloudinarySecureUrl || defaultPicture} className="w-7 h-7 rounded-full object-cover mt-1" alt={comment?.userDetails?.name} />
                                    <div className="flex-1 bg-gray-100 rounded-lg p-2 relative group">
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs font-semibold">{comment?.userDetails?.name}</p>
                                            {logedUser?.id === comment.userId && (
                                                <button onClick={() => deleteUserComment(comment?._id as string)} className="text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                            )
                        }
                    
                    </div>
                )}
                </>
                }
            </div>
        </div>
    )
}