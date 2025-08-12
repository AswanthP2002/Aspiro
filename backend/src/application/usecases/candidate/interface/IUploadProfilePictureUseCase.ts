export default interface IUploadProfilePictureUseCase {
    execute(candidateId : string, imgFile : any, publicId : string) : Promise<boolean | null>
}