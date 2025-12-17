export default interface LoadRecruitersDTO {
  search: string;
  page: number;
  limit: number;
  sort: string;
  filter:{
    employerType: string
  }
}
