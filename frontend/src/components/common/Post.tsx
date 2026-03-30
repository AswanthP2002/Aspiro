
import { FaHeart, FaTrash } from 'react-icons/fa6';
import { CiHeart } from 'react-icons/ci';
import { PiShareNetworkDuotone } from 'react-icons/pi';
import { formatRelativeTime } from '../../services/util/formatDate';
import { FormControl, FormHelperText } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import { Comments, UserPosts } from '../../types/entityTypes';
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { LuSend } from 'react-icons/lu';
import { Controller, useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../context/PostContext';
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { Notify } from 'notiflix';
import { BiBookmark } from 'react-icons/bi';
import { FiEyeOff } from 'react-icons/fi';
import { GoReport } from 'react-icons/go';
import { deletePost, likeComment, togglePostSave } from '../../services/userServices';
import Swal from 'sweetalert2';
import { RiBookMarkedFill } from 'react-icons/ri';

export default function Post({ postData }: { postData: UserPosts }) {
    
    const {
        toggleDescriptionVisibility,
        showDescription,
        unlikePost,
        likePost,
        setComment,
        deleteCommentOnPost,
        addCommentOnPost,
        likeACommentOnAPost,
        unlikeACommentOnAPost,
        deleteMyPost,
        transoformCloudinaryUrl,
        hideAPost
    } = useContext(PostContext)

    const [showHeartAnimation, setShowHeartAnimation] = useState(false)
    const [postLiked, setPostLiked] = useState(false)
    const [commentLiked, setCommentLiked] = useState(false)
    const [isTextExpanded, setIsTextExpanded] = useState(false)
    const [commentBoxOpen, setIsCommentBoxOpen] = useState(false)
    const [isPostOptionMenuOpened, setIsPostOptionMenuOPened] = useState<boolean>(false)
    const [replyTo, setReplyTo] = useState<{commentId: string, name: string} | null>(null)
    const [postIsSaved, setPostIsSaved] = useState(false)

    const togglePostOptionMenuVisibility = () => setIsPostOptionMenuOPened(prv => !prv)
    const toggleCommentBoxOpen = () => setIsCommentBoxOpen(prv => !prv)

    type CommentInput = {
        comment: string
    }

    console.log('checkign post data', postData)
    const logedUser = useSelector((state: any) => {
        return state.userAuth.user
    })

    const {watch, control, handleSubmit, reset, formState:{errors: commentErrors}} = useForm<CommentInput>({defaultValues:{comment:''}})
    
    const likeThisPost = (postId: string, ownerId: string) => {
      if(!ownerId) return Notify.info('NO ownwer id')
      setPostLiked(true)
      setShowHeartAnimation(true)
      setTimeout(() => setShowHeartAnimation(false), 600)
      likePost(postId, ownerId)
    }

    const unlikeThisPost = (postId: string) => {
      if(!postId) return Notify.failure('No Post')
        setPostLiked(false)
      unlikePost(postId)
      
    }
    
    const addComment = async (data: CommentInput) => {
        //alert('called the function')
        const text = data.comment
        //setComment(text)
        reset({
            comment:''
        })
        //alert('going to call function inside context')
        await addCommentOnPost(postData?._id as string, text, replyTo?.commentId || null)
        setReplyTo(null)
      }


    const navigate = useNavigate();

    const navigateToPublicProfile = (userId: string) => {
      if(logedUser.id === userId){
        return navigate('/profile/personal')
      }else{
        return navigate(`/users/${userId}}`, {state:{userId}})
      }
    }

    const amILikedThisPost = () => {
      if(postData.likes.includes(logedUser._id)){
        return true
      }else{
        return false
      }
    }

    const likeAComment = async (postId: string, commentId: string, postOwnerId: string) => {
      if(!postId || !commentId || !postOwnerId) return
      likeACommentOnAPost(postId, commentId, postOwnerId)
      setCommentLiked(true)
    }

    const unlikeAComment = async (postId: string, commentId: string, postOwnerId: string) => {
      if(!postId || !commentId || !postOwnerId) return
      unlikeACommentOnAPost(postId, commentId, postOwnerId)
      setCommentLiked(false)
    }

    const deleteMyPostFromFeed = (postId: string) => {
      if(!postId) return
      Swal.fire({
        icon:'warning',
        title:'Delete Post?',
        width:'300',
        showConfirmButton:true,
        confirmButtonText:'Delete',
        showCancelButton:true,
        cancelButtonText:'Cancel'
      }).then((result) => {
        if(result?.isConfirmed){
          deleteMyPost(postId)
        }else{
          return
        }
      })
    }

    const hideAPostFromFeed = (postId: string) => {
      if(!postId) return
      Swal.fire({
        icon:'warning',
        title:'Hide Post?',
        width:'300',
        showConfirmButton:true,
        confirmButtonText:'Hide',
        showCancelButton:true,
        cancelButtonText:'Cancel'
      }).then((result) => {
        if(result.isConfirmed){
          hideAPost(postId)
        }else{
          return
        }
      })
    }

    const saveAPost = async (postId: string) => {
      if(!postId) return
      try {
        const result = await togglePostSave(postId)
        if(result.success){
          Notify.success(result.message)
          if(result.result.isSaved){
            setPostIsSaved(true)
          }else{
            setPostIsSaved(false)
          }
        }
      } catch (error: unknown) {
        Notify.failure(error instanceof Error ? error.message : 'something went wrong') 
      }
    }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
  {/* Header */}
  <div className="p-4 flex items-center justify-between">
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shadow-inner border border-white/20">
        <p className="text-lg">{postData?.userDetails?.name ? postData?.userDetails?.name[0] : 'U'}</p>
      </div>
      
      <div onClick={() => navigateToPublicProfile(postData?.userDetails?._id as string)} className="flex-1 cursor-pointer">
        <p className="font-semibold text-sm text-gray-900 leading-none hover:text-blue-600 transition-colors">
          {postData?.userDetails?.name}
        </p>
        <p className="text-[12px] text-gray-500 mt-1 line-clamp-1">
          {postData?.userDetails?.headline || 'User'}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5 font-medium italic">
          {formatRelativeTime(postData.createdAt)}
        </p>
      </div>
    </div>

    <div className='relative'>
      <button onClick={togglePostOptionMenuVisibility} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
        <BsThreeDotsVertical size={16} className="text-gray-400" />
      </button>
      {isPostOptionMenuOpened && (
        <div className="absolute bg-white w-40 p-1.5 z-10 right-0 mt-2 rounded-lg border border-gray-200 shadow-xl">
          <ul className='space-y-1'>
            {postIsSaved
              ? (<li onClick={() => saveAPost(postData._id as string)} className='flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-50 rounded-md transition-colors'>
                  <RiBookMarkedFill className="text-blue-500" size={14} />
                  <p className='text-[13px] font-medium'>Unsave post</p>
                </li>)
              : (<li onClick={() => saveAPost(postData._id as string)} className='flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-50 rounded-md transition-colors'>
                  <BiBookmark className="text-gray-500" size={14} />
                  <p className='text-[13px] font-medium'>Save post</p>
                </li>)
            }
            <li onClick={() => hideAPostFromFeed(postData._id as string)} className='flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-50 rounded-md'>
              <FiEyeOff className="text-gray-500" size={14} />
              <p className='text-[13px] font-medium'>Hide post</p>
            </li>
            {logedUser._id === postData.userDetails._id && (
              <li onClick={() => deleteMyPostFromFeed(postData._id as string)} className='flex cursor-pointer items-center gap-2 p-2 hover:bg-red-50 rounded-md group'>
                <FaTrash className="text-gray-400 group-hover:text-red-500" size={12} />
                <p className='text-[13px] font-medium group-hover:text-red-600'>Delete post</p>
              </li>
            )}
            <li className='flex cursor-pointer items-center gap-2 p-2 hover:bg-red-50 rounded-md group border-t border-gray-100 pt-2'>
              <GoReport className="text-red-400" size={14} />
              <p className='text-[13px] font-medium text-red-500'>Report post</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  </div>

  {/* Media */}
  {postData?.media?.cloudUrl && (
    <div className="bg-black/5 border-y border-gray-100">
      {postData?.mediaType === 'video' ? (
        <div className="w-full bg-black flex items-center justify-center aspect-video overflow-hidden">
  <video 
    controls 
    preload="metadata" 
    className="w-full h-full object-cover max-h-[500px]" 
    key={postData?.media?.cloudUrl}
  >
    <source src={postData.media.cloudUrl} type="video/mp4" />
  </video>
</div>
      ) : (
        <img className="w-full h-auto max-h-[600px] object-contain bg-white" src={postData?.media?.cloudUrl} alt="Post content" />
      )}
    </div>
  )}

  {/* Description */}
  <div className="p-4 relative">
    {showHeartAnimation && (
      <AnimatePresence>
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1.2, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <FaHeart size={60} className={postLiked ? 'text-red-500 drop-shadow-lg' : 'text-white drop-shadow-lg'} />
        </motion.div>
      </AnimatePresence>
    )}
    
    <p className="text-[14px] leading-relaxed text-gray-800 whitespace-pre-wrap">{showDescription(postData?.description)}</p>
    <button onClick={toggleDescriptionVisibility} className={`text-[12px] font-bold mt-2 ${isTextExpanded ? 'text-gray-400' : 'text-blue-600 hover:underline'}`}>
      {isTextExpanded ? 'Read less' : 'Read more'}
    </button>
  </div>

  {/* Stats */}
  <div className="mx-4 py-3 border-t border-gray-100 flex items-center justify-between">
    <div className="flex items-center gap-1">
      <div className="flex -space-x-1 items-center">
        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border border-white"><FaHeart size={7} color="white"/></div>
      </div>
      <p className="text-[11px] text-gray-500 font-medium ml-1">{postData?.likes.length || 0} likes</p>
    </div>
    <div className="flex gap-3">
      <p className="text-[11px] text-gray-500 font-medium hover:underline cursor-pointer">{postData?.comments?.length || 0} comments</p>
      <p className="text-[11px] text-gray-500 font-medium hover:underline cursor-pointer">{postData?.shares?.length || 0} share</p>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex border-t border-gray-100 p-1">
    {postLiked || amILikedThisPost() ? (
      <button onClick={() => unlikeThisPost(postData?._id as string)} className="flex-1 py-2.5 flex items-center gap-2 justify-center hover:bg-red-50 rounded-lg transition-colors group">
        <FaHeart size={18} className="text-red-500 group-active:scale-125 transition-transform" />
        <p className="text-[13px] font-semibold text-red-500">Unlike</p>
      </button>
    ) : (
      <button onClick={() => likeThisPost(postData?._id as string, postData.userDetails._id as string)} className="flex-1 py-2.5 flex items-center gap-2 justify-center hover:bg-gray-100 rounded-lg transition-colors group">
        <CiHeart size={22} className="text-gray-500 group-hover:text-red-500 transition-colors" />
        <p className="text-[13px] font-semibold text-gray-600">Like</p>
      </button>
    )}
    <button onClick={toggleCommentBoxOpen} className="flex-1 py-2.5 flex items-center gap-2 justify-center hover:bg-gray-100 rounded-lg transition-colors group">
      <IoChatbubbleOutline size={18} className="text-gray-500 group-hover:text-blue-500 transition-colors" />
      <p className="text-[13px] font-semibold text-gray-600">Comment</p>
    </button>
    <button className="flex-1 py-2.5 flex items-center gap-2 justify-center hover:bg-gray-100 rounded-lg transition-colors group">
      <PiShareNetworkDuotone size={20} className="text-gray-500 group-hover:text-green-600 transition-colors" />
      <p className="text-[13px] font-semibold text-gray-600">Share</p>
    </button>
  </div>

  {/* Comment Box */}
  {commentBoxOpen && (
    <div className="bg-gray-50 border-t border-gray-100 p-4">
      <div className="space-y-4">
        {postData?.comments?.map((comment: Comments, index: number) => (
          <div key={index} className="flex gap-3" style={{ marginLeft: `${(comment.depth || 0) * 32}px` }}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white border border-white shadow-sm">
              <p className="text-xs font-bold">{comment?.userDetails?.name ? comment?.userDetails?.name[0] : 'U'}</p>
            </div>
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded-2xl px-3 py-2 shadow-sm relative">
                <div className="flex justify-between items-start">
                  <div>
                    <p className='text-xs font-bold text-gray-900 leading-tight'>{comment.userDetails?.name}</p>
                    <p className='text-[10px] text-gray-500 leading-tight'>{comment.userDetails?.headline}</p>
                  </div>
                  {comment.userDetails?._id === logedUser._id && (
                    <button onClick={() => deleteCommentOnPost(postData._id as string, comment._id as string)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <FaTrash size={10} />
                    </button>
                  )}
                </div>
                <div className="mt-1.5 flex gap-4">
                  <div className='flex-1'><p className='text-[13px] text-gray-800 leading-relaxed'>{comment.text}</p></div>
                  <div className='flex flex-col items-center justify-center min-w-[20px]'>
                    {commentLiked ? <FaHeart color='#ef4444' size={11} /> : <CiHeart size={14} className="text-gray-400" />}
                    <p className="text-gray-400 font-bold" style={{fontSize: '.65rem'}}>{comment.likes}</p>
                  </div>
                </div>
              </div>
              
              <div className='flex items-center gap-4 mt-1 px-1'>
                <button onClick={() => commentLiked ? unlikeAComment(postData._id as string, comment._id as string, postData.userDetails._id as string) : likeAComment(postData._id as string, comment._id as string, postData.userDetails._id as string)} 
                  className='text-[11px] font-bold text-gray-500 hover:text-blue-600 transition-colors'>
                  {commentLiked ? 'Unlike' : 'Like'}
                </button>
                <button onClick={() => setReplyTo({ commentId: comment._id as string, name: comment.userDetails.name })} className='text-[11px] font-bold text-gray-500 hover:text-blue-600'>
                  Reply
                </button>
                <p className="text-gray-400 font-medium" style={{fontSize: '.65rem'}}>{formatRelativeTime(comment?.createdAt || new Date())}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        {replyTo && (
          <div className="flex justify-between items-center bg-blue-50 px-3 py-1.5 rounded-t-lg border-x border-t border-blue-100">
            <p className="text-[11px] text-blue-700">Replying to <span className="font-bold">{replyTo.name}</span></p>
            <button onClick={() => setReplyTo(null)} className="text-[10px] text-red-500 font-bold hover:underline">Cancel</button>
          </div>
        )}

        <div className="flex gap-3 items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
            <p>{logedUser?.name ? logedUser.name[0] : 'Y'}</p>
          </div>
          <form
            onSubmit={handleSubmit((data) => {
              addCommentOnPost(postData?._id as string, data.comment, replyTo?.commentId || null);
              reset({ comment: '' });
              setReplyTo(null);
            })}
            className="flex-1 flex gap-2"
          >
            <div className={`flex-1 flex items-center bg-white border border-gray-200 px-4 py-2 transition-all focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50 ${replyTo ? 'rounded-b-lg' : 'rounded-full'}`}>
              <Controller
                name="comment"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input {...field} type="text" placeholder={replyTo ? "Write a reply..." : "Add a comment..." } className='w-full text-sm bg-transparent outline-none text-gray-800' autoFocus={!!replyTo} />
                )}
              />
            </div>
            <button type="submit" className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all shadow-md active:scale-90 flex-shrink-0">
              <LuSend color="white" size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )}
</div>
//     <div className=" border border-gray-200 rounded-md bg-white">
//       <div className="p-3">
//         <div className="flex gap-3">
//           <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
//             <p>{postData?.userDetails?.name ? postData?.userDetails?.name[0] : 'U'}</p>
//           </div>
//           <div onClick={() => navigateToPublicProfile(postData?.userDetails?._id as string)} className="flex-1 cursor-pointer">
//             <p className="font-light text-sm">{postData?.userDetails?.name}</p>
//             <p className="text-sm text-gray-700 font-light">
//               {postData?.userDetails?.headline || 'User'}
//             </p>
//             <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(postData?.createdAt)}</p>
//           </div>
//           <div className='relative'>
//             <button onClick={togglePostOptionMenuVisibility}>
//               <BsThreeDotsVertical size={14} color='gray' />
//             </button>
//             {isPostOptionMenuOpened && (
//               <div className="absolute bg-white w-35 p-3 z-5 right-0 rounded-md border border-gray-200 shadow-sm">
//               <ul className='space-y-3'>
//                 {postIsSaved
//                   ? (<li onClick={() => saveAPost(postData._id as string)} className='flex cursor-pointer items-center gap-2'>
//                   <RiBookMarkedFill color='gray' size={14} />
//                   <p className='text-xs'>Unsave post</p>
//                 </li>)
//                  : (<li onClick={() => saveAPost(postData._id as string)} className='flex cursor-pointer items-center gap-2'>
//                   <BiBookmark color='gray' size={14} />
//                   <p className='text-xs'>Save post</p>
//                 </li>)
//                 }
//                 <li onClick={() => hideAPostFromFeed(postData._id as string)} className='flex cursor-pointer items-center gap-2'>
//                   <FiEyeOff color='gray' size={14} />
//                   <p className='text-xs'>Hide post</p>
//                 </li>
//                 {logedUser._id === postData.userDetails._id && (
//                   <li onClick={() => deleteMyPostFromFeed(postData._id as string)} className='flex cursor-pointer items-center gap-2'>
//                   <FaTrash color='gray' size={14} />
//                   <p className='text-xs'>Delete post</p>
//                 </li>
//                 )}
//                 <li className='flex cursor-pointer items-center gap-2'>
//                   <GoReport color='red' size={14} />
//                   <p className='text-xs text-red-500'>Report post</p>
//                 </li>
//               </ul>
//             </div>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* <div>
//         {transoformCloudinaryUrl(postData?.media?.cloudUrl)}
//       </div> */}
//       {postData?.media?.cloudUrl && (
//         <div>
//           {postData?.mediaType === 'video' ? (
//             <div className="w-full bg-black rounded-md overflow-hidden" style={{ minHeight: '200px' }}>
//     <video 
//       controls
//       autoPlay={false}
//       muted
//       playsInline
//       preload="metadata"
//       className="w-full h-full block"
//       // We use a key to ensure React doesn't try to reuse an old video element
//       key={postData?.media?.cloudUrl}
//     >
//       <source src={postData?.media?.cloudUrl} type="video/mp4" />
//       Your browser does not support the video tag.
//     </video>
//   </div>
//           ) : (
//             <img className="w-full h-auto" src={postData?.media?.cloudUrl} alt="" />
//           )}
//         </div>
//       )}
//       <div className="p-3 relative">
//         {showHeartAnimation && (
//           <AnimatePresence>
//             <motion.div
//               initial={{ scale: 0, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0, opacity: 0 }}
//               className="absolute flex items-center justify-center w-full h-full"
//             >
//               <FaHeart size={50} color={`${postLiked ? 'red' : 'white'}`} />
//             </motion.div>
//           </AnimatePresence>
//         )}
        
//         <p className="text-sm font-light text-gray-700">{showDescription(postData?.description)}</p>
//         {isTextExpanded ? (
//           <button onClick={toggleDescriptionVisibility} className="text-xs text-gray-500">
//             Read les
//           </button>
//         ) : (
//           <button onClick={toggleDescriptionVisibility} className="text-xs text-blue-500">
//             Read more
//           </button>
//         )}
//       </div>
//       <div className="border t border-gray-200 text-xs text-gray-500 flex gap-2 p-3">
//         <div className="flex-1">
//           <p>{postData?.likes.length || 0} likes</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <p>{postData?.comments?.length || 0} comments</p>
//           <p>{postData?.shares?.length || 0} share</p>
//         </div>
//       </div>
//       <div className="border-t flex border-gray-200">
//         {postLiked || amILikedThisPost() ? (
//           <>
//             <button
//               onClick={() => unlikeThisPost(postData?._id as string)}
//               className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center"
//             >
//               <FaHeart size={18} color="red" />
//               <p className="text-xs text-gray-500">Unlike</p>
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() => likeThisPost(postData?._id as string, postData.userDetails._id as string)}
//               className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center"
//             >
//               <CiHeart size={20} color="gray" />
//               <p className="text-xs text-gray-500">Like</p>
//             </button>
//           </>
//         )}
//         <button
//           onClick={toggleCommentBoxOpen}
//           className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center"
//         >
//           <IoChatbubbleOutline color="gray" />
//           <p className="text-xs text-gray-500">Comment</p>
//         </button>
//         <button className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center">
//           <PiShareNetworkDuotone color="gray" />
//           <p className="text-xs text-gray-500">Share</p>
//         </button>
//       </div>
//       {commentBoxOpen && (
//   <div className="comment-box p-3 grid grid-cols-1 gap-3 border-t border-gray-200">
//     {/* 1. RENDER COMMENTS & REPLIES */}
//     {postData?.comments?.map((comment: Comments, index: number) => (
//       <div 
//         key={index} 
//         className="flex gap-3"
//         // Indent based on depth: 0 depth = 0px, 1 depth = 30px, etc.
//         style={{ marginLeft: `${(comment.depth || 0) * 30}px` }}
//       >
//         <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white">
//           <p className="text-xs">
//             {comment?.userDetails?.name ? comment?.userDetails?.name[0] : 'U'}
//           </p>
//         </div>
//         <div className="flex-1">
//           <div className="bg-gray-100 rounded-md p-2">
//             <div className="flex justify-between">
//               <div>
//                 <p className='text-sm font-medium'>{comment.userDetails?.name}</p>
//                 <p className='text-xs text-gray-500'>{comment.userDetails?.headline}</p>
//               </div>
//               {comment.userDetails?._id === logedUser._id && (
//                 <button onClick={() => deleteCommentOnPost(postData._id as string, comment._id as string)}>
//                   <FaTrash color='gray' size={12} />
//                 </button>
//               )}
//             </div>
//             <div className="mt-2 flex gap-3">
//               <div className='flex-1'><p className='text-xs'>{comment.text}</p></div>
//               <div className='flex flex-col items-center'>
//                 {commentLiked ? <FaHeart color='red' size={12} /> : <CiHeart />}
//                 <p style={{fontSize: '.7rem'}}>{comment.likes}</p>
//               </div>
//             </div>
//           </div>
          
//           {/* ACTION BUTTONS (LIKE / REPLY) */}
//           <div className='flex justify-between items-center px-1'>
//             <div className='space-x-3'>
//               {commentLiked
//                 ? <button onClick={() => unlikeAComment(postData._id as string, comment._id as string, postData.userDetails._id as string)} className='text-[10px] font-bold text-gray-600'>Unlike</button>
//                 : <button onClick={() => likeAComment(postData._id as string, comment._id as string, postData.userDetails._id as string)} className='text-[10px] font-bold text-gray-600'>Like</button>
//               }
              
//               {/* REPLY TRIGGER: Sets the replyTo state with this comment's details */}
//               <button 
//                 onClick={() => setReplyTo({ commentId: comment._id as string, name: comment.userDetails.name })}
//                 className='text-[10px] font-bold text-gray-600'
//               >
//                 Reply
//               </button>
//             </div>
//             <p className="text-gray-500" style={{fontSize: '.65rem'}}>{formatRelativeTime(comment?.createdAt)}</p>
//           </div>
//         </div>
//       </div>
//     ))}

//     {/* 2. THE INPUT SECTION */}
//     <div className="mt-3">
//       {/* REPLY INDICATOR: Shows up only when you click "Reply" on a comment */}
//       {replyTo && (
//         <div className="flex justify-between items-center bg-blue-50 px-3 py-1 rounded-t-md border-t border-x border-blue-100">
//           <p className="text-[10px] text-blue-600">Replying to <span className="font-bold">{replyTo.name}</span></p>
//           <button onClick={() => setReplyTo(null)} className="text-[10px] text-red-500 font-bold">Cancel</button>
//         </div>
//       )}

//       <div className="flex gap-3 items-center">
//         <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white">
//           <p>{logedUser?.name ? logedUser.name[0] : 'Y'}</p>
//         </div>
//         <form
//           onSubmit={handleSubmit((data) => {
//              // Pass the parentId if we are replying, otherwise pass null
//              addCommentOnPost(postData?._id as string, data.comment, replyTo?.commentId || null);
//              reset({ comment: '' });
//              setReplyTo(null); // Reset the reply state after sending
//           })}
//           className="flex flex-1 gap-2"
//         >
//           <FormControl className="flex-1" error={Boolean(commentErrors.comment)}>
//             <Controller
//               name="comment"
//               control={control}
//               rules={{ required: { value: true, message: 'Comment cannot be empty' } }}
//               render={({ field }) => (
//                 <div className={`bg-gray-100 border border-gray-200 py-1 px-2 ${replyTo ? 'rounded-b-md' : 'rounded-md'}`}>
//                   <input {...field} type="text" placeholder={replyTo ? "Write a reply..." : "Write a comment..."} className='w-full !text-xs bg-transparent focus:outline-none' autoFocus={!!replyTo} />
//                 </div>
//               )}
//             />
//           </FormControl>
//           <button type="submit" className="bg-blue-600 p-2 rounded-md hover:bg-blue-700 transition-colors">
//             <LuSend color="white" size={16} />
//           </button>
//         </form>
//       </div>
//     </div>
//   </div>
// )}
//     </div>
  );
}
