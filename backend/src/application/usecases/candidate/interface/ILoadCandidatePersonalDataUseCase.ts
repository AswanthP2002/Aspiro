import Candidate from "../../../../domain/entities/candidate/candidates";

export default interface ILoadCandidatePersonalDataUseCase {
    execute(id : string) : Promise<Candidate>
}