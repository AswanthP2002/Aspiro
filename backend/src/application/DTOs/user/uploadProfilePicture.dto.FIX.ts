export interface UploadProfilePictureDTO {
  publicId: string;
  imageFile: Buffer<ArrayBufferLike>;
  userId: string;
}
