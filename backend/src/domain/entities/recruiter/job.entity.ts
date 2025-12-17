
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Temporary';
export type WorkMode = 'On-site' | 'Remote' | 'Hybrid';
export type JobLevel = 'Entry-level' | 'Mid-level' | 'Senior-level' | 'Lead' | 'Manager';
export type SalaryPeriod = 'annually' | 'monthly' | 'weekly' | 'hourly';
export type JobStatus = 'draft' | 'active' | 'expired' | 'closed' | 'rejected' | 'blocked';

export default interface Job {
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
    createdAt? : Date
    updatedAt? : Date
    expiresAt? : String
}