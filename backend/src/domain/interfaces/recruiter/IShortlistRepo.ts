import Shortlist from "../../entities/recruiter/shortlist";
import IBaseRepo from "../IBaseRepo";

export default interface IShortlistRepo extends IBaseRepo<Shortlist> {
    getShortlistDataAggregated(jobId : string) : Promise<any[]>
}