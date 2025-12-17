export interface FindUsersQuery {
  search: string;
  page: number;
  limit: number;
  filterOptions: {
    status: boolean[],
    roles: string[],
    verification: boolean[]
  };
  sortOption: UsersNameSortQuery | UserJoinDateSortQuery;
}

export type UsersNameSortQuery = {
  name: 1 | -1;
};

export type UserJoinDateSortQuery = {
  createdAt: 1 | -1;
};

export type CandidateJoinDateSortQuery = {
  createdAt: number;
};



/**
 * search : string = "", page : number = 1, limit : number = 1, sort : string
 */