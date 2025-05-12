import Candidate from "../../entities/candidate/candidates";
import { SaveCandidate } from "./createCandidateRequest";

export default interface CandidateRepo {
    create(candidate : Candidate) : Promise<SaveCandidate>
    findById(id : string) : Promise<Candidate | null>
    findByEmail(email : any) : Promise<Candidate | null>
    findByGoogleId(googleId : string) : Promise<Candidate | null>
    findByUsername(username : string) : Promise<Candidate | null>
    findByToken(token : string) : Promise<Candidate | null>
    updateCandidate(otp : string, field : string, value : boolean) : Promise<Candidate | null>
    updateIntroDetails(id : string, role : string, city : string, district : string, state : string, country : string, pincode : string, summary : string) : Promise<Candidate | null>
    editProfile(id : string, name : string, role : string, city : string, district : string, state : string, country : string) : Promise<Candidate | null>
}