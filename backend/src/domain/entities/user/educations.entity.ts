export default interface Education {
  _id?: string;
  userId?: string;
  educationStream: string; 
  educationLevel: string;
  institution: string;
  location: string;
  startYear?: string;
  isPresent: boolean;
  endYear?: string;
  createdAt?: string;
  updatedAt?: string;
}
