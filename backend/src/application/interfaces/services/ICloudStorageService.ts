export default interface ICloudStroageService {
  upload(file: Buffer<ArrayBufferLike>, folderName: string, publicId?: string): Promise<unknown>;
}
