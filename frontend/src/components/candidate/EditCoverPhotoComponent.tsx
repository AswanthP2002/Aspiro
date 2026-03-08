import React, { useRef, useState } from 'react'
import defaultCoverPhoto from '/default-cover-photo.jpg'
import { CircularProgress } from '@mui/material'
import CropComponent from '../common/CropComponent'
import { removeCoverphoto, updateCoverPhoto } from '../../services/userServices'
import Swal from 'sweetalert2'
import { BsTrash2 } from 'react-icons/bs'
import { BiMoveHorizontal, BiSave, BiUpload } from 'react-icons/bi'
import { toast } from 'react-toastify'

interface CoverPhotoUploadResponsePayload {
    success: boolean,
    message: string,
    result: {
        url: string,
        publicId: string
    }
}

interface EditCoverPhotoComponentProps {
    coverPhoto: {
        cloudinarySecureUrl: string,
        cloudinaryPublicId: string
    },
    onSaveCoverPhoto: (secureUrl: string, publicId: string) => void,
    onDeleteCoverPhoto: () => void
}

export default function EditCoverphotoComponent({coverPhoto, onSaveCoverPhoto, onDeleteCoverPhoto} : EditCoverPhotoComponentProps) {
    const fileRef = useRef<HTMLInputElement>(null)
    const [openCrop, setOpenCrop] = useState(false)
    const [crop, setCrop] = useState({x : 0, y : 0})
    const [zoom, setZoom] = useState(1)
    const [image, setImage] = useState("")
    const [cropAreaPixels, setCropAreaPixels] = useState<{height: number, width: number, x: number, y: number}>({
        height: 0,
        width: 0,
        x: 0,
        y: 0
    })
    const [loading, setLoding] = useState(false)
    const openUpload = () => {
        if (fileRef.current) {
            fileRef.current.click()
        }
    }

    const handleFileUpload = (event : React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target && event.target.files ? event.target.files[0] : ''

        if(file){
            setImage(URL.createObjectURL(file))
            setOpenCrop(true)
        }
    }

    const cropComplete = (_: unknown, cropPixels : {height: number, width: number, x: number, y: number}) => {
        setCropAreaPixels(cropPixels)
    }

    const getCroppedImage = async (imageSrc : string, cropPixel : {width: number, height: number, x: number, y: number}) => {
        const image = await createImageFromUrl(imageSrc) as HTMLImageElement
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
        const croppedImage = await getCroppedImage(image, cropAreaPixels) as Blob
        const formData = new FormData()
        formData.append('coverPhoto', croppedImage)
        const result: CoverPhotoUploadResponsePayload = await updateCoverPhoto(formData, coverPhoto?.cloudinaryPublicId ?? "")
        if(result?.success){
            toast.success(result?.message)
            
            setTimeout(() => {
                setLoding(false)
                onSaveCoverPhoto(result.result.url, result.result.publicId)
            }, 2000)
        }else{
            toast.error(result?.message)
            setLoding(false)
        }
    }

    const deleteCoverphoto = async (publidId : string) => {
        Swal.fire({
            icon:'info',
            title:'Delete cover photo?',
            text:'Are you sure you want to delete your cover photo?',
            showCancelButton:true,
            confirmButtonText:'Yes',
            cancelButtonText:'No',
            allowOutsideClick:false,
            didOpen: () => {
                const container = Swal.getContainer()
                if(container){
                    container.style.zIndex = "99999"
                }
            }
        }).then(async (response) => {
            if(response.isConfirmed){
                setLoding(true)
                const result = await removeCoverphoto(publidId)

                if(result?.success){
                    toast.success(result?.success)
                    setTimeout(() => {
                        setLoding(false)
                        onDeleteCoverPhoto()
                    }, 2000);
                }else{
                    setLoding(false)
                    toast.success(result.message)
                }
            }else{
                return
            }
        })
        
    }

    return (
        <>
        <div className="relative w-md md:w-lg lg:w-2xl p-6 bg-gray-50/50">
        {/* Professional Loading State */}
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white/70 backdrop-blur-sm z-50">
            <CircularProgress size={40} thickness={4} className="text-blue-600" />
          </div>
        )}

        {openCrop ? (
          /* CROP MODE UI */
          <div className="space-y-6">
            <div className="w-full aspect-[4/1] rounded-xl overflow-hidden border-2 border-white shadow-lg bg-black relative">
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
            
            <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex flex-1 items-center gap-4 w-full">
                <BiMoveHorizontal className="text-gray-400" size={18} />
                <input 
                  value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))} 
                  type="range" 
                  min={1} 
                  max={3} 
                  step={0.01} 
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-xs font-bold text-gray-500 min-w-[40px]">Zoom</span>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setOpenCrop(false)}
                  className="flex-1 md:px-6 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={onSave} 
                  className="flex-1 md:px-8 py-2 flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95"
                >
                  <BiSave size={16} />
                  Save Cover
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* VIEW MODE UI */
          <div className="flex flex-col items-center">
            <div className="w-full aspect-[4/1] rounded-2xl overflow-hidden border-4 border-white shadow-md bg-white ring-1 ring-gray-100">
              <img 
                src={coverPhoto?.cloudinarySecureUrl || defaultCoverPhoto} 
                className="w-full h-full object-cover" 
                alt="Cover" 
              />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm">
              <input 
                onChange={handleFileUpload} 
                ref={fileRef} 
                type="file" 
                accept="image/*" 
                className="hidden" 
              />
              
              <button 
                onClick={openUpload}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
              >
                <BiUpload size={18} className="text-blue-600" />
                <span className="text-sm">Upload</span>
              </button>

              <button 
                disabled={!coverPhoto?.cloudinarySecureUrl}
                onClick={() => deleteCoverphoto(coverPhoto?.cloudinaryPublicId)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
              >
                <BsTrash2 size={18} />
                <span className="text-sm">Remove</span>
              </button>
            </div>
          </div>
        )}
      </div>
            {/* {
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
            } */}
        </>
    )
}