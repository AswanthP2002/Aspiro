import { injectable } from 'tsyringe';
import JobType from '../../../domain/entities/admin/jobType.entity';
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
}
