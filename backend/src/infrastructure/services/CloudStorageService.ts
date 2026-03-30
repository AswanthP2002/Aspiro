import { injectable } from 'tsyringe';
import ICloudStroageService from '../../application/interfaces/services/ICloudStorageService';
import cloudinary from '../../utilities/cloudinary';
import streamifier from 'streamifier';

@injectable()
export default class CloudStorageService implements ICloudStroageService {
  async upload(
    file: Buffer<ArrayBufferLike>,
    folderName: string,
    publicId?: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      let stream;
      if (publicId) {
        stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
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
            resource_type: 'auto',
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
