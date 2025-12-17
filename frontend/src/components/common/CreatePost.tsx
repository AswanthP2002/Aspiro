import { useContext, useRef, useState } from "react"
import {IoMdImages} from 'react-icons/io'
import CropComponent from "./CropComponent"
import { createPost } from "../../services/userServices"
import { Notify } from "notiflix"
import { appContext } from "../../context/AppContext"
import { Controller, useForm } from "react-hook-form"
import { FormControl, FormHelperText } from "@mui/material"
import { Textarea } from "@mui/joy"

export default function CreatePost(){
    
    type FormInput = {
        description: string
    }

    const {control, formState:{errors}, watch, handleSubmit} = useForm<FormInput>({
        defaultValues:{description:''}
    })

    const {closeCreatePostModal} = useContext(appContext)

    const [sectionUpload, setSectionUpload] = useState(1)
    const [imagePreview, setImagePrivew] = useState("")
    const [crop, setCrop] = useState({x : 0, y : 0})
    const [zoom, setZoom] = useState(1)
    const [cropPixels, setCropPixels] = useState(null)
    const [cropedImagePreview, setcroppedImagePrevivew] = useState<any>(null)
    const [description, setDescription] = useState("")
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
            //set blob image for non crping image for testing non crop image availability
            setBlobImage(file)
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

    const create = async (data : FormInput) => {
        const formData = new FormData()
        const {description} = data

       // console.log('blob before sending', blobImage)
        formData.append('media', blobImage)
        formData.append('description', description)

        console.log('Testing formdata before sending to the service', formData)

        try {
            alert('going to call the service')
            const result = await createPost(formData)
            if(result?.success){
                Notify.success('Post created successfully', {timeout:1200})
                setTimeout(() => {
                    closeCreatePostModal()
                    window.location.reload()
    
                , 1200})
            }else{
                Notify.failure(result?.message)
                //setTimeout(() => window.location.reload(), 1200)
            }
        } catch (error : unknown) {
            Notify.failure('Something went wrong', {timeout:1200})
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
                {/* {
                    sectionUpload === 2 && (
                        <section id="section-crop">
                            <h5 className="text-center">Crop</h5>
                            <div className="relative w-[400px] h-[400px]">
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
                            <div className="w-full flex justify-end mt-2">
                                <button onClick={cropImage} className="text-sm bg-blue-500 text-white rounded !px-3 !py-1">Next</button>
                            </div>
                        </section>
                    )
                } */}
                {
                    sectionUpload === 2 && (
                        <section id="content-section">
                            <form onSubmit={handleSubmit(create)}>
                            <h5 className="text-center text-sm">Caption</h5>
                            <div className="flex items-center gap-5">
                                {/* croped image preview is originla */}
                                <img className="w-[200px]" src={imagePreview} alt="" />
                                {/* <div>
                                    <textarea onChange={(event) => setDescription(event.target.value)} className="border border-gray-300  rounded w-[400px] h-[200px] outline-none text-sm p-2" placeholder="write something..." name="" id=""></textarea>
                                </div> */}
                                
                                <FormControl sx={{width:'400px', height:'200px'}} error={Boolean(errors.description)}>
                                    <Controller
                                        name="description"
                                        control={control}
                                        rules={{
                                            required:{value:true, message:'Caption can not be empty'}
                                        }}
                                        render={({field}) => (
                                            <Textarea
                                                error={Boolean(errors.description)}
                                                sx={{height:'100%'}}
                                                {...field}
                                                minRows={5}
                                                
                                                placeholder="Write a caption"
                                            />
                                        )}
                                    />
                                    <FormHelperText>{errors.description?.message}</FormHelperText>
                                </FormControl>
        
                            </div>
                            <div className="w-full flex justify-end p-2">
                                <button type="submit" className="text-sm bg-blue-500 text-white !px-4 !py-1 rounded">Post</button>
                            </div>
                            </form>
                        </section>
                    )
                }
            </div>
        </div>
    )
}