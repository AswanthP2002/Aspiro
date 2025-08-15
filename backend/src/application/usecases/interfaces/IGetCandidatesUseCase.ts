import Candidate from "../../../domain/entities/candidate/candidates";

export default interface IGetCandidatesUseCase {
    execute(search : string, page : number, limit : number, sort : string, filter : any) : Promise<Candidate[] | null>
}