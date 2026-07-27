export default interface HomePageDataDTO {
  overview: {
    jobs: number;
    companies: number;
    recruiters: number;
    users: number;
  };
  jobVacancies: { jobTitle: string; openings: number }[];
}
