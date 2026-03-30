import React, { createContext, useContext, useEffect, useState } from "react";
import { Comments, Notification, UserPosts } from "../types/entityTypes";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment, deletePost, hidePost, likeComment, likeUserPost, unlikeComment, unlikeUserPost } from "../services/userServices";
import { Notify } from "notiflix";
import Swal from "sweetalert2";
import { BsFillArrowDownLeftSquareFill } from "react-icons/bs";
import { getSocket } from "../socket";
import { addLiveNotification } from "../redux/notificationSlice";

//context for all operations related to post
interface CommentAddingResponsePayload {
    success: boolean;
    message: string;
    comment: Comments
}

export const PostContext = createContext<any>(null)

export default function PostProvider({children}: {children: React.ReactNode}){
    //get socket from socket context
    const socket = null
    
    const logedUser = useSelector((state: any) => {
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
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:2000})
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
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:2000})
        }
    }

    const addCommentOnPost = async (postId: string, commentText: string, parentId?: string | null = null) => {
        const text = commentText
        setComment('')
        try {
            const result: CommentAddingResponsePayload = await addComment(postId, text, parentId)

            if(!result?.success){
                Notify.failure(result?.message, {timeout:2000})
                return
            }

            Notify.success(result?.message)


            const {_id} = result.comment //geting comment id

            //alert('filding commented post')
            setUserPosts((posts: UserPosts[]) => {
                return posts.map((post: UserPosts) => {
                    if(post._id === postId){
                        return {
                            ...post,
                            comments: [...post.comments, {
                                _id,
                                userId:logedUser.id,
                                postId,
                                text,
                                userDetails:{
                                    name: logedUser.name,
                                    headline: logedUser.headline
                                },
                                createdAt:`${new Date()}`
                            }]
                        }
                    }else{
                        return post
                    }
                })
            })

           
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:2000})
        }
    }

    const deleteCommentOnPost = async (postId: string, commentId: string) => {
        if(!postId || !commentId) return
        Swal.fire({
            icon:'warning',
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
                    Notify.failure(result?.message, {timeout:2000})
                    return
                }

                //update ui
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
                                comments: post.comments.map((comment: Comments) => comment._id === commentId ? {...comment, likes: comment?.likes + 1} : comment)
                            }
                        }else{
                            return post
                        }
                    })
                })
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
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
                                comments: post.comments.map((comment: Comments) => comment._id === commentId ? {...comment, likes: comment?.likes - 1} : comment)
                            }
                        }else{
                            return post
                        }
                    })
                })
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
        }
    }

    const deleteMyPost = async (postId: string) => {
        try {
            const result = await deletePost(postId)
            if(result.success){
                setUserPosts((posts: UserPosts[]) => {
                    return posts.filter((post: UserPosts) => post._id !== postId)
                })
                Notify.success(result.message)
            }else{
                Notify.failure(result.message)
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
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
                        Notify.success(result.message)
                        return
                    }
                })
            
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
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
                dispatch(addLiveNotification({notification}))
            })


            
            return () => {
                socket.off('FEED_POST_LIKED')
                socket.off('POST_LIKED')
            }
            
        }
    }, [getSocket])


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