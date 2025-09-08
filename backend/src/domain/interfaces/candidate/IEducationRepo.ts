import Education from "../../entities/candidate/educations";
import IBaseRepo from "../IBaseRepo";

export default interface IEducationRepo extends IBaseRepo<Education> {
    //addEducation(education : Education) : Promise<boolean>
    //getEducations(candidateID : string) : Promise<Education[]>
    //deleteEducation(educationId : string) : Promise<boolean>
    editEducation(updateEducation : Education) : Promise<Education | null>
}