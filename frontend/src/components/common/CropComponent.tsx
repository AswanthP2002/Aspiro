import Cropper from 'react-easy-crop'
import cropTestImage from '/candidate-tile.jpg'

export default function CropComponent({crop, aspectRatio, zoom, image = cropTestImage, setCrop, setZoom, cropComplete} : any){
    console.log('this is from crop component', image)
    return(
        <div className='relative w-full h-full'>
            <Cropper
                image={image}
                aspect={aspectRatio}
                crop={crop}
                zoom={zoom}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={cropComplete}
            />
        </div>
    )
}