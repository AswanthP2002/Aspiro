import { Schema } from "mongoose";
import Job from "../../../../domain/entities/job";
import { number } from "zod";

export const JobSchema = new Schema<Job>({
    companyId:{type:Schema.Types.ObjectId, ref:'recruiters', required:true},
    description:{type:String},
    experience:{type:String},
    expiresAt:{type:Date},
    isBlocked:{type:Boolean, default:false},
    isRejected:{type:Boolean, default:false},
    jobLevel:{type:String},
    jobTitle:{type:String},
    jobType:{type:String},
    location:{type:String},
    locationType:{type:String},
    maxSalary:{type:Number},
    minSalary:{type:Number},
    qualification:{type:String},
    requirements:{type:String},
    responsibilities:{type:String},
    vacancies:{type:Number},
    duration:{type:String},
    requiredSkills:{type:[String]},
    optionalSkills:{type:[String]}
}, {timestamps:true})