import { useContext, useEffect, useRef, useState } from "react"
import atlas from '/3atlas.png'
import dummyUserImage from '/recejames.jpg'
import dummyCompany from '/company.jpg'
import Swal from "sweetalert2";
import { createPost, getPosts, likePost, unlikePost } from "../../../services/userServices";
import { Notify } from "notiflix";
import { useSelector } from "react-redux";
import GeneralModal from "../../../components/common/Modal";
import CreatePost from "../../../components/common/CreatePost";
import Post from "../../../components/common/Post";
import { appContext } from "../../../context/AppContext";

export default function Feed() {

    const {createPostModalOpen, closeCreatePostModal} = useContext(appContext)

    // const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const [postImage, setPostImage] = useState<any>(null)
    const [image, setImage] = useState<string | null>("")
    const fileref = useRef<HTMLInputElement | null>(null)
    const [likedPosts, setLikedPosts] = useState<any[]>([])

    const logedUser = useSelector((state : any) => {
        return state.userAuth.user
    })

    const [modalOpen, setModalOpen] = useState(true)
    const closeModal = () => setModalOpen(false)

    console.log('loged user', logedUser, typeof logedUser)
    //const parsed = JSON.parse(logedUser)
    //console.log('loged user paresed', parsed, typeof parsed)

    const selectFile = () => {
        fileref.current?.click()
    }
    // function handleImageSelect(event : React.ChangeEvent<HTMLInputElement>){
    //     if(event.target.files){
    //         const file = event.target.files[0]
    //         setImage(URL.createObjectURL(file))
    //         setPostImage(file)
    //     }
    // }

    // const unselectImage = () => {
    //     setImage(null)
    //     setPostImage(null)
    // }

    // const handleCreatePost = async () => {
    //     if(!postImage || !content){
    //         Swal.fire({
    //             icon:'warning',
    //             title:'Add Details',
    //             showCancelButton:false
    //         })
    //         return
    //     }

    //     const formData = new FormData()

    //     formData.append('media', postImage)
    //     formData.append('content', content)
    //     formData.append('type', "candidate")

    //     const result = await createPost(formData)
    //     if(result.success){
    //         Swal.fire({
    //             icon:"success",
    //             title:"Created",
    //             showConfirmButton:false,
    //             showCancelButton:false,
    //             timer:1500
    //         }).then(() => window.location.reload())
    //     }

    // };

    // const postLiking = async (postId : string, creatorId : string) => {        
    //     const result = await likePost(postId, creatorId)
    //     if(result?.success){
    //         setLikedPosts(prv => [...prv, postId])
    //     }else{
    //         Notify.failure('Something went wrong', {timeout:1200})
    //     }
    // }

    // const postUnliking = async (postId : string) => {
    //     const result = await unlikePost(postId)
    //     if(result.success){
    //         setLikedPosts(prv => prv.filter((id : string) => id !== postId))
    //     }else{
    //         Notify.failure('Something went wrong', {timeout:1200})
    //     }
    // }

    const [posts, setPosts] = useState<any[]>([
        {
            _id: "string",
            creatorId: `#kdjfkd`,
            creatorType: "candidate",
            media: {
                url: atlas,
                publidId: "string"
            },
            content: "31 atlas is coming",
            likes: [2, 3, 3, 4, 5],
            createdAt: `${new Date()}`,
            updatedAt: `${new Date()}`
        }
    ])

    useEffect(() => {
        (async function(){
            const result = await getPosts()
            console.log('pposts from backend', result)
            if(result.success){
                setPosts(result.result)
            }
        })()
    }, [])
    return (
        <>
        <div className="flex">
            <div className="flex-1 border-r border-gray-200 p-5">
            {
                posts.map((post : any, index : number) => {
                    return(
                        <Post key={index} post={post} />
                    )
                })
            }
            </div>
            <div className="p-5 w-100 h-screen overflow-hidden sticky top-0">
                <div className="border-b border-gray-200 pb-3">
                    <p>Peoples you might know</p>
                    <div className="mt-3">
                        {
                            Array.from(new Array(4).fill(
                                {name:"Person name", role:"Designation",image:dummyUserImage}
                            )).map((person : any, index : number) => {
                                return <div key={index} className="flex gap-2 mb-3">
                                    <img className="w-10 h-10 rounded-full" style={{objectFit:'cover'}} src={person.image} alt="" />
                                    <div>
                                        <p className="font-semibold text-sm">{person.name}</p>
                                        <p className="text-xs">{person.role}</p>
                                    </div>
                                </div>
                            })
                        }
                        <button className="bg-blue-500 text-white text-sm !py-1 w-full rounded" type="button">Find more people</button>
                    </div>
                </div>

                <div className="border-b border-gray-200 pb-3 mt-5">
                    <p>Some opportunties that suits you</p>
                    <div className="mt-3">
                        {
                            Array.from(new Array(4).fill(
                                {name:"Job Title", company:"Company Name",image:dummyCompany}
                            )).map((person : any, index : number) => {
                                return <div key={index} className="flex gap-2 mb-3">
                                    <img className="w-10 h-10 rounded-full" style={{objectFit:'cover'}} src={person.image} alt="" />
                                    <div>
                                        <p className="font-semibold text-sm">{person.name}</p>
                                        <p className="text-xs">{person.company}</p>
                                    </div>
                                </div>
                            })
                        }
                        <button className="bg-blue-500 text-white text-sm w-full !py-1 rounded" type="button">Browse More</button>
                    </div>
                </div>
            </div>
        </div>
        <GeneralModal
            openModal={createPostModalOpen}
            closeModal={closeCreatePostModal}
            size="large"
            children={<CreatePost />}
        />
        </>
        // <div className="max-w-xl mx-auto mt-6 space-y-6 overflow-y-scroll">
        //     {/* Create Post Box */}
        //     <div className="p-4 bg-white shadow rounded-2xl border border-gray-200">
        //         <textarea
        //             className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        //             rows={3}
        //             placeholder="What's on your mind?"
        //             value={content}
        //             onChange={(e) => setContent(e.target.value)}
        //         />
        //         <input onChange={(event) => handleImageSelect(event)} ref={fileref} type="file" className="hidden" />
        //         <button onClick={selectFile}><i className="fa-solid fa-image"></i></button>
        //         {
        //             image && (
        //                 <div className="relative">
        //                     <i onClick={unselectImage} className="absolute right-0 fa-solid fa-circle-xmark"></i>
        //                     <img src={image} style={{width:'500px'}} alt="" />
        //                 </div>
        //             )
        //         }
        //         <div className="flex justify-end mt-2">
        //             <button
        //                 onClick={handleCreatePost}
        //                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        //             >
        //                 Post
        //             </button>
        //         </div>
        //     </div>

        //     {/* Feed */}
        //     {posts.map((post) => (
        //         <div className="bg-white border rounded-xl shadow-sm">
        //             {/* Header */}
        //             <div className="flex items-center justify-between px-4 py-2">
        //                 <div className="flex items-center space-x-2">
        //                     <img src={defaultPicture} style={{objectFit:'cover'}} className="w-8 h-8 bg-gray-300 rounded-full" /> {/* profile pic placeholder */}
        //                     <span className="font-semibold text-sm">
        //                         {post.creatorDetails?.name}
        //                     </span>
        //                 </div>
        //                 <button className="text-blue-500 text-sm font-medium">Follow</button>
        //             </div>

        //             {/* Main Content */}
        //             {post.mediaUrl ? (
        //                 <img src={post.media.url} alt="Post" className="w-full object-cover" />
        //             ) : (
        //                 <div className="px-4 py-6">
        //                     <img style={{width:'600px'}} src={post.media.url} alt="" />
        //                 </div>
        //             )}

        //             {/* Footer */}
        //             <div className="px-4 py-2 space-y-1">
        //                 <button className="text-sm text-gray-700 font-medium">
        //                     <i className="fa-solid fa-heart !text-red-500"></i> {post.likes.length} likes
        //                 </button>
        //                 <p className="font-semibold text-sm">
        //                     <span className="font-bold">{post.authorId}</span>
        //                     {post.content}
        //                 </p>
        //                 <p className="text-xs text-end text-gray-400">
        //                     {new Date(post.createdAt).toLocaleString()}
        //                 </p>
        //             </div>
        //         </div>
        //     ))}
        // </div>
    )
}