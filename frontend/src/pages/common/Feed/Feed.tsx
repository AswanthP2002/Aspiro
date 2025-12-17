import { useContext, useEffect, useRef, useState } from "react"
// import coursera from '/courseera.png'
// import wearehiring from '/wearehiring.png'
// import dummyUserImage from '/recejames.jpg'
// import dummyCompany from '/company.jpg'
import { createPost, getPosts } from "../../../services/userServices";
import { useSelector } from "react-redux";
// import GeneralModal from "../../../components/common/Modal";
// import CreatePost from "../../../components/common/CreatePost";
import { appContext } from "../../../context/AppContext";
import { UserPosts } from "../../../types/entityTypes"
import { Notify } from "notiflix"
import { CiImageOn } from "react-icons/ci"
// import { FaShareNodes } from "react-icons/fa6"
// import dummyPostImage from '/hektor.jpg'
// import leschulerImage from '/schuller.jpg'
// import claraImage from '/klara.jpg'
// import lucasImage from '/lucas.jpg'
import { Controller, useForm } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";
import { FaCircleXmark } from "react-icons/fa6";
import { PostContext } from "../../../context/PostContext";
import Post from "../../../components/common/Post";
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
    
    const {
        userPosts, 
        setUserPosts
    } = useContext(PostContext)

    interface PostInput {
        description: string
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


    const [postsLoading, setPostsLoading] = useState(true)
    //const [userPosts, setUserPosts] = useState<UserPosts[]>([])
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
                        <Post key={index} postData={post} loading={false} />
                    )) 
                    )
                }
                
            </div>
            
        </div>
        
        </>
    )
}