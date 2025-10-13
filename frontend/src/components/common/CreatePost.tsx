import { useContext, useRef, useState } from "react"
import {IoMdImages} from 'react-icons/io'
import CropComponent from "./CropComponent"
import { createPost } from "../../services/candidateServices"
import { Notify } from "notiflix"
import { appContext } from "../../context/AppContext"

export default function CreatePost(){

    const {closeCreatePostModal} = useContext(appContext)

    const [sectionUpload, setSectionUpload] = useState(1)
    const [imagePreview, setImagePrivew] = useState("")
    const [crop, setCrop] = useState({x : 0, y : 0})
    const [zoom, setZoom] = useState(1)
    const [cropPixels, setCropPixels] = useState(null)
    const [cropedImagePreview, setcroppedImagePrevivew] = useState<any>(null)
    const [content, setContent] = useState("")
    const [blobImage, setBlobImage] = useState("")

    const inputRef = useRef<HTMLInputElement | null>(null)

    const clickUpload = () => {
        if(inputRef?.current){
            inputRef.current.click()
        }
    }

    const handleSelection = (event : any) => {
        if(event.target.files){
            const file = event.target.files[0]
            setImagePrivew(URL.createObjectURL(file))
            setSectionUpload(2)
        }
    }

    const cropComplete = (cropArea : any, cropPixels : any) => {
        setCropPixels(cropPixels)
    }

    const createImageFromUrl = (url : string) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = (err) => reject(err)

            img.crossOrigin = 'anonymous'
            img.src = url
        })
    }

    const getCroppedImage = async (imageSrc : any, cropPixel : any) => {
        const image : any= await createImageFromUrl(imageSrc)
        const canvas = document.createElement('canvas')
        canvas.width = cropPixel.width
        canvas.height = cropPixel.height
        const ctx = canvas.getContext('2d')

        ctx?.drawImage(
            image,
            cropPixel?.x,
            cropPixel?.y,
            cropPixel?.width,
            cropPixel?.height,
            0,
            0,
            cropPixel?.width,
            cropPixel?.height
        )

        return new Promise((resolve) => {
            canvas.toBlob((blob) => resolve(blob), "image/jpeg")
        })
    }

    const cropImage = async () => {
        const imageBlob : any = await getCroppedImage(imagePreview, cropPixels)
        setcroppedImagePrevivew(URL.createObjectURL(imageBlob))
        setBlobImage(imageBlob)
        setSectionUpload(3)
    }

    const create = async (event : any) => {
        event.preventDefault()
        if(!content) return
        const formData = new FormData()
       // console.log('blob before sending', blobImage)
        formData.append('media', blobImage)
        formData.append('content', content)
        formData.append('creatorType', 'candidate')

        const result = await createPost(formData)
        if(result?.success){
            Notify.success('Post created successfully', {timeout:1200})
            setTimeout(() => {
                closeCreatePostModal()
                window.location.reload()

            , 1200})
        }else{
            Notify.failure('Something went wrong', {timeout:1200})
            setTimeout(() => window.location.reload(), 1200)
        }
        
    }

    return(
        <div>
            <div className="header border-b border-gray-300"><h3 className="text-center">Create Post</h3></div>
            <div className="body">
                {
                    sectionUpload === 1 && (
                        <section id="section-upload">
                            <h5 className="text-center text-sm">Upload</h5>
                            <div className="w-[300px] flex flex-col gap-3 items-center !py-5">
                                <IoMdImages size={40} />
                                <input onChange={(event) => handleSelection(event)} type="file" ref={inputRef} className="hidden" />
                                <button onClick={clickUpload} className="bg-blue-500 text-white text-xs w-fit !px-5 !py-1 rounded">Upload from files</button>
                            </div>
                        </section>
                    )
                }
                {/* crop, aspectRatio, zoom, image = cropTestImage, setCrop, setZoom, cropComplete */}
                {
                    sectionUpload === 2 && (
                        <section id="section-crop">
                            <h5 className="text-center">Crop</h5>
                            <div className="relative w-[400px] h-[400px]">
                                <div className="relative w-full h-full">
                                <CropComponent
                                    crop={crop}
                                    aspectRatio={undefined}
                                    zoom={zoom}
                                    image={imagePreview}
                                    setCrop={setCrop}
                                    setZoom={setZoom}
                                    cropComplete={cropComplete}
                                />
                            </div>
                            
                            </div>
                            <div className="w-full flex justify-end mt-2">
                                <button onClick={cropImage} className="text-sm bg-blue-500 text-white rounded !px-3 !py-1">Next</button>
                            </div>
                        </section>
                    )
                }
                {
                    sectionUpload === 3 && (
                        <section id="content-section">
                            <h5 className="text-center text-sm">Crop</h5>
                            <div className="flex items-center gap-5">
                                <img className="w-[200px]" src={cropedImagePreview} alt="" />
                                <div>
                                    <textarea onChange={(event) => setContent(event.target.value)} className="border border-gray-300  rounded w-[400px] h-[200px] outline-none text-sm p-2" placeholder="write something..." name="" id=""></textarea>
                                </div>
                            </div>
                            <div className="w-full flex justify-end p-2">
                                <button onClick={(event) => create(event)} className="text-sm bg-blue-500 text-white !px-4 !py-1 rounded">Post</button>
                            </div>
                        </section>
                    )
                }
            </div>
        </div>
    )
}