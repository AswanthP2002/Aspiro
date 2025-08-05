import Candidate from "../../../../domain/entities/candidate/candidates";

export default interface ILoadCandidateDetailsUseCase {
    execute(id : string) : Promise<Candidate | null>
}