export type JobApplicationStatus =
  | 'applied'
  | 'opened'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'rejected';
export default interface JobApplication {
  _id?: string;
  candidateId?: string;
  jobId?: string;
  resumeId?: string;
  coverLetterContent: string;
  status?: JobApplicationStatus;
  notes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
