import Candidate from "../../../domain/entities/candidate/candidates";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import IEditProfileUseCase from "./interface/IEditProfileUseCase";

export default class EditProfileUseCase implements IEditProfileUseCase {
    constructor(private _iCandidateRepo : CandidateRepo){}

    async execute(id : string, name : string, role : string, city : string, district : string, state : string, country : string, about : string) : Promise<Candidate | null>{
        const updatedDoc = await this._iCandidateRepo.editProfile(id, name, role, city, district, state, country, about)
        if(!updatedDoc) throw new Error('Candidate not updated')
        return updatedDoc
    }
}