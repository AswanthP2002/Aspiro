import SkillsDTO from '../skills.admin/skills.dto';
import { EducationDTO } from '../education/education.dto.FIX';
import { ExperienceDTO } from '../experience/experience.dto.FIX';

export default interface JobApplicationsListForRecruiterDTO {
  _id?: string;
  status?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  notes?: string;
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
  jobDetails?: {
    _id: string;
    jobTitle: string;
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
