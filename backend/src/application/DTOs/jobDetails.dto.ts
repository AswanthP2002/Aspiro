import { JobType, WorkMode, SalaryPeriod, JobLevel, JobStatus } from '../../domain/entities/recruiter/job.entity';
import Recruiter from '../../domain/entities/recruiter/recruiter.entity';
import User from '../../domain/entities/user/User.FIX';

export default interface JobAggregatedDTO {
   _id? : string
        recruiterId? : string // Renamed from companyId for clarity
        jobTitle : string
        description : string
        requirements : string
        responsibilities : string
        duration? : string // Good for contract/temporary roles
        jobType? : JobType
        workMode? : WorkMode
        location : string
        minSalary : number
        maxSalary : number
        salaryCurrency: string; // e.g., 'USD', 'INR'
        salaryPeriod?: SalaryPeriod;
        vacancies : number
        qualification : string
        experienceInYears : number // More queryable than a string
        jobLevel? : JobLevel
        requiredSkills : string[]
        optionalSkills : string[]
        status?: JobStatus; // Replaces isBlocked and isRejected for better state management
        rejectionReason?: string; // To provide feedback if status is 'rejected'
        views?: number; // For analytics
        applicationsCount?: number; // For analytics
        userProfile?: User
        userRecruiterProfile?: Recruiter
        candidateIds: string[]
        createdAt? : Date
        updatedAt? : Date
        expiresAt? : String
}
