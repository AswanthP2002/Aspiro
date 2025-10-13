import { useRef, useState } from 'react'
import { Notify } from 'notiflix'
import defaultCoverPhoto from '/default-cover-photo.jpg'
import { CircularProgress } from '@mui/material'
import CropComponent from '../common/CropComponent'
import { removeCoverphoto, updateCoverPhoto } from '../../services/candidateServices'

export default function EditCoverphotoComponent({coverPhoto = defaultCoverPhoto, onSaveCoverPhoto, onDeleteCoverPhoto} : any) {
    const fileRef = useRef<HTMLInputElement>(null)
    const [openCrop, setOpenCrop] = useState(false)
    const [crop, setCrop] = useState({x : 0, y : 0})
    const [zoom, setZoom] = useState(1)
    const [image, setImage] = useState("")
    const [cropAreaPixels, setCropAreaPixels] = useState("")
    const [loading, setLoding] = useState(false)
    const openUpload = () => {
        if (fileRef.current) {
            fileRef.current.click()
        }
    }

    const handleFileUpload = (event : any) => {
        const file = event.target?.files[0]

        if(file){
            setImage(URL.createObjectURL(file))
            setOpenCrop(true)
        }
    }

    const cropComplete = (cropArea : any, cropPixels : any) => {
        setCropAreaPixels(cropPixels)
    }

    const getCroppedImage = async (imageSrc : any, cropPixel : any) => {
        const image : any = await createImageFromUrl(imageSrc)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext("2d")

        canvas.width = cropPixel?.width
        canvas.height = cropPixel?.height

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

    const createImageFromUrl = (imageSrc : string) => {
        return new Promise((resolve, reject) => {
            const img = new Image()

            img.onload = () => resolve(img)
            img.onerror = (error) => reject(error)
            img.crossOrigin = 'anonymous'
            img.src = imageSrc
        })
    }

    const onSave = async () => {
        setLoding(true)
        const croppedImage : any = await getCroppedImage(image, cropAreaPixels)
        const formData = new FormData()
        formData.append('coverPhoto', croppedImage)
        const result = await updateCoverPhoto(formData, coverPhoto?.cloudinaryPublicId ?? "")
        if(result?.success){
            Notify.success(result?.message, {timeout:2000})
            
            setTimeout(() => {
                setLoding(false)
                onSaveCoverPhoto(URL.createObjectURL(croppedImage))
            }, 2000)
        }else{
            Notify.failure(result?.message, {timeout:2000})
            setLoding(false)
        }
    }

    const deleteCoverphoto = async (publidId : string) => {
        setLoding(true)
        const result = await removeCoverphoto(publidId)

        if(result?.success){
            Notify.success(result?.message, {timeout:2000})
            setTimeout(() => {
                setLoding(false)
                onDeleteCoverPhoto()
            }, 2000);
        }else{
            setLoding(false)
            Notify.failure(result?.message, {timeout:2000})
        }
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
                        <div className="cropComponent-wrapper w-[700px] h-[250px]">
                            <CropComponent 
                                crop={crop}
                                zoom={zoom}
                                aspectRatio={4 / 1}
                                image={image}
                                setCrop={setCrop}
                                setZoom={setZoom}
                                cropComplete={cropComplete}
                            />
                        </div>
                        <div className="crop-actions flex gap-10 mt-5">
                            <div className="flex items-center gap-3">
                                <input value={zoom} onChange={(event) => setZoom(parseFloat(event.target.value))} type="range" min={1} max={3} step={0.01} />
                                <label htmlFor="" className="block text-sm">Zoom</label>
                            </div>
                            <div>
                                <button onClick={onSave} className='button bg-blue-500 rounded px-2 py-1 text-white text-sm'>Save</button>
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
                            <h4 className="text-center font-semibold">Cover photo</h4>
                        </div>
                        <div className="coverphoto mt-5 mb-5 relative">
                            <img src={coverPhoto?.cloudinarySecureUrl ? coverPhoto?.cloudinarySecureUrl : defaultCoverPhoto} className='w-[600px] h-[150px]' alt="" style={{ objectFit: 'cover' }} />
                        </div>
                        <div className="actions flex justify-center gap-10">
                            <input onChange={(event) => handleFileUpload(event)} ref={fileRef} type="file" accept='image/*' name="" className='hidden' id="" />
                            <button>
                                <i className="fa-solid fa-upload"></i>
                                <span className='text-xs font-semibold ms-2' onClick={openUpload}>Upload photo</span>
                            </button>
                            <button disabled={coverPhoto?.cloudinarySecureUrl ? false : true} onClick={() => deleteCoverphoto(coverPhoto?.cloudinaryPublicId)}>
                                <i className="fa-solid fa-trash"></i>
                                <span className='text-xs font-semibold ms-2'>Remove photo</span>
                            </button>
                        </div>
                    </div>
            }

        </>
    )
}