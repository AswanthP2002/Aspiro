import IShortlistRepo from '../../../domain/interfaces/recruiter/IShortlistRepo';
import IGetFinalizedShortlistData from './interface/IGetFinalizedData.usecase';

export default class GetFinalizedDataUseCase
  implements IGetFinalizedShortlistData
{
  constructor(private _IShortlistRepo: IShortlistRepo) {}

  async execute(jobId: string): Promise<any[]> {
    const result = await this._IShortlistRepo.getShortlistDataAggregated(jobId);
    return result;
  }
}
