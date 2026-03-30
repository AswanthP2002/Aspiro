export default interface Company {
  _id?: string;
  name: string;
  slogan?: string;
  website?: string;
  linkedin?: string;
  description?: string;
  industry?: string;
  location?: string;
  logo?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
