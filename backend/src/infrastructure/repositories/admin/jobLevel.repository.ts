import { injectable } from 'tsyringe';
import JobLevel from '../../../domain/entities/admin/jobLevel.entity';
import IJobLevelRepository from '../../../domain/interfaces/admin/IJobLevel.repository';
import { JobLevelDAO } from '../../database/Schemas/admin/jobLevel.schema';
import BaseRepository from '../baseRepository';

@injectable()
export default class JobLevelRepository
  extends BaseRepository<JobLevel>
  implements IJobLevelRepository
{
  constructor() {
    super(JobLevelDAO);
  }

  async getAggregatedJobLevel(
    search: string,
    limit: number,
    page: number
  ): Promise<{ jobLevels: JobLevel[]; totalPages: number } | null> {
    const skip = (page - 1) * limit;

    // const result = await JobLevelDAO.aggregate([
    //   { $match: { $regex: new RegExp(search, 'i') } },
    //   {
    //     $facet: {
    //       data: [{ $skip: skip }, { $limit: limit }],
    //       metaData: [{ $count: 'totalDocs' }],
    //     },
    //   },
    // ]);

    const jobLevels = await JobLevelDAO.find()
    const totalPages = 1

    return { jobLevels, totalPages };
  }
}


//stoped here -> job level is not being added properly