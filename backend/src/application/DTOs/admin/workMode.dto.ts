export default interface WorkModeDTO {
  _id?: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt?: string;
}

export interface CreateWorkModeDTO {
  name: string;
  isActive?: boolean;
}

export interface EditWorkModeDTO {
  id: string
  name?: string
  slug?: string
  isActive?: string
}

export interface PaginatedWorkModesDTO {
  workModes: WorkModeDTO[];
  totalPages: number;
}

export interface GetWorkModsDTO {
  search: string;
  page: number;
  limit: number;
}

export interface ChangeWorkModeStatusDTO {
  id: string
  status: string
}
