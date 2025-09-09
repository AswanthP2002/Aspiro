import RecruiterProfileAggregated from "../../../application/DTOs/recruiter/recruiterProfileAggregatedData";
import Recruiter from "../../entities/recruiter/recruiter";
import IBaseRepo from "../IBaseRepo";
import { SaveRecruiter } from "./createRecruiterRequest";

export default interface IRecruiterRepo extends IBaseRepo<Recruiter> {
    //create(recruiter : Recruiter) : Promise<SaveRecruiter>
    findByEmail(email : string) : Promise<Recruiter | null>
    findById(id : string) : Promise<Recruiter | null>
    findByUserName(username : string) : Promise<Recruiter | null> 
    findRecruiters(search? : string, page? : number, limit? : number, sort? : string) : Promise<any> //change for strict later
    verifyRecruiter(email : string) : Promise<Recruiter | null>
    updateIntroDetails(
        id : string,
        companyName : string,
        about : string,
        benefits : string,
        companyType : string,
        industryType : string,
        teamStrength : string,
        yearOfEstablishment : string,
        website : string,
        vision : string,
        country : string,
        state : string,
        city : string,
        mobile : string
    ) : Promise<Recruiter | null>
    blockRecruiter(id : string) : Promise<boolean>
    unblockRecruiter(id : string) : Promise<boolean>
    deleteRecruiter(id : string) : Promise<boolean>
    aggregateRecruiterProfile(id : string) : Promise<RecruiterProfileAggregated | null> //change strict later

}