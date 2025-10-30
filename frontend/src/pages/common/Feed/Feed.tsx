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
        })()

        setPostsLoading(false)
    }, [])
    return (
        <>
        <div className="flex">
            <div className="flex-1 p-5">
            {/* {
                posts.map((post : any, index : number) => {
                    return(
                        <Post key={index} loading={postsLoading} post={post} />
                    )
                })
            } */}
            {
                userPosts && userPosts?.length > 0
                    ? userPosts.map((userPost: UserPosts, index: number) => {
                        return <Post key={index} loading={postsLoading} postData={userPost}/>
                    })
                    : <p className="text-center text-sm text-gray-500">No posts found</p>
            }
            </div>
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
        </div>
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