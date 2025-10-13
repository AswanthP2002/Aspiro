
import { useRef, useState } from 'react'
import {Notify} from 'notiflix'
import defaultProfilePicture from '/default-img-instagram.png'
import CropComponent from '../common/CropComponent'
import { removeProfilePicture, updateProfilePicture } from '../../services/candidateServices'
import { CircularProgress } from '@mui/material'

export default function EditProfilePictureComponent({ profilePicture, onSaveProfilePhoto, onDeleteProfilePhoto }: any) {
    const fileRef = useRef<HTMLInputElement>(null)
    const [uploadedFile, setUploadedFile] = useState("")
    const [openCrop, setOpenCrop] = useState(false)
    const [zoom, setZoom] = useState(1)
    const [crop, setCrop] = useState({x : 0, y : 0})
    const [image, setImage] = useState("null")
    const [cropPixel, setCropPixel] = useState(null)
    const [loading, setLoading] = useState(false)

    const openFileUpload = () => {
        if (fileRef.current) {
            fileRef.current.click()
        }
    }

    const cropComplete = (cropArea : any, cropedPixels : any) => {
        setCropPixel(cropedPixels)
    }


    const handleSaveImage = async () => {
        setLoading(true)
        const croppedImage : any = await getCroppedImage(image, cropPixel)
        const formData = new FormData()
        formData.append('profilePicture', croppedImage)

        //delete existing image from cloudinary 

        const result = await updateProfilePicture(formData, profilePicture?.cloudinaryPublicId ? profilePicture?.cloudinaryPublicId : "")
        
        if(result?.success){
            Notify.success(result?.message,{timeout:2000})
            setTimeout(() => {
                setLoading(false)
                onSaveProfilePhoto(URL.createObjectURL(croppedImage))
            }, 2000)
        }else{
            setLoading(false)
            Notify.failure(result?.message)
        }

    }

    const handleUpload = (event: any) => {
        const file = event.target.files[0]
        if(file){
            setImage(URL.createObjectURL(file))
            setUploadedFile(file)
            setOpenCrop(true)
            
        }
    }

    const deleteProfilePicture = async (cloudinaryPublicId : string) => {
        setLoading(true)
        const result = await removeProfilePicture(cloudinaryPublicId)

        if(result?.success){
            Notify.success(result?.message, {timeout:2000})
            setTimeout(() => {
                setLoading(false)
                onDeleteProfilePhoto()
            }, 2000);
        }else{
            setLoading(false)
            Notify.failure(result?.message, {timeout:2000})
        }
    }


    const getCroppedImage = async (imgSrc : any, cropedAreaPixels : any) => {
        const image : any = await createImageFromURL(imgSrc)
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        canvas.width = cropedAreaPixels?.width
        canvas.height = cropedAreaPixels?.height

        ctx?.drawImage(
            image, 
            cropedAreaPixels?.x, 
            cropedAreaPixels?.y, 
            cropedAreaPixels?.width, 
            cropedAreaPixels?.height,
            0,
            0,
            cropedAreaPixels?.width,
            cropedAreaPixels?.height
        )

        return new Promise((resolve) => {
            canvas.toBlob((blob) => resolve(blob), "image/jpeg")
        })
    }

    const createImageFromURL = (url : string) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = (e) => reject(e)
            img.crossOrigin = 'anonymous'
            img.src = url
        })
    }

    return (
        <>
            {
                openCrop
                ? <div className='relative'>
                        {
                            loading && (
                                <div className="absolute inset-0 flex justify-center items-center bg-black/50 z-50">
                                    <CircularProgress />
                                </div>
                            )
                        }
                  <div className='w-[400px] h-[400px]'>
                  <CropComponent 
                    crop={crop} 
                    zoom={zoom} 
                    image={image}
                    aspectRatio={4 / 3}
                    setCrop={setCrop} 
                    setZoom={setZoom} 
                    cropComplete={cropComplete} 
                  />
                  </div>
                  <div className='flex gap-10 mt-2'>
                    <div className='flex items-center'>
                        <input type="range" value={zoom} onChange={(event) => setZoom(parseFloat(event.target.value))} min={1} max={3} step={0.01} />
                        <label htmlFor="" className='ms-2 block'>Zoom</label>
                    </div>
                    <div>
                        <button className='text-xs bg-blue-500 text-white px-2 py-1 rounded' onClick={handleSaveImage}>Save</button>
                    </div>
                  </div>
                  </div>
                : <div>
                        {
                            loading && (
                                <div className="absolute inset-0 flex justify-center items-center bg-black/50 z-50">
                                    <CircularProgress />
                                </div>
                            )
                        }
                        <div className="header">
                            <h4 className='font-semibold text-center'>Profile Picture</h4>
                        </div>
                        <div className="profile-picture mt-5 w-full flex justify-center">
                            <img src={profilePicture?.cloudinarySecureUrl ? profilePicture?.cloudinarySecureUrl : defaultProfilePicture} className='w-[120px] h-[120px] rounded-full' alt="" style={{objectFit:'cover'}} />
                        </div>
                        <div className="actions flex justify-center gap-10">
                            <input onChange={handleUpload} ref={fileRef} type="file" accept='image/*' name="" className='hidden' id="" />
                            <button onClick={openFileUpload}>
                                <i className="fa-solid fa-upload"></i>
                                <span className='text-xs font-semibold ms-2'>Upload photo</span>
                            </button>
                            <button disabled={profilePicture?.cloudinarySecureUrl ? false : true} onClick={() => deleteProfilePicture(profilePicture?.cloudinaryPublicId)}>
                                <i className="fa-solid fa-trash"></i>
                                <span className='text-xs font-semibold ms-2'>Remove photo</span>
                            </button>
                        </div>
                    </div>
            }

        </>
    )
}