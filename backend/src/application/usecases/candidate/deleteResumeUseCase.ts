import IResumeRepo from "../../../domain/interfaces/candidate/IResumeRepo";
import cloudinary from "../../../utilities/cloudinary";
import IDeleteResumeUseCase from "./interface/IDeleteResumeUseCase";

export default class DeleteResumeUseCase implements IDeleteResumeUseCase{
    constructor(private _iResumeRepo : IResumeRepo) {}

    async execute(resumeId : string, cloudinaryPublicId : string) : Promise<void> {
        const promiseResult : any = await new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(cloudinaryPublicId, {
                resource_type:'raw'
            }, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })

        if(promiseResult){
            const result = await this._iResumeRepo.delete(resumeId)
            return result
        }
    }
}