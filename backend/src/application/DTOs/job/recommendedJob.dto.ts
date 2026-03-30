export default interface RecommendedJobDTO {
  _id?: string;
  jobTitle?: string;
  recruiterDetails: {
    _id: string;
    name: string;
  };
  companyDetails: {
    _id: string;
    name: string;
  };
}
