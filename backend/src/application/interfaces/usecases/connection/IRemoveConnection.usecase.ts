import { RemoveConnectionDTO } from '../../../DTOs/connection/connectionRequest.dto';

export default interface IRemoveConnectionUsecase {
  execute(dto: RemoveConnectionDTO): Promise<void>;
}
