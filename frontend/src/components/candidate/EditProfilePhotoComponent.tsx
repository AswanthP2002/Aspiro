
import { useRef, useState } from 'react'
import defaultProfilePicture from '/default-img-instagram.png'
import CropComponent from '../common/CropComponent'
import { removeProfilePicture, updateProfilePicture } from '../../services/userServices'
import { CircularProgress } from '@mui/material'
import Swal from 'sweetalert2'
import { BiMoveHorizontal, BiSave, BiUpload } from 'react-icons/bi'
import { BsTrash2 } from 'react-icons/bs'
import { toast } from 'react-toastify'

interface ProfilePictureUploadResponsePayload {
    success: boolean,
    message: string,
    result: {
        url: string,
        publicId: string
    }
}

interface EditProfileComponentProps {
    profilePicture: {
        cloudinarySecureUrl: string,
        cloudinaryPublicId: string
    },
    onSaveProfilePhoto: (secureUrl: string, publicId: string) => void,
    onDeleteProfilePhoto: () => void
}

export default function EditProfilePictureComponent({ profilePicture, onSaveProfilePhoto, onDeleteProfilePhoto }: EditProfileComponentProps) {
    const fileRef = useRef<HTMLInputElement>(null)
    const [openCrop, setOpenCrop] = useState(false)
    const [zoom, setZoom] = useState(1)
    const [crop, setCrop] = useState({x : 0, y : 0})
    const [image, setImage] = useState("null")
    const [cropPixel, setCropPixel] = useState<{width: number, height: number, x: number, y: number}>({
        width:0,
        height: 0,
        x: 0,
        y: 0
    })
    const [loading, setLoading] = useState(false)

    const openFileUpload = () => {
        if (fileRef.current) {
            fileRef.current.click()
        }
    }

    const cropComplete = (_, cropedPixels: {width: number, height: number, x: number, y: number}) => {
        setCropPixel(cropedPixels)
    }


    const handleSaveImage = async () => {
        setLoading(true)
        const croppedImage = await getCroppedImage(image, cropPixel) as Blob
        const formData = new FormData()
        formData.append('profilePicture', croppedImage)

        const result: ProfilePictureUploadResponsePayload = await updateProfilePicture(formData, profilePicture?.cloudinaryPublicId ? profilePicture?.cloudinaryPublicId : "")
        
        if(result?.success){
            toast.success(result?.message)
            setTimeout(() => {
                setLoading(false)
                onSaveProfilePhoto(result.result.url, result.result.publicId)
            }, 2000)
        }else{
            setLoading(false)
            toast.error(result.message)
        }

    }

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event && event.target.files ? event.target.files[0] : ''
        if(file){
            setImage(URL.createObjectURL(file))
            setOpenCrop(true)
            
        }
    }

    const deleteProfilePicture = async (cloudinaryPublicId : string) => {
        Swal.fire({
            icon:'info',
            title:'Delete profile picture?',
            text:'Are you sure you want to delete your profile picture?',
            showCancelButton:true,
            confirmButtonText:'Yes',
            cancelButtonText:'No',
            allowOutsideClick:false,
            didOpen: () => {
                const container = Swal.getContainer()
                if(container){
                    container.style.zIndex = '999999'
                }
            }
        }).then(async (response) => {
            if(response.isConfirmed){
                setLoading(true)
                const result = await removeProfilePicture(cloudinaryPublicId)

                if(result?.success){
                    toast.success(result?.message)
                    setTimeout(() => {
                        setLoading(false)
                        onDeleteProfilePhoto()
                    }, 3000);
                }else{
                    setLoading(false)
                    toast.error(result?.message)
                }
            }else{
                return
            }
        }) 
    }


    const getCroppedImage = async (imgSrc : string, cropedAreaPixels : {width: number, height: number, x: number, y: number}) => {
        const image = await createImageFromURL(imgSrc) as HTMLImageElement
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
        <div className="relative w-sm md:w-md p-6 md:p-8 bg-gray-50/50">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white/70 backdrop-blur-sm z-50">
            <CircularProgress size={40} thickness={4} className="text-blue-600" />
          </div>
        )}

        {openCrop ? (
          <div className="space-y-6">
            <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-black">
              <CropComponent 
                crop={crop} 
                zoom={zoom} 
                image={image}
                aspectRatio={1} 
                setCrop={setCrop} 
                setZoom={setZoom} 
                cropComplete={cropComplete} 
              />
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-200">
                <BiMoveHorizontal className="text-gray-400" size={18} />
                <input 
                  type="range" 
                  value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))} 
                  min={1} 
                  max={3} 
                  step={0.01} 
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-xs font-bold text-gray-500 w-10">Zoom</span>
              </div>
              
              <div className="flex gap-3">
                 <button 
                  className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
                  onClick={() => setOpenCrop(false)}
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95"
                  onClick={handleSaveImage}
                >
                  <BiSave size={18} />
                  Save Photo
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full flex border-4 border-white shadow-xl overflow-hidden bg-white ring-1 ring-gray-100">
                <img 
                  src={profilePicture?.cloudinarySecureUrl || defaultProfilePicture} 
                  className="w-full h-full object-cover" 
                  alt="Profile" 
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 w-full">
              <input 
                onChange={handleUpload} 
                ref={fileRef} 
                type="file" 
                accept="image/*" 
                className="hidden" 
              />
              
              <button 
                onClick={openFileUpload}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
              >
                <BiUpload size={18} className="text-blue-600" />
                <span className="text-sm">Upload</span>
              </button>

              <button 
                disabled={!profilePicture?.cloudinarySecureUrl}
                onClick={() => deleteProfilePicture(profilePicture?.cloudinaryPublicId)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
              >
                <BsTrash2 size={18} />
                <span className="text-sm">Remove</span>
              </button>
            </div>
            <p className="mt-4 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
              Try to use professional photos
            </p>
          </div>
        )}
      </div>
        </>
    )
}