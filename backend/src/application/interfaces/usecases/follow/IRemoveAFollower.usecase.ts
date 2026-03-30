import { RemoveAFollowerDTO } from '../../../DTOs/follow/follow.dto';

export default interface IRemoveAFollowerUsecase {
  execute(dto: RemoveAFollowerDTO): Promise<void>;
}
