export interface GetUsersForPublicDTO {
  search: string;
  page: number;
  limit: number;
  sort?: string;
  roleTypeFilter?: string;
  experienceFilter?: string;
  location?: string;
}
