import CertificateDTO from '../certificate/certificate.dto';
import { EducationDTO } from '../education/education.dto';
import { ExperienceDTO } from '../experience/experience.dto';
import { SkillDTO } from '../skill/skill.dto';

export default interface UserFullProfileDataDTO {
  _id?: string;
  name?: string;
  headline?: string;
  summary?: string;
  //   socialLinks?: SocialLinks[];
  location?: {
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
    coords?: {
      type: 'Point';
      coordinates: [number, number]; //long lat order
    };
  };
  phone?: string;
  email?: string;
  connections?: string[];
  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  coverPhoto?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  experiences: ExperienceDTO[];
  educations: EducationDTO[];
  skills: SkillDTO[];
  certificates: CertificateDTO[];
}
