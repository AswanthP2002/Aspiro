
import z from 'zod'

export const CreateJobSchema = z.object({
    recruiterId: z.string().regex(/^[0-9a-fA-F]{24}$/, {message:'Invalid recruiter id'}),
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
    expiresAt: z.string()
})