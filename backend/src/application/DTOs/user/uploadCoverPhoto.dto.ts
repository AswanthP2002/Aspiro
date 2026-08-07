export interface UploadCoverPhotoDTO {
  publicId: string;
  imageFile: Buffer<ArrayBufferLike>;
  userId: string;
}
