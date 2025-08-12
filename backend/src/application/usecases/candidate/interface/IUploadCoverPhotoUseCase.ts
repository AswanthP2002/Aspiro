export default interface IUploadCoverPhotoUseCase {
    execute(candidateId : string, imgFile : any, publicId : string) : Promise<boolean | null>
}