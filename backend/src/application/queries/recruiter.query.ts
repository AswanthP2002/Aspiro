export type RecruiterNameSortQuery = {
  companyName: 1 | -1;
};

export type RecruiterJoinedDateQuery = {
  createdAt: 1 | -1;
};

export default interface FindRecruitersDBQuery {
  search: string;
  page: number;
  limit: number;
  employer_type_filter: string[];
  employer_status_filter?: any;
  sortOption: { [key: string]: number };
}

export interface AppliedRecruitersQuery {
  search: string;
  profileStatus: string[];
}
