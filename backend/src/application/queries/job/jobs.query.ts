export interface JobsQuery {
  search: string;
  limit: number;
  skip: number;
  page: number;
  sortOption?: { [key: string]: number };
  jobStatusFilter?: string[];
  jobWorkModeFilter?: string[];
  filter?: {
    status: string[];
    workMode: string[];
    jobLevel?: string[];
    jobType?: string[];
  };
  locationSearch?: string;
}

export interface AdminLoadJobsQuery {
  search: string;
  page: number;
  limit: number;
  reportsCount?: number;
  statusFilter?: string[];
  jobTypeFilter?: string[];
}

export interface LoadJobsAggregatedListForPublicQuery {
  search: string;
  locationSearch: string;
  limit: number;
  page: number;
  workModeFilter: string[];
  jobTypeFilter: string[];
  jobLevelFilter: string[];
}
