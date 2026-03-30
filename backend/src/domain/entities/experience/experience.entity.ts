export default interface Experience {
  _id?: string;
  userId?: string;
  jobRole: string;
  jobType: string;
  organization: string;
  startDate?: string;
  isPresent: boolean;
  endDate?: string | Date;
  location: string;
  workMode: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
