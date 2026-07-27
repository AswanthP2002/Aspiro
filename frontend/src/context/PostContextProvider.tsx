import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Comments, Notification, UserPosts } from "../types/entityTypes";
import { addComment, deleteComment, deletePost, hidePost, likeComment, likeUserPost, unlikeComment, unlikeUserPost } from "../services/userServices";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getSocket } from "../socket";
import { addLiveNotification } from "../redux/notificationSlice";
import { PostContext } from "./PostContext";
interface RootUser {
    userAuth: {
        user:{
            _id: string;
            name: string;
            profilePicture: string;
            headline: string;
            email: string;
        }
    }
}

interface CommentAddingResponsePayload {
    success: boolean;
    message: string;
    comment: Comments
}

export default function PostProvider({children}: {children: React.ReactNode}){
    //get socket from socket context
    // const socket = null
    
    const logedUser = useSelector((state: RootUser) => {
        return state.userAuth.user
    })
    const dispatch = useDispatch()
    
    //user posts
    const [userPosts, setUserPosts] = useState<UserPosts[]>([])
    const [isTextExpanded, setIsTextExpanded] = useState<boolean>(false)
    const [postLiked, setPostLiked] = useState<boolean>(false)
    const [showHeartAnimation, setShowHeartAnimation] = useState<boolean>(false)
    const [comment, setComment] = useState<string>('')
    const [commentBoxOpen, setCommentBoxOpen] = useState<boolean>(false)

    console.log(setPostLiked, setShowHeartAnimation)

    //handles description visibility
    const showDescription = (description: string, maxLength: number = 100) => {
        if(isTextExpanded){
            return description
        }else{
            return description && description?.length > maxLength ? `${description.slice(0, maxLength)}...` : description
        }
    }

    const transoformCloudinaryUrl = (url: string, transformations: string = 'q_auto,f_auto') : string => {
        const splited = url.split('/')
        const leftPart = splited.slice(0, 6)
        const rightPart = splited.slice(6)
        const merged = [...leftPart, transformations, ...rightPart]
        const joined = merged.join('/')
        return joined
    }

    //handles collapse / expand buttons
    const toggleDescriptionVisibility = () => setIsTextExpanded(prv => !prv)

    const toggleCommentBoxOpen = () => setCommentBoxOpen(prv => !prv)

    //like post
    const likePost = async (postId: string, ownerId: string) => {
        setUserPosts((post: UserPosts[]) => {
            return post.map((post: UserPosts) => {
                if(post._id === postId){
                    return {
                        ...post,
                        likes: [...post.likes, logedUser._id]
                    }
                }else{
                    return post
                }
            })
        })
        try {
            await likeUserPost(postId, ownerId, logedUser.name, logedUser.profilePicture)
            
        } catch (error: unknown) {
            const err = error as AxiosError<{message: string}>
            const message = err.response?.data.message || err.message || 'Something went wrong'
            toast.error(message)
        }
    }

    const unlikePost = async (postId: string) => {
        setUserPosts((posts: UserPosts[]) => {
            return posts.map((post: UserPosts) => {
                if(post._id === postId){
                    return {
                        ...post, likes:post.likes.filter((id: string) => id !== logedUser._id)
                    }
                }else{
                    return post
                }
            })
        })
        
        //api call
        try {
            await unlikeUserPost(postId)
        } catch (error: unknown) {
            const err = error as AxiosError<{message: string}>
            const message = err.response?.data.message || err.message || 'Something went wrong'
            toast.error(message)
        }
    }

    const addCommentOnPost = async (postId: string, commentText: string, parentId: string | null = null) => {
        const text = commentText
        setComment('')
        try {
            const result: CommentAddingResponsePayload = await addComment(postId, text, parentId)

            if(!result?.success){
                toast.error(result.message)
                return
            }

            toast.success(result?.message)


            const {_id} = result.comment //geting comment id

            //alert('filding commented post')
            setUserPosts((posts: UserPosts[]) => {
                return posts.map((post: UserPosts) => {
                    if(post._id === postId){
                        return {
                            ...post,
                            comments: post.comments ? [...post.comments, {
                                _id,
                                userId:logedUser._id,
                                postId,
                                text,
                                depth: parentId ? 1 : 0,
                                userDetails:{
                                    name: logedUser.name,
                                    headline: logedUser.headline,
                                    socialLinks: []
                                },
                                likes: 0,
                                createdAt:`${new Date()}`
                            }] : [{
                                _id,
                                userId:logedUser._id,
                                postId,
                                text,
                                depth: parentId ? 1 : 0,
                                userDetails:{
                                    name: logedUser.name,
                                    headline: logedUser.headline,
                                    socialLinks: []
                                },
                                likes: 0,
                                createdAt:`${new Date()}`
                            }]
                        }
                    }else{
                        return post
                    }
                })
            })

           
        } catch (error: unknown) {
            const err = error as AxiosError<{message: string}>
            const msg = err.response?.data.message || err.message || 'Something went wrong'
            toast.error(msg)
        }
    }

    const deleteCommentOnPost = async (postId: string, commentId: string) => {
        if(!postId || !commentId) return
        Swal.fire({
            icon:'question',
            title:'Delete Comment?',
            width:'300',
            showConfirmButton:true,
            confirmButtonText:'Delete',
            showCancelButton:true,
            cancelButtonText:'Cancel'
        }).then(async (result) => {
            if(result?.isConfirmed){
                //api call
                const result = await deleteComment(postId, commentId)

                if(!result?.success){
                    toast.error(result?.message)
                    return
                }

                //update ui removing main comment
                setUserPosts((posts: UserPosts[]) => {
                    return posts.map((post: UserPosts) => {
                        if(post._id === postId){
                            return {
                                ...post,
                                comments: post.comments.filter((comment: Comments) => comment._id !== commentId)
                            }
                        }else{
                            return post
                        }
                    })
                })

                setUserPosts((posts: UserPosts[]) => {
                    return posts.map((post: UserPosts) => {
                        if(post._id === postId){
                            return {
                                ...post,
                                comments: post.comments.filter((comment: Comments) => comment.parentId !== commentId)
                            }
                        }else{
                            return post
                        }
                    })
                })

                

                
            }else{
                return
            }
        })
    }

    const likeACommentOnAPost = async (postId: string, commentId: string, postOwnerId: string) => {
        try {
            const result: CommentAddingResponsePayload = await likeComment(postId, commentId, postOwnerId)
            if(result.success){
                setUserPosts((posts: UserPosts[]) => {
                    return posts.map((post: UserPosts) => {
                        if(post._id === postId){
                            return {
                                ...post,
                                comments: post.comments.map((comment: Comments) => comment._id === commentId ? {...comment, likes: comment.likes ? comment.likes + 1 : 1} : comment)
                            }
                        }else{
                            return post
                        }
                    })
                })
            }
        } catch (error: unknown) {
            const err = error as AxiosError<{message: string}>
            const msg = err.response?.data.message || err.message || 'Something went wrong'
            toast.error(msg)
        }
    }

    const unlikeACommentOnAPost = async (postId: string, commentId: string, postOwnerId: string) => {
        try {
            const result: CommentAddingResponsePayload = await unlikeComment(postId, commentId, postOwnerId)
            if(result.success){
                setUserPosts((posts: UserPosts[]) => {
                    return posts.map((post: UserPosts) => {
                        if(post._id === postId){
                            return {
                                ...post,
                                comments: post.comments.map((comment: Comments) => comment._id === commentId ? {...comment, likes: comment?.likes ? comment?.likes - 1 : 0} : comment)
                            }
                        }else{
                            return post
                        }
                    })
                })
            }
        } catch (error: unknown) {
            const err = error as AxiosError<{message: string}>
            const msg = err.response?.data.message || err.message || 'Something went wrong'
            toast.error(msg)
        }
    }

    const deleteMyPost = async (postId: string) => {
        try {
            const result = await deletePost(postId)
            if(result.success){
                setUserPosts((posts: UserPosts[]) => {
                    return posts.filter((post: UserPosts) => post._id !== postId)
                })
                toast.success(result.message)
            }else{
                toast.error(result.message)
            }
        } catch (error: unknown) {
            const err = error as AxiosError<{message: string}>
            const msg = err.response?.data.message || err.message || 'Something went wrong'
            toast.error(msg)
        }
    }

    const hideAPost = async (postId: string) => {
        try {
            const originalPosts = userPosts
            setUserPosts((post: UserPosts[]) => {
                return post.filter((post: UserPosts) => post._id !== postId)
            })
            
            
                Swal.fire({
                    icon: 'success',
                    title: 'Post hidden successfully',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Undo',
                    cancelButtonText: 'Close'
                }).then(async (response) => {
                    if(response.isConfirmed){
                        setUserPosts(originalPosts)
                        return
                    }else{
                        const result = await hidePost(postId)
                        toast.success(result.message)
                        return
                    }
                })
            
        } catch (error: unknown) {
            const err = error as AxiosError<{message: string}>
            const msg = err.response?.data.message || err.message || 'Something went wrong'
            toast.error(msg)
        }
    }


    useEffect(() => {
        const socket = getSocket()
        if(socket){
            //broadcasts
            socket.on('FEED_POST_LIKED', ({postId, userId}) => {
                setUserPosts((prv: UserPosts[]) => {
                    return prv.map((post: UserPosts) => {
                        if(post._id === postId){
                            return {
                                ...post,
                                likes: [...post.likes, userId]
                            }
                        }else{
                            return post
                        
                        }
                    })
                })
            })



            //individual
            socket.on('POST_LIKED', (notification: Notification) => {
                dispatch(addLiveNotification({notification: notification}))
            })


            
            return () => {
                socket.off('FEED_POST_LIKED')
                socket.off('POST_LIKED')
            }
            
        }
    }, [dispatch]) //removed getSocket dependancy due to recomendation


    return <PostContext.Provider
            value={{
                userPosts,
                isTextExpanded,
                postLiked,
                showHeartAnimation,
                comment,
                commentBoxOpen,
                toggleCommentBoxOpen,
                setComment,
                likePost,
                unlikePost,
                addCommentOnPost,
                deleteCommentOnPost,
                setUserPosts, 
                showDescription, 
                toggleDescriptionVisibility,
                transoformCloudinaryUrl,
                likeACommentOnAPost,
                unlikeACommentOnAPost,
                deleteMyPost,
                hideAPost
            }}
            >
        {children}
    </PostContext.Provider>
}