import IResumeRepo from "../../../domain/interfaces/candidate/IResumeRepo";
import cloudinary from "../../../utilities/cloudinary";

export default class DeleteResumeUseCase {
    constructor(private _iResumeRepo : IResumeRepo) {}

    async execute(resumeId : string, cloudinaryPublicId : string) : Promise<boolean> {
        const promiseResult : any = await new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(cloudinaryPublicId, {
                resource_type:'raw'
            }, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })

        if(promiseResult){
            const result = await this._iResumeRepo.deleteResume(resumeId)
            return result
        }

        return false

        
    }
}