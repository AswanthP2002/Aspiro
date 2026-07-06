// import { inject, injectable } from 'tsyringe';
// import { deflate } from 'zlib';
// import IAdminLoadDashboardDataUsecase from '../../interfaces/usecases/admin/IAdminLoadDashboard.usecase';
// import IUserRepository from '../../../domain/interfaces/IUserRepo';
// import AdminDashboardData from '../../../domain/entities/admin/DashboardData.entity';
// import IJobRepo from '../../../domain/interfaces/IJobRepo';

// @injectable()
// export default class AdminLoadDashboardDataUsecase implements IAdminLoadDashboardDataUsecase {
//   constructor(
//     @inject('IUserRepository') private _userRepo: IUserRepository,
//     @inject('IJobRepository') private _jobRepo: IJobRepo
//   ) {}

//   async execute(): Promise<AdminDashboardData | null> {
//     const userAndGrowthResult = await this._userRepo.getActiveUsersWithGrowth();
//     const jobsAndGrowthResult = await this._jobRepo.getNewJobPostingWithGrowth();
//     if (userAndGrowthResult && jobsAndGrowthResult) {
//       const growth =
//         ((userAndGrowthResult.growth.thisMonth - userAndGrowthResult.growth.lastMonth) /
//           userAndGrowthResult.growth.lastMonth) *
//         100;

//       const jobGrowth =
//         ((jobsAndGrowthResult.growth.thisMonth - jobsAndGrowthResult.growth.lastMonth) /
//           jobsAndGrowthResult.growth.lastMonth) *
//         100;
//       return {
//         overview: {
//           totalActiveUsers: userAndGrowthResult.users,
//           userGrowth: growth,
//           newJobs: jobsAndGrowthResult.jobs,
//           jobGrowth
//         },
//       };
//     }
//   }
// }
