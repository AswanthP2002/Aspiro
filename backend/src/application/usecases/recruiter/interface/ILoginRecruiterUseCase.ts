import RecruiterLoginDTO, { RecruiterLoginResDTO } from "../../../DTOs/recruiter/recruiterLoginDTO";

export default interface ILoginRecruiterrUseCase {
    execute(loginRecruiterDto : RecruiterLoginDTO) : Promise<RecruiterLoginResDTO | null>
}