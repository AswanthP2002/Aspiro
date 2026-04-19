import Cropper from 'react-easy-crop'
import 'react-easy-crop/react-easy-crop.css'
import cropTestImage from '/candidate-tile.jpg'

interface CropperProps {
    image: string;
    crop: {x: number, y: number};
    zoom: number;
    onCropChange: () => void;
    onZoomChange: () => void;
    onCropComplete: () => void;
    restrictPosition: boolean;
    showGrid: boolean;
    aspect?: number;
}

interface CropComponentProps {
    crop: {x: number, y: number};
    aspectRatio: number | string;
    zoom: number;
    image: string;
    setCrop: () => void;
    setZoom: () => void;
    cropComplete: () => void
}

export default function CropComponent({crop, aspectRatio, zoom, image = cropTestImage, setCrop, setZoom, cropComplete} : CropComponentProps){
    console.log('this is from crop component', image)

    const cropperProps: CropperProps = {
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
        cropperProps.aspect = aspectRatio as number;
    }

    return(
        <div className='relative w-full h-full'>
            <Cropper {...cropperProps} />
        </div>
    )
}