import Certificates from '../../../domain/entities/user/certificates.entity';
import Education from '../../../domain/entities/user/educations.entity';
import Experience from '../../../domain/entities/user/experience.entity';
import FavoriteJobs from '../../../domain/entities/user/favoriteJobs.entity';
import Resume from '../../../domain/entities/user/resume.entity';
import Skills from '../../../domain/entities/user/skills.entity';
import Follow from '../../../domain/entities/follow.entity';
import Post from '../../../domain/entities/user/Post';
import User from '../../../domain/entities/user/User.FIX';
import SocialLinks from '../../../domain/entities/SocialLinks';

export default interface CandidateAggregatedDTO {
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

// export default interface CandidateAggregatedDTO {
//     _id: string
//     name: string
//     about: string
//     certificates?: Certificates[]
//     currentSubscription: string
//     education?: Education[]
//     experience?: Experience[]
//     favorites?: FavoriteJobs[]
//     location: {
//         city?: string
//         district?: string
//         state?: string
//         pincode?: string
//         country?: string
//     },
//     resume?: Resume[]
//     socialLinks?: SocialLinks[]
//     isVerified: boolean
//     verificationToken?: string
//     isAdmin: boolean
//     otpExpiresAt?: Date
//     googleid: string
//     facebookid: string
//     skills?: Skills[]
//     posts? : Post[]
//     followers? : Follow[]
//     following? : Follow[]
// }
