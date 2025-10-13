export interface FindCandidatesQuery {
  search: string;
  page: number;
  limit: number;
  filterOptions: {
    jobRole: string[];
    status: string[];
  };
  sortOption: CandidateNameSortQuery | CandidateJoinDateSortQuery;
}

export type CandidateNameSortQuery = {
  name: number;
};

export type CandidateJoinDateSortQuery = {
  createdAt: number;
};



/**
 * search : string = "", page : number = 1, limit : number = 1, sort : string
 */