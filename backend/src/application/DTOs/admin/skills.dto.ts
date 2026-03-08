
export default interface SkillsDTO {
  _id?: string;
  skills?: string;
  isVerified?: boolean;
}

export interface CreateSkillDTO {
  skills: string;
  isVerified?: boolean
}

export interface LoadPaginatedSkillsDTO {
  skills: SkillsDTO[];
  totalPages: number;
}

export interface UpdateSkillsDTO {
  _id: string;
  skills?: string;
  isVerified?: boolean;
}

export interface GetSkillsDTO {
  search: string;
  page: number;
  limit: number;
}
