import SimilarUserSuggesionDTO from '../../../DTOs/user/similarUserSuggesion.dto';
import { SimilarSkillUserDTO } from '../../../DTOs/user/user.dto';

export interface IGetSimilarUserUsecase {
  execute(dto: SimilarUserSuggesionDTO): Promise<SimilarSkillUserDTO[] | null>;
}
