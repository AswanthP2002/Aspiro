import { useContext, useEffect, useRef, useState } from "react"
import atlas from '/3atlas.png'
import coursera from '/courseera.png'
import wearehiring from '/wearehiring.png'
import dummyUserImage from '/recejames.jpg'
import dummyCompany from '/company.jpg'
import { getPosts } from "../../../services/userServices";
import { useSelector } from "react-redux";
import GeneralModal from "../../../components/common/Modal";
import CreatePost from "../../../components/common/CreatePost";
import Post from "../../../components/common/Post";
import { appContext } from "../../../context/AppContext";
import { UserPosts } from "../../../types/entityTypes"
import { Notify } from "notiflix"
import { CiHeart, CiImageOn } from "react-icons/ci"
import { BsThreeDotsVertical } from "react-icons/bs"
import { IoChatbubbleOutline } from "react-icons/io5"
import { FaShareNodes } from "react-icons/fa6"
import { PiShareNetworkDuotone } from "react-icons/pi"
import dummyPostImage from '/hektor.jpg'
import leschulerImage from '/schuller.jpg'
import claraImage from '/klara.jpg'
import lucasImage from '/lucas.jpg'
import { MdDescription } from "react-icons/md"

const dummyPostsData = [
    {
        id:1,
        name:'Aswanth P',
        headline: 'Full stack Developer',
        time:'2 days ago',
        image:null,
        description:'Challenges of combining social media world + a job networking world',
        likes:25,
        comments:4,
        shares:2
    },
    {
        id:2,
        name:'Hector Fort',
        headline: 'UI/UX Designer',
        time:'2 hours ago',
        image:dummyPostImage,
        description:'Designing clothes are different vibe',
        likes:6,
        comments:0,
        shares:1
    },
    {
        id:3,
        name:'Le Schuler',
        headline: 'Project Manager',
        time:'12 days ago',
        image:leschulerImage,
        description:'Germany! 👀🌼',
        likes:235,
        comments:84,
        shares:55
    },
    {
        id:4,
        name:'Clara Eric',
        headline: 'Hiring Manager at Hydra',
        time:'5 days ago',
        image:claraImage,
        description:'Finally i also mad it! 👀🌼',
        likes:98,
        comments:15,
        shares:4
    },
    {
        id:5,
        name:'Lucas Bergvel',
        headline: 'Hiring Manager at Hydra',
        time:'20 minutes ago',
        image:lucasImage,
        description:'New chapter, new page. With spurs👀',
        likes:5,
        comments:4,
        shares:0
    },
    
]

export default function Feed() {

    const {createPostModalOpen, closeCreatePostModal} = useContext(appContext)

    console.log('create modal status opne', createPostModalOpen)

    const [postsLoading, setPostsLoading] = useState(true)
    const [userPosts, setUserPosts] = useState<UserPosts[] | null>()
    //const [content, setContent] = useState("");
    //const [postImage, setPostImage] = useState<any>(null)
    //const [image, setImage] = useState<string | null>("")
    const fileref = useRef<HTMLInputElement | null>(null)
    //const [likedPosts, setLikedPosts] = useState<any[]>([])

    const logedUser = useSelector((state : any) => {
        return state.userAuth.user
    })

    const [modalOpen, setModalOpen] = useState(true)
    const closeModal = () => setModalOpen(false)

    console.log('loged user', logedUser, typeof logedUser)

    const selectFile = () => {
        fileref.current?.click()
    }
    
    const [posts, setPosts] = useState<any[]>([
        {
            _id: "string",
            creatorId: `#kdjfkd`,
            media: {
                cloudUrl: coursera,
                publicId: "string"
            },
            userDetails:{
                name:'Coursera',
                headline:'Education'
            },
            description: `Coursera ~ Junior software developer professional certificate. Pursue a new career as a junior software developer - no experience reuired`,
            likes: [2, 3, 3, 4, 5],
            createdAt: `${new Date()}`,
            updatedAt: `${new Date()}`
        },
        {
            _id: "string",
            creatorId: `#kdjfkd`,
            media: {
                cloudUrl: wearehiring,
                publicId: "string"
            },
            userDetails:{
                name:'Aspiro',
                headline:'Software Engineering'
            },
            description: `Aspiro - we are hiring!. Web developer location: remote, experience 0 to 2 years up, salary 13 to 28k month up. Freshers are most welcome`,
            likes: [2, 3, 3, 4, 5],
            createdAt: `${new Date()}`,
            updatedAt: `${new Date()}`
        }
    ])

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
        })

        setPostsLoading(false)
    }, [])
    return (
        <>
        <div className="">
            <div className="border bg-white border-gray-300 rounded-md p-5">
                <div className="flex gap-4 pb-3">
                    <div className="w-10 h-10 flex justify-center items-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-full">
                        <p className="text-white">Y</p>
                    </div>
                    <textarea className="border-2 outline-none bg-gray-200 border-gray-300 rounded-md p-2 text-sm flex-1" name="" rows={3} placeholder="Whats on your mind?" id=""></textarea>
                </div>
                <div className="border-t border-gray-300 pt-5 flex items-center justify-between">
                    <div>
                        <button className=" flex items-center text-gray-700 text-xs gap-3">
                            <CiImageOn size={20} />
                            Image
                        </button>
                    </div>
                    <button className="text-sm bg-blue-500 rounded-md text-white !px-3 py-1">
                        Post
                    </button>
                </div>
            </div>

            <div className="posts mt-5 grid grid-cols-1 gap-3">

                {/* post with images testing */}
                {
                    dummyPostsData.map((post: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-md bg-white">
                            <div className="p-3">
                                <div className="flex gap-3">
                                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
                                        <p>{post.name[0]}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-light text-sm">{post.name}</p>
                                        <p className="text-sm text-gray-700 font-light">{post.headline}</p>
                                        <p className="text-xs text-gray-500 mt-1">{post.time}</p>
                                    </div>
                                    <div>
                                        <button><BsThreeDotsVertical /></button>
                                    </div>
                                </div>
                            </div>
                            {
                                post?.image && (
                                    <div>
                                        <img className="w-full h-auto" src={post.image} alt="" />
                                    </div>
                                )
                            }
                            <div className="p-3">
                                <p className="text-sm font-light text-gray-700">{post.description}</p>
                                <button className="text-xs text-blue-500">Read more</button>
                            </div>
                            <div className="border t border-gray-200 text-xs text-gray-500 flex gap-2 p-3">
                                <div className="flex-1">
                                    <p>{post.likes} likes</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p>{post.comments} comments</p>
                                    <p>{post.shares} share</p>
                                </div>
                            </div>
                            <div className="border-t flex border-gray-200">
                                <button className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center">
                                    <CiHeart size={20} color="gray" />
                                    <p className="text-xs text-gray-500">Like</p>
                                </button>
                                <button className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center">
                                    <IoChatbubbleOutline color="gray" />
                                    <p className="text-xs text-gray-500">Comment</p>
                                </button>
                                <button className="w-1/3 hover:bg-gray-200 p-3 flex items-center gap-3 justify-center">
                                    <PiShareNetworkDuotone color="gray" />
                                    <p className="text-xs text-gray-500">Share</p>
                                </button>
                            </div>
                        </div>
                    )) 
                }
            </div>

        </div>
        {/* <div className="flex"> */}
            {/* <div className="flex-1 p-5"> */}
            {/* {
                posts.map((post : any, index : number) => {
                    return(
                        <Post key={index} loading={postsLoading} post={post} />
                    )
                })
            } */}
            {/* {
                userPosts && userPosts?.length > 0
                    ? userPosts.map((userPost: UserPosts, index: number) => {
                        return <Post key={index} loading={postsLoading} postData={userPost}/>
                    })
                    : <p className="text-center text-sm text-gray-500">No posts found</p>
            } */}
            {/* </div> */}
            {/* <div className="p-5 w-100 h-screen overflow-hidden sticky top-0">
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
            </div> */}
        {/* </div> */}
        {
            createPostModalOpen && (
                <GeneralModal
            openModal={createPostModalOpen}
            closeModal={closeCreatePostModal}
            size="large"
            children={<CreatePost />}
            />
            )
        }
        </>
    )
}