export default interface JobTypeDTO {
  _id?: string;
  name?: string;
  slug?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface CreateJobTypeDTO {
  name?: string;
  isActive?: boolean;
}

export interface PaginatedJobTypeDTO {
  jobTypes: JobTypeDTO[];
  totalPages: number;
}

export interface ChangeJobTypeStatusDTO {
  id: string;
  isActive: boolean;
}

export interface UpdateJobTypeDTO {
  id: string;
  name: string;
}

export interface GetJobTypesDTO {
  search: string;
  limit: number;
  page: number;
}
