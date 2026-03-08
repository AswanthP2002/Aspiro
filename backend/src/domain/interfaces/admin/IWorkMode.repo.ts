import WorkMode from '../../entities/admin/workMode.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IWorkModeRepository extends IBaseRepo<WorkMode> {
  getWorkModesAggregated(
    search: string,
    limit: number,
    page: number
  ): Promise<{ workModes: WorkMode[]; totalPages: number } | null>;
}
