import Candidate from "../../entities/candidate/candidates";

export default interface CandidateRepo {
    create(candidate : Candidate) : Promise<string>
    findById(id : string) : Promise<Candidate | null>
    findByEmail(email : string) : Promise<Candidate | null>
    findByUsername(username : string) : Promise<Candidate | null>
    findByToken(token : string) : Promise<Candidate | null>
    updateCandidate(otp : string, field : string, value : boolean) : Promise<Candidate | null>
}