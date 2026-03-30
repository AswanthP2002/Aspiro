export default interface CompanyDTO {
  _id?: string;
  name?: string;
  website?: string;
  linkedin?: string;
  description?: string;
  industry?: string;
  location?: string;
  slogan?: string;
  logo?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface AddCompanyDTO {
  name?: string;
  website?: string;
  linkedin?: string;
  description?: string;
  industry?: string;
  location?: string;
  slogan?: string;
}

/**
 * export default interface Company {
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

 */
