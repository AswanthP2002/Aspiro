import IEducationRepo from "../../../domain/interfaces/candidate/IEducationRepo";
import IDeleteEducationUseCase from "./interface/IDeleteEducationUseCase";

export default class DeleteEducationUseCase implements IDeleteEducationUseCase {
    constructor(private _iEducationRepo : IEducationRepo) {}

    async execute(educationId: string): Promise<void> {
        await this._iEducationRepo.delete(educationId)
    }
}