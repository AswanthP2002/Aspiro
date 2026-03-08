import { useContext, useEffect, useRef, useState } from "react"
import { createPost, getPosts } from "../../../services/userServices";
import { useSelector } from "react-redux";
import { UserPosts } from "../../../types/entityTypes"
import { Notify } from "notiflix"
import { CiImageOn, CiVideoOn } from "react-icons/ci"
import { Controller, useForm } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";
import { FaCircleXmark } from "react-icons/fa6";
import { PostContext } from "../../../context/PostContext";
import Post from "../../../components/common/Post";

interface CreatePostResponsePayload {
    success: boolean
    message: string
    result: UserPosts
}

interface RootState {
    userAuth: {
        user: {
            profilePicture: string,
            name: string
        }
    }
}

export default function Feed() {
    
    const {
        userPosts, 
        setUserPosts
    } = useContext(PostContext)

    interface PostInput {
        description: string
    }

    const [mediaFile, setMediaFile] = useState<File | null>(null)
    const [mediaPreview, setMediaPreview] = useState<string>('')
    const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null)
    const [progress, setProgress] = useState(0)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    
    const mediaFileRef = useRef<HTMLInputElement | null>(null)

    const clickedMediaUpload = (type: 'image' | 'video') => {
        if (mediaFileRef.current) {
            mediaFileRef.current.accept = type === 'image' ? 'image/*' : 'video/*';
            mediaFileRef.current.click();
        }
    }

    const onMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setMediaFile(file);
            setMediaPreview(URL.createObjectURL(file));
            if (file.type.startsWith('image/')) {
                setMediaType('image');
            } else if (file.type.startsWith('video/')) {
                setMediaType('video');
            } else {
                Notify.failure('Unsupported file type.');
                clearMediaSelection();
            }
        }
    }

    const clearMediaSelection = () => {
        setMediaFile(null)
        setMediaPreview('')
        setMediaType(null)
        if (mediaFileRef.current) {
            mediaFileRef.current.value = ''
        }
    }

    const logedUser = useSelector((state: RootState) => {
        return state.userAuth.user.profilePicture
    })

    const {control, handleSubmit, reset, formState:{errors}} = useForm<PostInput>({defaultValues:{description:''}})

    const [postsLoading, setPostsLoading] = useState(true)

    console.log('loged user', logedUser, typeof logedUser)

    async function uploadPostOnSubmit(data: PostInput){
        reset({
            description:''
        })
        
        const {description} = data
        const formData = new FormData()

        formData.append('description', description)
        if (mediaFile) {
            formData.append('media', mediaFile)
            formData.append('mediaType', mediaType || 'image')
        }

        try {
            setIsUploading(true)
            clearMediaSelection()
            const result: CreatePostResponsePayload = await createPost(formData, (percent: number) => {
                setProgress(percent)
            })

            if(result.success){
                Notify.success(result?.message, {timeout:2000})
                setUserPosts((prev: UserPosts[]) => [result.result, ...(prev || [])])
            }else{
                Notify.failure(result?.message, {timeout:2000})
            }
        } catch (error: unknown) {
            Notify.failure(error instanceof Error ? error.message : 'Something went wrong', {timeout:2000})
        } finally {
            setTimeout(() => {
                setIsUploading(false)
                setProgress(0)
            }, 500)
        }

       // Notify.success('done', {timeout:2000})
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
    

    return (
        <>
        <div className="lg:px-20">
            <div className="border bg-white border-gray-300 rounded-md p-5">
                <form onSubmit={handleSubmit(uploadPostOnSubmit)}>
                <div className="flex gap-4 pb-3">
                    <div className="w-10 h-10 flex justify-center items-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-full">
                        <p className="text-white">{'U'}</p>
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
                        mediaPreview && (
                            <div className="relative mt-4">
                                <button onClick={clearMediaSelection} className="absolute right-2 top-2 z-10 bg-gray-800 bg-opacity-50 rounded-full p-1">
                                    <FaCircleXmark color="white" />
                                </button>
                                {mediaType === 'image' && (
                                    <img src={mediaPreview} alt="Post preview" className="w-full rounded-md" />
                                )}
                                {mediaType === 'video' && (
                                    <video src={mediaPreview} controls className="w-full rounded-md" />
                                )}
                            </div>
                        )
                    }
                <div className="pt-5 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <button type="button" onClick={() => clickedMediaUpload('image')} className=" flex items-center text-gray-700 text-xs gap-3">
                            <CiImageOn size={20} />
                            Image
                        </button>
                        <button type="button" onClick={() => clickedMediaUpload('video')} className=" flex items-center text-gray-700 text-xs gap-3">
                            <CiVideoOn size={20} />
                            Video
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
            {/* Testing linear progress bar */}
            {
                isUploading && (
                    <div className="mt-5">
                        <p className="text-xs mb-1">Uploading...</p>
                        <ProgressBar progress={12} />
                    </div>
                )
            }
            <div className="posts mt-5 grid grid-cols-1 gap-3">
                {
                    userPosts && userPosts?.length > 0 && (
                    userPosts.map((post: UserPosts, index: number) => (
                        <Post key={index} postData={post} loading={false} />
                    )) 
                    )
                }
                
            </div>
            
        </div>
        
        </>
    )
}

export function ProgressBar({progress}: {progress: number}){
    return(
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400 overflow-hidden">
            <div className="bg-blue-600 h-2.5 transition-all duration-300 ease-out" style={{width: `${progress}%`}}></div>
        </div>
    )
}
