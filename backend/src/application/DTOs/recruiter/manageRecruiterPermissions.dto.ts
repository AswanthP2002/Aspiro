export default interface ManageRecruiterPermssionsDTO {
  recruiterId: string;
  isAllJobsHidden: boolean;
  allowPostJobs: boolean;
  allowEditJobs: boolean;
  allowDeletePosts: boolean;
  allowManageApplications: boolean;
  allowScheduleInterviews: boolean;
}
