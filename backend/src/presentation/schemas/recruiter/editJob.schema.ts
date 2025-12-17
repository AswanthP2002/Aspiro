import z from 'zod';

export const editJobSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid job id' }),
  recruiterId: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid recruiter id' }),
  jobTitle: z.string(),
  description: z.string(),
  requirements: z.string(),
  responsibilities: z.string(),
  duration: z.string().optional(),
  jobType: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary']),
  workMode: z.enum(['On-site', 'Remote', 'Hybrid']),
  location: z.string(),
  minSalary: z.number(),
  maxSalary: z.number(),
  salaryCurrency: z.string(),
  salaryPeriod: z.enum(['annually', 'monthly', 'weekly', 'hourly']),
  vacancies: z.number(),
  qualification: z.string(),
  experienceInYears: z.number(),
  jobLevel: z.enum(['Entry-level', 'Mid-level', 'Senior-level', 'Lead', 'Manager']),
  requiredSkills: z.array(z.string()),
  optionalSkills: z.array(z.string()),
  expiresAt: z.string(),
});

/**
 *  _id?: string;
   recruiterId?: string; // Renamed from companyId for clarity
   jobTitle: string;
   description: string;
   requirements: string;
   responsibilities: string;
   duration?: string; // Good for contract/temporary roles
   jobType?: JobType;
   workMode?: WorkMode;
   location: string;
   minSalary: number;
   maxSalary: number;
   salaryCurrency: string; // e.g., 'USD', 'INR'
   salaryPeriod?: SalaryPeriod;
   vacancies: number;
   qualification: string;
   experienceInYears: number; // More queryable than a string
   jobLevel?: JobLevel;
   requiredSkills: string[];
   optionalSkills: string[];
   status?: JobStatus; // Replaces isBlocked and isRejected for better state management
   rejectionReason?: string; // To provide feedback if status is 'rejected'
   views?: number; // For analytics
   applicationsCount?: number; // For analytics
   createdAt?: Date;
   updatedAt?: Date;
   expiresAt?: String;
 */
