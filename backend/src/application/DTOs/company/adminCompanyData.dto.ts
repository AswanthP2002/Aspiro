export default interface AdminCompanyDataDTO {
  _id?: string;
  name: string;
  website?: string;
  linkedin?: string;
  description?: string;
  slogan?: string;
  industry?: string;
  location?: string;
  createdAt?: Date | string;
  recruiters?: number;
  jobs?: number;
}
