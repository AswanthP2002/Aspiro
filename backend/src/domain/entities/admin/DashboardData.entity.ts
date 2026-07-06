export default interface AdminDashboardData {
  overview: {
    totalActiveUsers: number;
    userGrowth: number;
    newJobs: number;
    jobGrowth: number;
    pendingVerification: number;
  };
  charts: {
    userEngangement: any[];
  };
}
