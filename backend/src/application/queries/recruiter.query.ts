export type RecruiterNameSortQuery = {
  companyName: 1 | -1;
};

export type RecruiterJoinedDateQuery = {
  createdAt: 1 | -1;
};

export default interface FindCompaniesQuery {
  search: string;
  page: number;
  limit: number;
  sortOption: RecruiterNameSortQuery | RecruiterJoinedDateQuery;
}
