import Recruiter from "../../../../domain/entities/recruiter/recruiter";

export default interface ILoadCompanyDetailsUseCase {
    execute(companyId : string) : Promise<Recruiter | null>
}