import { Notify } from 'notiflix';
import {
  addComment
} from '../../services/userServices';
import { FaHeart, FaTrash } from 'react-icons/fa6';
import { CiHeart } from 'react-icons/ci';
import { PiShareNetworkDuotone } from 'react-icons/pi';
import { formatRelativeTime } from '../../services/util/formatDate';
import { FormControl, FormHelperText } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import { Comments, UserPosts } from '../../types/entityTypes';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { LuSend } from 'react-icons/lu';
import { Controller, useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../context/PostContext';
import { useSelector } from 'react-redux'; 

export default function Post({ postData, loading }: { postData: UserPosts; loading: any }) {
    
    const {
        showHeartAnimation,
        postLiked,
        isTextExpanded,
        toggleDescriptionVisibility,
        showDescription,
        unlikePost,
        likePost,
        setComment,
        toggleCommentBoxOpen,
        commentBoxOpen,
        deleteCommentOnPost,
        addCommentOnPost,
        transoformCloudinaryUrl
    } = useContext(PostContext)
    
    type CommentInput = {
        comment: string
    }

    const logedUser = useSelector((state: any) => {
        return state.userAuth.user
    })

    const {watch, control, handleSubmit, reset, formState:{errors: commentErrors}} = useForm<CommentInput>({defaultValues:{comment:''}})
    
    const addComment = async (data: CommentInput) => {
        //alert('called the function')
        const text = data.comment
        //setComment(text)
        reset({
            comment:''
        })
        //alert('going to call function inside context')
        await addCommentOnPost(postData?._id as string, text)
    }
    //   const {} = useContext(PostContext)

  //   const [post, setPost] = useState<any>();
  //   const [likes, setLikes] = useState<any>([]);
  //   const [comments, setComments] = useState<Comments[]>([]);
  //   const [isTextExpanded, setIsTextExpanded] = useState(false);
  //   const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  //   const [commentText, setCommentText] = useState('');
  //   const [showHeartAnimation, setShowHeartAnimation] = useState(false)

  //   const [postLiked, setPostLiked] = useState(false);
  //   const [animationShowing, setAnimationShowing] = useState(false);

  //   const expandText = () => setIsTextExpanded(true);
  //   const collapseText = () => setIsTextExpanded(false);

  //   console.log('posts', post);
  //   console.log('Checking comments ', post?.comments);
  //   console.log('accessing one commet', post?.comments[0]?.userDetails?.name);
  //   const logedUser = useSelector((state: any) => {
  //     return state?.userAuth?.user;
  //   });

  //   const toggleCommentBoxOpen = () => {}
  //   const [commentBoxOpen, setCommentBoxOpen] = useState(false)

  //   // problem while listing comments need to fix it
  //   useEffect(() => {
  //     setPost(post);
  //     setLikes(post?.likes);
  //     setComments(post?.comments || []);
  //   }, [post]);

  //   const dummyComments = [
  //     {
  //       id: 1,
  //       user: {
  //         name: 'John Doe',
  //         profilePic: defaultPicture,
  //       },
  //       comment: 'This is a great post! Thanks for sharing.',
  //     },
  //     {
  //       id: 2,
  //       user: {
  //         name: 'Jane Smith',
  //         profilePic: defaultPicture,
  //       },
  //       comment: 'Very insightful. I learned a lot.',
  //     },
  //     {
  //       id: 3,
  //       user: {
  //         name: 'Alex Johnson',
  //         profilePic: defaultPicture,
  //       },
  //       comment: 'Could you share more details about the process?',
  //     },
  //   ];

  //   const displayDiscription = (text: string, maxLength: number = 50) => {
  //     if (isTextExpanded) {
  //       return text;
  //     } else {
  //       return text && text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  //     }
  //   };

  //   const navitateTo = useNavigate();
  //   console.log(logedUser);
  //   console.log('this is loged user id', logedUser?.id);

  //   const likePost = async (postId: string) => {
  //     setPostLiked(true);
  //     setAnimationShowing(true);
  //     setTimeout(() => {
  //       setAnimationShowing(false);
  //     }, 600);

  //     try {
  //       const result = await likeUserPost(postId);
  //       if (!result?.success) {
  //         Notify.failure('Something went wrong', { timeout: 2000 });
  //       }
  //     } catch (error: unknown) {
  //       Notify.failure('Something went wrong', { timeout: 2000 });
  //     }
  //   };

  //   const unlikePost = async (postId: string) => {
  //     setPostLiked(false);
  //     setAnimationShowing(true);
  //     setTimeout(() => {
  //       setAnimationShowing(false);
  //     }, 600);

  //     try {
  //       const result = await unlikeUserPost(postId);
  //       if (!result?.success) {
  //         Notify.failure('Something went wrong', { timeout: 2000 });
  //       }
  //     } catch (error: unknown) {
  //       Notify.failure('Something went wrong', { timeout: 2000 });
  //     }
  //   };

  //   const addcommentonpost = async (postId: string) => {
  //     try {
  //       const result = await addComment(postId, 'commentText');

  //       if (result?.success) {
  //         setCommentText('');
  //         // To reflect the new comment without a page reload
  //         const newComment = result.comment;
  //         setComments((prevComments) => [newComment, ...prevComments]);
  //         Notify.success('Comment added', { timeout: 1200 });
  //       } else {
  //         Notify.failure('Something went wrong', { timeout: 1200 });
  //       }
  //     } catch (error: unknown) {
  //       Notify.failure('Something went wrong', { timeout: 1200 });
  //     }
  //   };

  //   const deleteCommentOnPost = async (commentId: string) => {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       allowOutsideClick: false,
  //       confirmButtonText: 'Yes, delete it!',
  //     }).then(async (result) => {
  //       if (result?.isConfirmed) {
  //         try {
  //           const result = await deleteComment(post?._id, commentId);
  //           if (result?.success) {
  //             Notify.success('Comment deleted', { timeout: 1200 });
  //             // To reflect the new comment without a page reload
  //             setComments((prvComments: Comments[]) => {
  //               return prvComments.filter((comment: Comments) => comment._id !== commentId);
  //             });
  //           } else {
  //             Notify.failure('Something went wrong', { timeout: 1200 });
  //           }
  //         } catch (error: unknown) {
  //           Notify.failure('Something went wrong', { timeout: 1200 });
  //         }
  //       } else {
  //         return;
  //       }
  //     });
  //   };

  //   const goToAuthorDetails = (candidateId: string) => {
  //     navitateTo(`/candidates/${candidateId}`);
  //   };

  //   // console.log('this is userid', parsed)
  //   console.log('this is likes', likes);

  return (
    <div className=" border border-gray-200 rounded-md bg-white">
      <div className="p-3">
        <div className="flex gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
            <p>{postData?.userDetails?.name ? postData?.userDetails?.name[0] : 'Aspiro User'}</p>
          </div>
          <div className="flex-1">
            <p className="font-light text-sm">{postData?.userDetails?.name}</p>
            <p className="text-sm text-gray-700 font-light">
              {postData?.userDetails?.headline || 'User'}
            </p>
            <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(postData?.createdAt)}</p>
          </div>
          <div>
            <button>
              <BsThreeDotsVertical />
            </button>
          </div>
        </div>
      </div>
      {/* <div>
        {transoformCloudinaryUrl(postData?.media?.cloudUrl)}
      </div> */}
      {postData?.media?.cloudUrl && (
        <div>
          <img className="w-full h-auto" src={transoformCloudinaryUrl(postData?.media?.cloudUrl, 'q_auto:best,f_auto')} alt="" />
        </div>
      )}
      <div className="p-3 relative">
        {showHeartAnimation && (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute flex items-center justify-center w-full h-full"
            >
              <FaHeart size={50} color={`${postLiked ? 'red' : 'white'}`} />
            </motion.div>
          </AnimatePresence>
        )}
        <p className="text-sm font-light text-gray-700">{showDescription(postData?.description)}</p>
        {isTextExpanded ? (
          <button onClick={toggleDescriptionVisibility} className="text-xs text-gray-500">
            Read les
          </button>
        ) : (
          <button onClick={toggleDescriptionVisibility} className="text-xs text-blue-500">
            Read more
          </button>
        )}
      </div>
      <div className="border t border-gray-200 text-xs text-gray-500 flex gap-2 p-3">
        <div className="flex-1">
          <p>{postData?.likes.length || 0} likes</p>
        </div>
        <div className="flex items-center gap-3">
          <p>{postData?.comments.length || 0} comments</p>
          <p>{postData?.shares.length || 0} share</p>
        </div>
      </div>
      <div className="border-t flex border-gray-200">
        {postLiked || postData?.likes.includes(logedUser?.id) ? (
          <>
            <button
              onClick={() => unlikePost(postData?._id as string)}
              className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center"
            >
              <FaHeart size={18} color="red" />
              <p className="text-xs text-gray-500">Unlike</p>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => likePost(postData?._id as string)}
              className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center"
            >
              <CiHeart size={20} color="gray" />
              <p className="text-xs text-gray-500">Like</p>
            </button>
          </>
        )}
        <button
          onClick={toggleCommentBoxOpen}
          className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center"
        >
          <IoChatbubbleOutline color="gray" />
          <p className="text-xs text-gray-500">Comment</p>
        </button>
        <button className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center">
          <PiShareNetworkDuotone color="gray" />
          <p className="text-xs text-gray-500">Share</p>
        </button>
      </div>
      {commentBoxOpen && (
        <div className="comment-box p-3 grid grid-cols-1 gap-3 border-t border-gray-200">
          {postData?.comments?.map((comment: Comments, index: number) => (
            <div key={index} className="flex gap-3">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                <p className="text-xs">
                  {comment?.userDetails?.name ? comment?.userDetails?.name[0] : 'U'}
                </p>
              </div>
              <div className="flex-1">
                <div className="bg-gray-200 flex  rounded-md p-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{comment.userDetails?.name}</p>
                    <p className="text-xs text-gray-700">{comment.text}</p>
                  </div>
                  {comment.userId === logedUser?.id && (
                    <button
                      onClick={() => deleteCommentOnPost(postData._id as string, comment._id as string)}
                    >
                      <FaTrash color="gray" size={12} />
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-700">{formatRelativeTime(comment?.createdAt)}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-3 mt-3 items-center">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xs text-white">
              <p>Y</p>
            </div>
            <form
              onSubmit={handleSubmit(addComment)}
              className="flex flex-1 gap-2"
            >
              <FormControl className="flex-1" error={Boolean(commentErrors.comment)}>
                <Controller
                  name="comment"
                  control={control}
                  rules={{
                    required: { value: true, message: 'Comment can not be empty' },
                  }}
                  render={({ field }) => (
                    <div className=" bg-gray-100 rounded-md py-1 px-2">
                      <input {...field} type="text" placeholder="Write a comment" className='w-full' />
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
      )}
    </div>
  );
}
