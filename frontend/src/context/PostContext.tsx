import React, { createContext, useContext, useEffect, useState } from "react";
import { Comments, UserPosts } from "../types/entityTypes";
import { useSelector } from "react-redux";
import { addComment, deleteComment, likeUserPost, unlikeUserPost } from "../services/userServices";
import { Notify } from "notiflix";
import { SocketContext } from "./SocketContext";
import Swal from "sweetalert2";
import { BsFillArrowDownLeftSquareFill } from "react-icons/bs";

//context for all operations related to post

export const PostContext = createContext<any>(null)

export default function PostProvider({children}: {children: React.ReactNode}){
    //get socket from socket context
    const {socket} = useContext(SocketContext)
    
    const logedUser = useSelector((state: any) => {
        return state.userAuth.user
    })
    
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
    const likePost = async (postId: string) => {
        //update ui instantly
        setPostLiked(true)
        setShowHeartAnimation(true)
        setTimeout(() => setShowHeartAnimation(false), 600)

        setUserPosts((posts: UserPosts[]) => {
            return posts.map((post: UserPosts) => {
                if(post._id === postId){
                    return {
                        ...post,
                        likes: [...post.likes, logedUser.id] // Correctly spread the likes array
                    }
                }else{
                    return post
                }
            })
        })
        
        //api call
        try {
            await likeUserPost(postId)
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:2000})
        }
    }

    const unlikePost = async (postId: string) => {
        setPostLiked(false)
        setShowHeartAnimation(true)
        setTimeout(() => setShowHeartAnimation(false), 600)

        //update ui instantly
        setUserPosts((posts: UserPosts[]) => {
            return posts.map((post: UserPosts) => {
                if(post._id === postId){
                    return {
                        ...post, likes:post.likes.filter((id: string) => id !== logedUser.id)
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

    const addCommentOnPost = async (postId: string, commentText: string) => {
        const text = commentText
        setComment('')
        try {
            const result = await addComment(postId, text)

            if(!result?.success){
                Notify.failure(result?.message, {timeout:2000})
                return
            }

            Notify.success(result?.message, {timeout:2000})


            const {_id} = result?.comment //geting comment id

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


    //useeffect for real time update 
    useEffect(() => {
        console.log('socket out of if', socket)
        if(socket){
            //real time update for post liked
            socket.on('postLiked', ({postId, userId}: {postId: string, userId: string}) => {
            //     //to avoid duplicate ui updation check if the userId is same as loged user is if ? then avoid the
            //     //updatio through socket for acted user
                
            //     Notify.info(`post liked by ${userId}`)
                if(userId === logedUser?.id) return

            //     //update ui through real time
                setUserPosts((posts: UserPosts[]) => {
                  return posts.map((post: UserPosts) => {
                    if (post._id === postId) {
                      return {
                        ...post,
                        likes: [...post.likes, userId],
                      };
                    } else {
                      return post;
                    }
                  });
                });
            })

            //real time update for post unliked
            socket.on('postUnliked', ({postId, userId}: {postId: string, userId: string}) => {
                Notify.info(`post unliked by ${userId}`)
                if(userId === logedUser?.id) return
                
                setUserPosts((posts: UserPosts[]) => {
                  return posts.map((post: UserPosts) => {
                    if (post._id === postId) {
                      return {
                        ...post,
                        likes: post.likes.filter((id: string) => id !== userId),
                      };
                    } else {
                      return post;
                    }
                  });
                });
            })

            socket.on('commentAdded', ({postId, userId, commentId, text}: {postId: string, userId: string, commentId: string, text: string}) => {

                if(userId === logedUser.id){
                    return
                }

                setUserPosts((posts: UserPosts[]) => {
                return posts.map((post: UserPosts) => {
                    if(post._id === postId){
                        return {
                            ...post,
                            comments: [...post.comments, {
                                _id: commentId,
                                userId:logedUser.id,
                                postId,
                                text,
                                createdAt:`${new Date()}`
                            }]
                        }
                    }else{
                        return post
                    }
                })
            })
            })

            socket.on('commentDeleted', ({postId, commentId, userId}: {postId: string, commentId: string, userId: string}) => {
                if(userId === logedUser.id){
                    return
                }

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
            })

            return () => {
                socket.off('postLiked')
                socket.off('postUnliked')
                socket.off('commentAdded')
                socket.off('commentDeleted')
            }
        }
    }, [socket])

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
                transoformCloudinaryUrl
            }}
            >
        {children}
    </PostContext.Provider>
}