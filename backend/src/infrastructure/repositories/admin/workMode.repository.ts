import { injectable } from 'tsyringe';
import WorkMode from '../../../domain/entities/admin/workMode.entity';
import IWorkModeRepository from '../../../domain/interfaces/admin/IWorkMode.repo';
import { workModeDAO } from '../../database/Schemas/admin/workmode.schema';
import BaseRepository from '../baseRepository';

@injectable()
export default class WorkModeRepository
  extends BaseRepository<WorkMode>
  implements IWorkModeRepository
{
  constructor() {
    super(workModeDAO);
  }

  async getWorkModesAggregated(
    search: string,
    limit: number,
    page: number
  ): Promise<{ workModes: WorkMode[]; totalPages: number } | null> {
    const skip = (page - 1) * limit;

    const workModes = await workModeDAO.find()
    const totalPages = 1
    return { workModes, totalPages };
  }
}
