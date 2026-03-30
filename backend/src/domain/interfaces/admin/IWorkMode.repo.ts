import WorkMode from '../../entities/workMode/workMode.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IWorkModeRepository extends IBaseRepo<WorkMode> {
  getWorkModesAggregated(
    search: string,
    limit: number,
    page: number
  ): Promise<{ workModes: WorkMode[]; totalPages: number } | null>;
  findWorkModeWithSlugName(slug: string): Promise<WorkMode | null>;
}
