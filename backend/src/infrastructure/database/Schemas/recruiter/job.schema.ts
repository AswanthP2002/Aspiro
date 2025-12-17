import { Schema } from 'mongoose';
import Job from '../../../../domain/entities/recruiter/job.entity';
import { number } from 'zod';

export const JobSchema = new Schema<Job>({
  recruiterId:{type:Schema.Types.ObjectId, ref:'users', required:true},
  jobTitle:{type:String, required:true},
  description:{type:String, required:true},
  requirements:{type:String, required:true},
  responsibilities:{type:String, required:true},
  duration:{type:String},
  jobType:{type:String, enum:['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'], required:true},
  workMode:{type:String, enum:['On-site', 'Remote', 'Hybrid'], required:true},
  location:{type:String},
  minSalary:{type:Number, required:true},
  maxSalary:{type:Number, required:true},
  salaryCurrency:{type:String},
  salaryPeriod:{type:String, enum:['annually', 'monthly', 'weekly', 'hourly'], required:true},
  vacancies:{type:Number, required:true},
  qualification:{type:String, required:true},
  experienceInYears:{type:Number, required:true},
  jobLevel:{type:String, enum:['Entry-level', 'Mid-level', 'Senior-level', 'Lead', 'Manager'], required:true},
  requiredSkills:{type:[String]},
  optionalSkills:{type:[String]},
  status:{type:String, enum:['draft', 'active', 'expired', 'closed', 'rejected', 'blocked'], default:'draft'},
  rejectionReason:{type:String},
  views:{type:Number, default:0},
  applicationsCount:{type:Number, default:0},
  expiresAt:{type:Date, required:true},
},{
  timestamps:true
})

/**
 * _id? : string
     recruiterId? : string // Renamed from companyId for clarity
     jobTitle : string
     description : string
     requirements : string
     responsibilities : string
     duration? : string // Good for contract/temporary roles
     jobType : JobType
     locationType : LocationType
     location : string
     minSalary : number
     maxSalary : number
     salaryCurrency: string; // e.g., 'USD', 'INR'
     salaryPeriod: SalaryPeriod;
     vacancies : number
     qualification : string
     experienceInYears : number // More queryable than a string
     jobLevel : JobLevel
     requiredSkills : string[]
     optionalSkills : string[]
     status?: JobStatus; // Replaces isBlocked and isRejected for better state management
     rejectionReason?: string; // To provide feedback if status is 'rejected'
     views?: number; // For analytics
     applicationsCount?: number; // For analytics
     createdAt? : Date
     updatedAt? : Date
     expiresAt : Date
 */