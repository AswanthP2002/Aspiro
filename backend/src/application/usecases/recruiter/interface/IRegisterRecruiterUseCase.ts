import { RegisterRecruiterDTO } from "../../../../presentation/controllers/dtos/recruiter/registerRecruiterDTO";

export default interface IRegisterRecruiterUseCase {
    execute(recruiterDTO : RegisterRecruiterDTO) : Promise<string | null>
}