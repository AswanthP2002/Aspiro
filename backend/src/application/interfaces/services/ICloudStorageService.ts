export default interface ICloudStroageService {
    upload(file: any, folderName: string, publicId?: string) : Promise<any>
}