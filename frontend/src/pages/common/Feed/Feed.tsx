import { useContext, useEffect, useRef, useState } from "react"
// import coursera from '/courseera.png'
// import wearehiring from '/wearehiring.png'
// import dummyUserImage from '/recejames.jpg'
// import dummyCompany from '/company.jpg'
import { addComment, createPost, deleteComment, getPosts, likeUserPost, unlikeUserPost } from "../../../services/userServices";
import { useSelector } from "react-redux";
// import GeneralModal from "../../../components/common/Modal";
// import CreatePost from "../../../components/common/CreatePost";
import { appContext } from "../../../context/AppContext";
import { Comments, UserPosts } from "../../../types/entityTypes"
import { Notify } from "notiflix"
import { CiHeart, CiImageOn } from "react-icons/ci"
import { BsThreeDotsVertical } from "react-icons/bs"
import { IoChatbubbleOutline } from "react-icons/io5"
// import { FaShareNodes } from "react-icons/fa6"
import { PiShareNetworkDuotone } from "react-icons/pi"
// import dummyPostImage from '/hektor.jpg'
// import leschulerImage from '/schuller.jpg'
// import claraImage from '/klara.jpg'
// import lucasImage from '/lucas.jpg'
import { Controller, useForm } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";
import { FaCircleXmark } from "react-icons/fa6";
import { formatRelativeTime } from "../../../services/util/formatDate";
import { FaHeart, FaTrash } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
import { LuSend } from "react-icons/lu";
import Swal from "sweetalert2";
import SuggessionBar from "../../../components/user/SuggestionBar";
// import { MdDescription } from "react-icons/md"

// const dummyPostsData = [
//     {
//         id:1,
//         name:'Aswanth P',
//         headline: 'Full stack Developer',
//         time:'2 days ago',
//         image:null,
//         description:'Challenges of combining social media world + a job networking world',
//         likes:25,
//         comments:4,
//         shares:2
//     },
//     {
//         id:2,
//         name:'Hector Fort',
//         headline: 'UI/UX Designer',
//         time:'2 hours ago',
//         image:dummyPostImage,
//         description:'Designing clothes are different vibe',
//         likes:6,
//         comments:0,
//         shares:1
//     },
//     {
//         id:3,
//         name:'Le Schuler',
//         headline: 'Project Manager',
//         time:'12 days ago',
//         image:leschulerImage,
//         description:'Germany! 👀🌼',
//         likes:235,
//         comments:84,
//         shares:55
//     },
//     {
//         id:4,
//         name:'Clara Eric',
//         headline: 'Hiring Manager at Hydra',
//         time:'5 days ago',
//         image:claraImage,
//         description:'Finally i also mad it! 👀🌼',
//         likes:98,
//         comments:15,
//         shares:4
//     },
//     {
//         id:5,
//         name:'Lucas Bergvel',
//         headline: 'Hiring Manager at Hydra',
//         time:'20 minutes ago',
//         image:lucasImage,
//         description:'New chapter, new page. With spurs👀',
//         likes:5,
//         comments:4,
//         shares:0
//     },
    
// ]


export default function Feed() {
    
    const {socket} = useContext(appContext)

    interface PostInput {
        description: string
    }

    interface CommentInput {
        comment: string
    }

    const [isTextExpanded, setIsTextExpanded] = useState(false)
    const [postLiked, setPostliked] = useState(false)

    const [commentBoxOpen, setCommentBoxOpen] = useState(false)

    const [showHeartAnimation, setShowHeartAnimation] = useState(false)

    const expandText = () => setIsTextExpanded(true)
    const collapseText = () => setIsTextExpanded(false)

    const showDescription = (description: string, maxLength: number = 100) => {
        if(isTextExpanded){
            return description
        }else{
            return description && description?.length > maxLength ? `${description.slice(0, maxLength)}...` : description
        }
    }

    const [fileImage, setFileImage] = useState<any>(null)
    const [fileImagePreview, setFileImagePreview] = useState<string>('')
    
    const mediaFileRef = useRef<HTMLInputElement | null>(null)

    const clickedMediaUpload = () => {
        mediaFileRef.current?.click()
    }

    const onMediaUpload = (e: any) => {
        if(e.target.files.length > 0){
            const image = e.target.files[0]
            setFileImage(image)
            setFileImagePreview(URL.createObjectURL(image))
        }
    }

    const clearImageSelection = () => {
        setFileImage(null)
        setFileImagePreview('')
    }

    const {control, handleSubmit, reset, formState:{errors}} = useForm<PostInput>({defaultValues:{description:''}})
    const {control: commentControl, watch: commentWatch, handleSubmit: handleSubmitComment, reset: resetComment, formState:{errors: commentErrors}} = useForm<CommentInput>({defaultValues:{comment:''}})


    const [postsLoading, setPostsLoading] = useState(true)
    const [userPosts, setUserPosts] = useState<UserPosts[]>([])
    //const [content, setContent] = useState("");
    //const [postImage, setPostImage] = useState<any>(null)
    //const [image, setImage] = useState<string | null>("")
    const fileref = useRef<HTMLInputElement | null>(null)
    //const [likedPosts, setLikedPosts] = useState<any[]>([])

    const logedUser = useSelector((state : any) => {
        return state.userAuth.user
    })

    // const [modalOpen, setModalOpen] = useState(true)
    // const closeModal = () => setModalOpen(false)

    console.log('loged user', logedUser, typeof logedUser)

    // const selectFile = () => {
    //     fileref.current?.click()
    // }
    
    // const [posts, setPosts] = useState<any[]>([
    //     {
    //         _id: "string",
    //         creatorId: `#kdjfkd`,
    //         media: {
    //             cloudUrl: coursera,
    //             publicId: "string"
    //         },
    //         userDetails:{
    //             name:'Coursera',
    //             headline:'Education'
    //         },
    //         description: `Coursera ~ Junior software developer professional certificate. Pursue a new career as a junior software developer - no experience reuired`,
    //         likes: [2, 3, 3, 4, 5],
    //         createdAt: `${new Date()}`,
    //         updatedAt: `${new Date()}`
    //     },
    //     {
    //         _id: "string",
    //         creatorId: `#kdjfkd`,
    //         media: {
    //             cloudUrl: wearehiring,
    //             publicId: "string"
    //         },
    //         userDetails:{
    //             name:'Aspiro',
    //             headline:'Software Engineering'
    //         },
    //         description: `Aspiro - we are hiring!. Web developer location: remote, experience 0 to 2 years up, salary 13 to 28k month up. Freshers are most welcome`,
    //         likes: [2, 3, 3, 4, 5],
    //         createdAt: `${new Date()}`,
    //         updatedAt: `${new Date()}`
    //     }
    // ])

    async function uploadPostOnSubmit(data: PostInput){
        reset({
            description:''
        })
        
        const {description} = data
        const formData = new FormData()

        formData.append('description', description)
        formData.append('media', fileImage)

        try {
            const result = await createPost(formData)

            if(result.success){
                Notify.success(result?.message, {timeout:2000})
            }else{
                Notify.failure(result?.message, {timeout:2000})
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:2000})
        }

       // Notify.success('done', {timeout:2000})
    }

    const likePost = async (postId: string) => {
        setPostliked(true)
        setShowHeartAnimation(true)
        setTimeout(() => setShowHeartAnimation(false), 600)
        //update post instantly
        const likedPost = userPosts.find((post: UserPosts) => post._id === postId)

        if(likedPost){
            likedPost.likes.push(logedUser?.id)
            setUserPosts((prvPosts: UserPosts[]) => {
                return [...prvPosts, likedPost]
            })
        }

        try {
            const result = await likeUserPost(postId)
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:2000})
        }

        
    }

    const unlikePost = async (postId: string) => {
        setPostliked(false)
        setShowHeartAnimation(true)
        setTimeout(() => setShowHeartAnimation(false), 600)
        //update post instantly
        const unlikedPost = userPosts.find((post: UserPosts) => post._id === postId)

        if(unlikedPost){
            unlikedPost.likes = unlikedPost.likes.filter((id: string) => id !== logedUser?.id)
            setUserPosts((prvPosts: UserPosts[]) => {
                return [...prvPosts, unlikedPost]
            })
        }

        try {
            const result = await unlikeUserPost(postId)
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:2000})
        }
    }

    const addCommentOnPost = async (postId: string) => {
        const text = commentWatch('comment')
        resetComment({comment:''})

        try {
            const result = await addComment(postId, text)

            if(!result?.success){
                Notify.failure(result?.message, {timeout:2000})
                return
            }
            //update the comment ui
            const commentedPost = userPosts.find((post: UserPosts) => post._id === postId)
            commentedPost?.comments.push({
                text,
                postId,
                userId:logedUser?.id,
                createdAt: `${new Date()}`
            })

            setUserPosts((prvPosts: UserPosts[]) => {
                return [...prvPosts, commentedPost as UserPosts]
            })
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:2000})
        }

    }

    const deleteCommentOnPost = async (postId: string, commentId: string) => {
        //find post
        Swal.fire({
            icon:'warning',
            title:'Are you sure?',
            width:'300',
            showConfirmButton:true,
            confirmButtonText:'Delete',
            showCancelButton:true,
            cancelButtonText:'Cancel',
            reverseButtons:true
        }).then(async (result) => {
            if(result.isConfirmed){
                const post = userPosts.find((post:UserPosts) => post._id === postId)
        if(post){
            post.comments = post.comments.filter((comment: Comments) => commentId !== comment._id)
            setUserPosts((prvPost: UserPosts[]) => {
                return [...prvPost, post as UserPosts]
            })
            
            try {
                const result = await deleteComment(postId, commentId)

                if(!result?.success){
                    Notify.failure(result?.message, {timeout:2000})
                    return
                }


            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:2000})
            }
        }
            }else{
                return
            }
        })
        

        
    }

    useEffect(() => {
        (async function(){
            try {
                const result = await getPosts()
                console.log('pposts from backend', result)
                if(result.success){
                    setPostsLoading(false)
                    //setPosts(result.result)
                    setUserPosts(result?.result)
                }else{
                    Notify.failure('Something went wrong', {timeout:3000})
                }
            } catch (error : unknown) {
                Notify.failure('Something went wrong', {timeout:3000})
            }
        })()

        setPostsLoading(false)

        //update post like real time using socket
    
    }, [])

    useEffect(() => {
        if(socket){
            
            //post liked
            socket.on('postLiked', ({postId, userId}: {postId: string, userId: string}) => {
            const updatedPost = userPosts?.find((post: UserPosts) => post._id === postId)

            if(updatedPost){
                updatedPost.likes.push(userId)
                setUserPosts((prvPosts: UserPosts[]) => {
                    return [...prvPosts, updatedPost]
                })
            }

            //post unliked
            socket.on('postUnliked', ({postId, userId}:{postId: string, userId: string}) => {
                const post = userPosts.find((post: UserPosts) => post._id === postId)

                if(post){
                    post.likes = post.likes.filter((id: string) => id !== userId)
                    setUserPosts((prvPosts: UserPosts[]) => {
                        return [...prvPosts, post]
                    })
                }
            })
                
        })

        return () => {
            socket.off('postLiked')
        }
        }
    }, [])
    return (
        <>
        <div className="lg:px-20">
            <div className="border bg-white border-gray-300 rounded-md p-5">
                <form onSubmit={handleSubmit(uploadPostOnSubmit)}>
                <div className="flex gap-4 pb-3">
                    <div className="w-10 h-10 flex justify-center items-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-full">
                        <p className="text-white">Y</p>
                    </div>
                    <FormControl className="flex-1" error={Boolean(errors.description)}>
                        <Controller
                            name="description"
                            control={control}
                            rules={{
                                required:{value:true, message:'Description can not be empty'}
                            }}
                            render={({field}) => (
                                <textarea 
                                className="border-2 outline-none bg-gray-200 border-gray-300 rounded-md p-2 text-sm flex-1"  
                                rows={3} 
                                placeholder="Whats on your mind?" 
                                id=""
                                {...field}
                            />
                            )}
                        />
                        <FormHelperText>{errors.description?.message}</FormHelperText>
                    </FormControl>
                </div>
                <div className="border-t border-gray-200">
                    {
                        fileImagePreview && (
                            <div className="relative">
                                <button onClick={clearImageSelection} className="absolute right-2 top-2">
                                    <FaCircleXmark />
                                </button>
                                <img src={fileImagePreview} alt="Post" />
                            </div>
                        )
                    }
                <div className="pt-5 flex items-center justify-between">
                    <div>
                        <button type="button" onClick={clickedMediaUpload} className=" flex items-center text-gray-700 text-xs gap-3">
                            <CiImageOn size={20} />
                            Image
                        </button>
                    </div>
                    <button type="submit" className="text-sm bg-blue-500 rounded-md text-white !px-3 py-1">
                        Post
                    </button>
                </div>
                </div>
                <input onChange={(e) => onMediaUpload(e)} ref={mediaFileRef} className="hidden" type="file" />
                </form>
            </div>

            <div className="posts mt-5 grid grid-cols-1 gap-3">
                {
                    userPosts && userPosts?.length > 0 && (
                    userPosts.map((post: UserPosts, index: number) => (
                        <div key={index} className=" border border-gray-200 rounded-md bg-white">
                            
                            <div className="p-3">
                                <div className="flex gap-3">
                                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
                                        <p>{post?.userDetails?.name? post?.userDetails?.name[0] : 'Aspiro User'}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-light text-sm">{post?.userDetails?.name}</p>
                                        <p className="text-sm text-gray-700 font-light">{post.userDetails?.headline || 'User'}</p>
                                        <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(post?.createdAt)}</p>
                                    </div>
                                    <div>
                                        <button><BsThreeDotsVertical /></button>
                                    </div>
                                </div>
                            </div>
                            {
                                post?.media?.cloudUrl && (
                                    <div>
                                        <img className="w-full h-auto" src={post.media.cloudUrl} alt="" />
                                    </div>
                                )
                            }
                            <div className="p-3 relative">
                                {
                                    showHeartAnimation && (
                                
                                <AnimatePresence>
                                <motion.div
                                 initial={{scale:0, opacity:0}}
                                 animate={{scale:1, opacity:1}}
                                 exit={{scale:0, opacity:0}}

                                 className="absolute flex items-center justify-center w-full h-full">
                                    <FaHeart size={50} color={`${postLiked ? 'red' : 'white'}`} />
                                </motion.div>
                                </AnimatePresence>
                                    )
                                }
                                <p className="text-sm font-light text-gray-700">{showDescription(post.description)}</p>
                                {
                                    isTextExpanded
                                        ? <button onClick={collapseText} className="text-xs text-gray-500">Read les</button>
                                        : <button onClick={expandText} className="text-xs text-blue-500">Read more</button>
                                }
                            </div>
                            <div className="border t border-gray-200 text-xs text-gray-500 flex gap-2 p-3">
                                <div className="flex-1">
                                    <p>{post.likes.length || 0} likes</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p>{post.comments.length || 0} comments</p>
                                    <p>{post.shares.length || 0} share</p>
                                </div>
                            </div>
                            <div className="border-t flex border-gray-200">
                                {
                                    postLiked || post.likes.includes(logedUser?.id)
                                        ? <>
                                            <button onClick={() => unlikePost(post?._id as string)} className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center">
                                                <FaHeart size={18} color="red" />
                                                <p className="text-xs text-gray-500">Unlike</p>
                                            </button>
                                          </>
                                        : <>
                                            <button onClick={() => likePost(post?._id as string)} className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center">
                                                <CiHeart size={20} color="gray" />
                                                <p className="text-xs text-gray-500">Like</p>
                                            </button>
                                        </>
                                }   
                                <button onClick={() => setCommentBoxOpen(prv => !prv)} className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center">
                                    <IoChatbubbleOutline color="gray" />
                                    <p className="text-xs text-gray-500">Comment</p>
                                </button>
                                <button className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center">
                                    <PiShareNetworkDuotone color="gray" />
                                    <p className="text-xs text-gray-500">Share</p>
                                </button>
                            </div>
                            {
                                commentBoxOpen && (
                            <div className="comment-box p-3 grid grid-cols-1 gap-3 border-t border-gray-200">
                                {
                                    post?.comments?.map((comment: Comments, index: number) => (
                                        <div key={index} className="flex gap-3">
                                            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                                                <p className="text-xs">{comment?.userDetails?.name ? comment?.userDetails?.name[0] : 'U'}</p>
                                            </div>
                                            <div className="flex-1">
                                                <div className="bg-gray-200 flex  rounded-md p-2">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium">{comment.userDetails?.name}</p>
                                                        <p className="text-xs text-gray-700">{comment.text}</p>
                                                    </div>
                                                    {
                                                        comment.userId === logedUser?.id && (
                                                            <button onClick={() => deleteCommentOnPost(post._id as string, comment._id as string)}>
                                                                <FaTrash color="gray" size={12} />
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                                <p className="text-xs text-gray-700">{formatRelativeTime(comment?.createdAt)}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="flex gap-3 mt-3 items-center">
                                    <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xs text-white">
                                        <p>Y</p>
                                    </div>
                                    <form onSubmit={handleSubmitComment(() => addCommentOnPost(post?._id as string))} className="flex flex-1 gap-2">
                                        <FormControl className="flex-1" error={Boolean(commentErrors.comment)}>
                                            <Controller 
                                                name="comment"
                                                control={commentControl}
                                                rules={{
                                                    required:{value:true, message:'Comment can not be empty'}
                                                }}
                                                render={({field}) => (
                                                    <div className=" bg-gray-100 rounded-md py-1 px-2">
                                                        <input {...field} type="text" placeholder="Write a comment" />
                                                    </div>
                                                )}      
                                            />
                                            <FormHelperText>{commentErrors.comment?.message}</FormHelperText>
                                        </FormControl>
                                    <button type="submit" className="bg-gray-500 p-2 rounded-md">
                                        <LuSend color="white" />
                                    </button>
                                    </form>
                                </div>
                            </div>
                            )
                        }
                        </div>
                    )) 
                    )
                }
                
            </div>
            
        </div>
        
        </>
    )
}