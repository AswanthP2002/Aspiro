import { Schema } from 'mongoose';
import Job from '../../../../domain/entities/job/job.entity';

export const JobSchema = new Schema<Job>(
  {
    recruiterId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    jobTitle: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    responsibilities: { type: String, required: true },
    duration: { type: String },
    jobType: {
      type: String,
      // enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'],
      required: true,
    },
    workMode: { type: String, /*enum: ['On-site', 'Remote', 'Hybrid'],*/ required: true },
    location: { type: String },
    minSalary: { type: Number, required: true },
    maxSalary: { type: Number, required: true },
    salaryCurrency: { type: String },
    salaryPeriod: {
      type: String,
      enum: ['annually', 'monthly', 'weekly', 'hourly'],
      required: true,
    },
    vacancies: { type: Number, required: true },
    qualification: { type: String, required: true },
    experienceInYears: { type: Number, required: true },
    jobLevel: {
      type: String,
      // enum: ['Entry-level', 'Mid-level', 'Senior-level', 'Lead', 'Manager'],
      required: true,
    },
    reportsCount: { type: Number, default: 0 },
    requiredSkills: { type: [String] },
    optionalSkills: { type: [String] },
    status: {
      type: String,
      enum: ['draft', 'active', 'expired', 'closed', 'rejected', 'blocked'],
      default: 'active',
    },
    isFlagged: { type: Boolean, default: false },
    rejectionReason: { type: String },
    views: { type: Number, default: 0 },
    applicationsCount: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);
