import { useEffect, useRef, useState } from "react"
import atlas from '/3atlas.png'
import Swal from "sweetalert2";
import { createPost, getPosts } from "../../../services/candidateServices";
import defaultPicture from '/default-img-instagram.png'

export default function Feed() {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const [postImage, setPostImage] = useState<any>(null)
    const [image, setImage] = useState<string | null>("")
    const fileref = useRef<HTMLInputElement | null>(null)
    const selectFile = () => {
        fileref.current?.click()
    }
    function handleImageSelect(event : React.ChangeEvent<HTMLInputElement>){
        if(event.target.files){
            const file = event.target.files[0]
            setImage(URL.createObjectURL(file))
            setPostImage(file)
        }
    }

    const unselectImage = () => {
        setImage(null)
        setPostImage(null)
    }

    const handleCreatePost = async () => {
        if(!postImage || !content){
            Swal.fire({
                icon:'warning',
                title:'Add Details',
                showCancelButton:false
            })
            return
        }

        const formData = new FormData()

        formData.append('media', postImage)
        formData.append('content', content)
        formData.append('type', "candidate")

        const result = await createPost(formData)
        if(result.success){
            Swal.fire({
                icon:"success",
                title:"Created",
                showConfirmButton:false,
                showCancelButton:false,
                timer:1500
            }).then(() => window.location.reload())
        }

    };
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
        <div className="max-w-xl mx-auto mt-6 space-y-6">
            {/* Create Post Box */}
            <div className="p-4 bg-white shadow rounded-2xl border border-gray-200">
                <textarea
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={3}
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input onChange={(event) => handleImageSelect(event)} ref={fileref} type="file" className="hidden" />
                <button onClick={selectFile}><i className="fa-solid fa-image"></i></button>
                {
                    image && (
                        <div className="relative">
                            <i onClick={unselectImage} className="absolute right-0 fa-solid fa-circle-xmark"></i>
                            <img src={image} style={{width:'500px'}} alt="" />
                        </div>
                    )
                }
                <div className="flex justify-end mt-2">
                    <button
                        onClick={handleCreatePost}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Post
                    </button>
                </div>
            </div>

            {/* Feed */}
            {posts.map((post) => (
                <div className="bg-white border rounded-xl shadow-sm">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2">
                        <div className="flex items-center space-x-2">
                            <img src={defaultPicture} style={{objectFit:'cover'}} className="w-8 h-8 bg-gray-300 rounded-full" /> {/* profile pic placeholder */}
                            <span className="font-semibold text-sm">
                                {post.creatorDetails?.name}
                            </span>
                        </div>
                        <button className="text-blue-500 text-sm font-medium">Follow</button>
                    </div>

                    {/* Main Content */}
                    {post.mediaUrl ? (
                        <img src={post.media.url} alt="Post" className="w-full object-cover" />
                    ) : (
                        <div className="px-4 py-6">
                            <img style={{width:'600px'}} src={post.media.url} alt="" />
                        </div>
                    )}

                    {/* Footer */}
                    <div className="px-4 py-2 space-y-1">
                        <button className="text-sm text-gray-700 font-medium">
                            <i className="fa-solid fa-heart !text-red-500"></i> {post.likes.length} likes
                        </button>
                        <p className="font-semibold text-sm">
                            <span className="font-bold">{post.authorId}</span>
                            {post.content}
                        </p>
                        <p className="text-xs text-end text-gray-400">
                            {new Date(post.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}