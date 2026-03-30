import { injectable } from 'tsyringe';
import WorkMode from '../../../domain/entities/workMode/workMode.entity';
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
    const result = await workModeDAO.aggregate([
      {
        $facet: {
          workModes: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
          totalDocs: [{ $count: 'totalDocs' }],
        },
      },
    ]);
    const workModes = result[0]?.workModes;
    const totalPages = Math.ceil(result[0]?.totalDocs[0]?.totalDocs / limit);
    return { workModes, totalPages };
  }

  async findWorkModeWithSlugName(slug: string): Promise<WorkMode | null> {
    const workMode = await workModeDAO.findOne({ slug: slug });
    return workMode;
  }
}
