
import cloudinary from "../utilities/cloudinary";
import streamfier from 'streamifier'

async function imgUploadToCloudinary(imgFile: any, folder: string, publidId: string = "") {
    return new Promise((resolve, reject) => {
        let stream: any
        if (publidId) {
            stream = cloudinary.uploader.upload_stream({
                resource_type: "image",
                folder: folder,
                public_id:publidId,
                overwrite:true
            }, (error, result) => {
                if (error) {
                    return reject(error)
                }
                resolve(result)
            })
        } else {
            stream = cloudinary.uploader.upload_stream({
                resource_type: "image",
                folder: folder
            }, (error, result) => {
                if (error) {
                    return reject(error)
                }
                resolve(result)
            })
        }


        streamfier.createReadStream(imgFile).pipe(stream)

    })

}

export default imgUploadToCloudinary