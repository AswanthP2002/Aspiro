import IFavoriteJobsRepo from '../../../domain/interfaces/user/IFavoriteJobRepo';
import BaseRepository from '../baseRepository';
import FavoriteJobs from '../../../domain/entities/savedJob/favoriteJobs.entity';
import mongoose from 'mongoose';
import { FavoriteJobsDAO } from '../../database/DAOs/user/faovriteJobs.dao';
import FavoriteJobsAggregated from '../../../domain/entities/savedJob/favoriteJobsAggregated.entity';

export default class FavoriteJobsRepsitory
  extends BaseRepository<FavoriteJobs>
  implements IFavoriteJobsRepo
{
  constructor() {
    super(FavoriteJobsDAO);
  }

  async getFavoriteJobWithDetails(
    candidateId: string,
    search: string,
    page: number,
    limit: number,
    sort: string
  ): Promise<{ jobs: FavoriteJobsAggregated[]; totalPages: number } | null> {
    const skip = (page - 1) * limit;
    let sortOption: { [key: string]: 1 | -1 } = {};
    switch (sort) {
      case 'recently-saved':
        sortOption = { createdAt: -1 };
        break;
      case 'expiry-order':
        sortOption = { 'jobDetails.expiresAt': 1 };
        break;
      case 'highest-salary':
        sortOption = { 'jobDetails.maxSalary': -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const result = await FavoriteJobsDAO.aggregate([
      { $match: { candidateId: new mongoose.Types.ObjectId(candidateId) } },
      {
        $facet: {
          jobs: [
            {
              $lookup: {
                from: 'jobs',
                localField: 'jobId',
                foreignField: '_id',
                as: 'jobDetails',
              },
            },
            {
              $unwind: {
                path: '$jobDetails',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'jobDetails.recruiterId',
                foreignField: '_id',
                as: 'postedBy',
              },
            },
            {
              $unwind: {
                path: '$postedBy',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'recruiters',
                localField: 'postedBy._id',
                foreignField: 'userId',
                as: 'recruiterProfile',
              },
            },
            {
              $unwind: {
                path: '$recruiterProfile',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'companies',
                localField: 'recruiterProfile.companyId',
                foreignField: '_id',
                as: 'companyDetails',
              },
            },
            {
              $unwind: {
                path: '$companyDetails',
                preserveNullAndEmptyArrays: true,
              },
            },
            { $unwind: { path: '$companyDetails', preserveNullAndEmptyArrays: true } },
            {
              $match: {
                'jobDetails.jobTitle': { $regex: new RegExp(search, 'i') },
                'jobDetails.expiresAt': { $gt: new Date() },
              },
            },
            { $sort: sortOption },
            { $skip: skip },
            { $limit: limit },
          ],
          metaData: [{ $count: 'totalDocs' }],
        },
      },
    ]);

    const jobs = result[0]?.jobs;
    const totalDocs = result[0]?.metaData[0]?.totalDocs;
    const totalPages = Math.ceil(totalDocs / limit);

    return { jobs, totalPages };
  }

  async deleteFavoriteJob(jobId: string, candidateId: string): Promise<void> {
    const result = await FavoriteJobsDAO.deleteOne({
      candidateId: new mongoose.Types.ObjectId(candidateId),
      jobId: new mongoose.Types.ObjectId(jobId),
    });
    console.log('result object', result);
  }

  async findWithCandidateId(id: string): Promise<FavoriteJobs[] | null> {
    const result = await FavoriteJobsDAO.find({
      candidateId: new mongoose.Types.ObjectId(id),
    });
    return result;
  }
}
