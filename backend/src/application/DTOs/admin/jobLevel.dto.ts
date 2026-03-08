export default interface JobLevelDTO {
  _id?: string;
  name?: string;
  slug?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface CreateJobLevelDTO {
  name: string;
  isActive: boolean;
}

export interface UpdateJobLevelDTO {
  id: string;
  name: string;
}

export interface ChangeJobLevelDTO {
  id: string;
  isActive: boolean;
}

export interface PaginatedJobLevel {
  jobLevels: JobLevelDTO[];
  totalPages: number;
}

export interface GetJobLevelsDTO {
  search: string;
  page: number;
  limit: number;
}
