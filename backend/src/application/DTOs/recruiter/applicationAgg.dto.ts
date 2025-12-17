import Job from '../../../domain/entities/recruiter/job.entity';
import Education from '../../../domain/entities/user/educations.entity';
import Experience from '../../../domain/entities/user/experience.entity';
import Resume from '../../../domain/entities/user/resume.entity';
import Skills from '../../../domain/entities/user/skills.entity';
import User from '../../../domain/entities/user/User.FIX';

export default interface ApplicationsAggregatedDTO {
  _id: string;
    candidateId: string;
    jobId: string;
    coverLetterContent: string;
    resumeId: string;
    status: string;
    notes?: string
    createdAt: Date;
    updatedAt: Date;
    job: Job
    applicant: User;
    resume: Resume;
    experiences: Experience[]
    educations: Education[]
    skills: Skills
}
