import { injectable } from 'tsyringe';
import JobType from '../../../domain/entities/jobType/jobType.entity';
import IJobTypeRepository from '../../../domain/interfaces/admin/IJobType.repository';
import { JobTypeDAO } from '../../database/Schemas/admin/jobType.schema';
import BaseRepository from '../baseRepository';

@injectable()
export default class JobTypeRepository
  extends BaseRepository<JobType>
  implements IJobTypeRepository
{
  constructor() {
    super(JobTypeDAO);
  }

  async findJobTypeWithSlugName(slug: string): Promise<JobType | null> {
    const jobType = await JobTypeDAO.findOne({ slug });
    return jobType;
  }

  async getPaginatedJobTypes(
    limit: number,
    page: number
  ): Promise<{ jobTypes: JobType[]; totalPages: number }> {
    const skip = (page - 1) * limit;
    const result = await JobTypeDAO.aggregate([
      {
        $facet: {
          jobTypes: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
          metaData: [{ $count: 'totalDocs' }],
        },
      },
    ]);

    const jobTypes = result[0]?.jobTypes;
    const totalPages = Math.ceil(result[0]?.metaData[0]?.totalDocs / limit);

    return { jobTypes, totalPages };
  }
}
