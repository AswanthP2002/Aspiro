import cloudinary from '../utilities/cloudinary';

async function deleteAssetsCloudinary(publidId: string) {
  await cloudinary.uploader.destroy(publidId, (error, result) => {
    if (error) {
      console.log('cloudinary error :', error);
      return;
    }
    return result;
  });
}

export default deleteAssetsCloudinary;
