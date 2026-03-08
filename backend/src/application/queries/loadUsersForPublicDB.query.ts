export default interface LoadUsersForPublicDBQuery {
  search: string;
  page: number;
  limit: number;
  sort?: { [key: string]: number };
  roleTypeFilter?: string[];
  location?: string;
  experienceFilter?: string[];
}
