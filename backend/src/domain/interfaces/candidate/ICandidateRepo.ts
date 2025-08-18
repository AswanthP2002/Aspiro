import Candidate from "../../entities/candidate/candidates";
import SocialLinks from "../../entities/socialLinks";
import IBaseRepo from "../IBaseRepo";

import { SaveCandidate } from "./saveResponses";

export default interface ICandidateRepo extends IBaseRepo<Candidate>{
    //create(candidate : Candidate) : Promise<SaveCandidate | null> //started implementing baserepo / generic repo :: changes made here = changed the return type to candidate from saveCandidate
    findById(id : string) : Promise<Candidate | null>
    findByEmail(email : any) : Promise<Candidate | null>
    findByGoogleId(googleId : string) : Promise<Candidate | null>
    findByMobileNumber(mobileNumber : string) : Promise<Candidate | null>
    findByToken(token : string) : Promise<Candidate | null>
    updateCandidate(otp : string, field : string, value : boolean) : Promise<Candidate | null>
    updateIntroDetails(id : string, role : string, city : string, district : string, state : string, country : string, pincode : string, summary : string) : Promise<Candidate | null>
    editProfile(id : string, name : string, role : string, city : string, district : string, state : string, country : string, about : string) : Promise<Candidate | null>
    findCandidates(search? : string, page? : number, limit? : number, sort? : string, filter? : any) : Promise<any | null>
    blockCandidate(id : string) : Promise<boolean>
    unblockCandidate(id : string) : Promise<boolean>
    isCandidateBlocked(id : string) : Promise<boolean | undefined>
    candidateAggregatedData(candidateId : string) : Promise<any>
    addSocialLink(candidateId : string, socialLink : SocialLinks) : Promise<boolean | null>
    getSocialLinks(candidateId : string) : Promise<SocialLinks[] | null>
    deleteSocialLink(candidateId : string, domain : string) : Promise<boolean | null>
    uploadProfilePhoto(candidateId : string, cloudinaryUrl : string, cloudinaryPublicId : string) : Promise<boolean | null>
    removeProfilePhoto(candidateId : string) : Promise<boolean | null>
    uploadCoverPhoto(candidateId : string, cloudinaryUrl : string, cloudinaryPublicId : string) : Promise<boolean | null>
    removeCoverPhoto(candidateId : string) : Promise<boolean | null>
}