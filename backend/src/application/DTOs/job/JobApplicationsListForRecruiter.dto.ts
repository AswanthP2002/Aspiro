import SkillsDTO from '../admin/skills.dto';
import { EducationDTO } from '../user/education.dto.FIX';
import { ExperienceDTO } from '../user/experience.dto.FIX';

export default interface JobApplicationsListForRecruiterDTO {
  _id?: string;
  status?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  candidateDetails?: {
    _id?: string;
    name?: string;
    email?: string;
    headline?: string;
    location?: string;
    match?: number;
  };
}

export interface JobApplicationListRecruiterRequestDTO {
  jobId: string;
  search: string;
  page: number;
  limit: number;
  filter: string;
}

export interface SingleApplicationDetailsForRecruiterDTO {
  _id?: string;
  status?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  candidateDetails?: {
    _id?: string;
    name?: string;
    email?: string;
    headline?: string;
    phone?: string;
    location?: string;
    match?: number;
  };
  experiences?: ExperienceDTO[];
  educations?: EducationDTO[];
  skills?: SkillsDTO[];
  notes?: string;
  resumeDetails?: {
    _id?: string;
    url?: string;
  };
}
