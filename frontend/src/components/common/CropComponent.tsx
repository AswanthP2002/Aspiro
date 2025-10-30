import Cropper from 'react-easy-crop'
import 'react-easy-crop/react-easy-crop.css'
import cropTestImage from '/candidate-tile.jpg'

export default function CropComponent({crop, aspectRatio, zoom, image = cropTestImage, setCrop, setZoom, cropComplete} : any){
    console.log('this is from crop component', image)

    const cropperProps: any = {
        image: image,
        crop: crop,
        zoom: zoom,
        onCropChange: setCrop,
        onZoomChange: setZoom,
        onCropComplete: cropComplete,
        restrictPosition: false,
        showGrid: true,
        
    };

    if (aspectRatio) {
        cropperProps.aspect = aspectRatio;
    }

    return(
        <div className='relative w-full h-full'>
            <Cropper {...cropperProps} />
        </div>
    )
}