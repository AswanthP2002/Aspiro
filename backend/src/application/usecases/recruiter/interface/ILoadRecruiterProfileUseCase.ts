import Recruiter from "../../../../domain/entities/recruiter/recruiter";

export default interface ILoadRecruiterProfileUseCase {
    execute(id : string) : Promise<Recruiter>
}