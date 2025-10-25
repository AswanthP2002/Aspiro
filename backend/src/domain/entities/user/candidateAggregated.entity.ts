import Follow from '../follow.entity';
import Post from '../Post.entity';
import User from '../shared/User';
import SocialLinks from '../SocialLinks';
import Certificates from './certificates.entity';
import Education from './educations.entity';
import Experience from './experience.entity';
import FavoriteJobs from './favoriteJobs.entity';
import Resume from './resume.entity';
import Skills from './skills.entity';

export default interface CandidateAggregated {
  _id: string;
  name: string;
  jobTitle: string;
  userId: string;
  socialLinks: SocialLinks[];
  createdAt: string;
  updatedAt: string;
  about: string;
  dateOfBirth: string;
  currentSubscription: string;
  userDetails: User;
  location?: {
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };
  experience?: Experience[];
  skills?: Skills[];
  education?: Education[];
  posts?: Post[];
  followers?: Follow[];
  following?: Follow;
}
