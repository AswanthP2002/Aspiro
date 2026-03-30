import SimilarUserSuggesionDTO from '../../../DTOs/user/similarUserSuggesion.dto';
import { SimilarSkillUserDTO } from '../../../DTOs/user/user.dto.FIX';

export interface IGetSimilarUserUsecase {
  execute(dto: SimilarUserSuggesionDTO): Promise<SimilarSkillUserDTO[] | null>;
}
