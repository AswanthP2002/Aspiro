import { CandidateDetails } from "../../../../presentation/controllers/dtos/candidate/userDetailsDTO";

export default interface ISaveIntroDetailsUseCase {
    execute(candidate : CandidateDetails) : Promise<boolean>
}