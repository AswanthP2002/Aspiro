import { injectable } from 'tsyringe';
import JobLevel from '../../../domain/entities/jobLevel/jobLevel.entity';
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

    const result = await JobLevelDAO.aggregate([
      {
        $facet: {
          jobLevels: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
          metaData: [{ $count: 'totalDocs' }],
        },
      },
    ]);

    const jobLevels = result[0]?.jobLevels;
    const totalPages = Math.ceil(result[0]?.metaData[0]?.totalDocs / limit);

    return { jobLevels, totalPages };
  }

  async findJobLevelWithSlugName(slug: string): Promise<JobLevel | null> {
    const jobLevel = await JobLevelDAO.findOne({ slug });
    return jobLevel;
  }
}

//stoped here -> job level is not being added properly
