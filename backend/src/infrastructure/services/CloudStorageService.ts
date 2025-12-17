import { injectable } from "tsyringe";
import ICloudStroageService from "../../application/interfaces/services/ICloudStorageService";
import cloudinary from "../../utilities/cloudinary";
import streamifier from 'streamifier'

@injectable()
export default class CloudStorageService implements ICloudStroageService {
    
  async upload(file: any, folderName: string, publicId?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let stream: any;
      if (publicId) {
        stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: folderName,
            public_id: publicId,
            overwrite: true,
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );
      } else {
        stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: folderName,
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );
      }

      streamifier.createReadStream(file).pipe(stream);
    });
  }

}