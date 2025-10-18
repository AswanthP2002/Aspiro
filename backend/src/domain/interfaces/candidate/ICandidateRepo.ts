import { FindCandidatesQuery } from '../../../application/queries/candidates.query';
import Candidate from '../../entities/candidate/candidate.entity';
//import Candidate from '../../entities/candidate/candidate.entity';
import CandidateAggregated from '../../entities/candidate/candidateAggregated.entity';
import CandidatePaginated from '../../entities/candidate/candidatePaginated.entity';
import SocialLinks from '../../entities/SocialLinks';
import IBaseRepo from '../IBaseRepo';

import { SaveCandidate } from './saveResponses';

export default interface ICandidateRepo extends IBaseRepo<Candidate> {
  //create(candidate : Candidate) : Promise<SaveCandidate | null> //started implementing baserepo / generic repo :: changes made here = changed the return type to candidate from saveCandidate
  findByCandidateId(id: string): Promise<Candidate | null>;
  findByUserId(userId?: string): Promise<Candidate | null>;
  findByEmail(email?: string): Promise<Candidate | null>;
  findByGoogleId(googleId: string): Promise<Candidate | null>;
  findByMobileNumber(mobileNumber?: string): Promise<Candidate | null>;
  findByToken(token: string): Promise<Candidate | null>;
  updateVerificationById(id: string): Promise<Candidate | null>;
  updateIntroDetails(
    id: string,
    role: string,
    city: string,
    district: string,
    state: string,
    country: string,
    pincode: string,
    summary: string
  ): Promise<Candidate | null>;
  editProfile(
    id: string,
    name: string,
    role: string,
    city: string,
    district: string,
    state: string,
    country: string,
    about: string
  ): Promise<Candidate | null>;
  findCandidates(
    query: FindCandidatesQuery
  ): Promise<CandidatePaginated | null>;
  blockCandidate(id: string): Promise<boolean>;
  unblockCandidate(id: string): Promise<boolean>;
  //isCandidateBlocked(id : string) : Promise<boolean | undefined>
  candidateAggregatedData(
    candidateId: string
  ): Promise<CandidateAggregated | null>; //need to update the aggregated data return type based on architectural correction
  addSocialLink(
    candidateId?: string,
    socialLink?: SocialLinks
  ): Promise<Candidate | null>;
  getSocialLinks(candidateId: string): Promise<any>;
  deleteSocialLink(candidateId?: string, domain?: string): Promise<void>;
  uploadProfilePhoto(
    candidateId: string,
    cloudinaryUrl: string,
    cloudinaryPublicId: string
  ): Promise<Candidate | null>;
  removeProfilePhoto(candidateId: string): Promise<void>;
  uploadCoverPhoto(
    candidateId: string,
    cloudinaryUrl: string,
    cloudinaryPublicId: string
  ): Promise<Candidate | null>;
  removeCoverPhoto(candidateId: string): Promise<void>;
}

//stopped at geting candidate line 18
