export default interface LoadRecruitersDTO {
  search: string;
  page: number;
  limit: number;
  sort?: string;
  recruiterType: string;
  employerStatusFilter?: string;
  filter?: {
    employerType: string;
  };
}
