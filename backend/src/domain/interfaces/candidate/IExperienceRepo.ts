import Experience from "../../entities/candidate/experience";
import IBaseRepo from "../IBaseRepo";
import { SaveExperience } from "./saveResponses";
import { ObjectId } from "mongoose";

export default interface IExperienceRepo extends IBaseRepo<Experience> {
    //addExperience(experience : Experience) : Promise<SaveExperience>
    //getExperiences(candidateIdd : string) : Promise<Experience[]>
    //deleteExperience(experienceId : string) : Promise<boolean>
    editExperience(experienceId : string, experience : any) : Promise<boolean>
}