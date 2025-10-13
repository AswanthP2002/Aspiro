import Skills from '../../../domain/entities/candidate/skills.entity';
import ISkillRepo from '../../../domain/interfaces/candidate/ISkillRepo';
import { SkillDTO } from '../../DTOs/candidate/skill.dto';
import mapToSkillDTOFromSkills from '../../mappers/candidate/mapToSkillsFromSkillDTO.mapper';
import ILoadSkillsUseCase from './interface/IGetSkills.usecase';

export default class GetSkillsUseCase implements ILoadSkillsUseCase {
  constructor(private _skillRepo: ISkillRepo) {}

  async execute(candidateId: string): Promise<SkillDTO[] | null> {
    const result = await this._skillRepo.findWithCandidateId(
      candidateId.toString()
    );
    if (result) {
      const dto: SkillDTO[] = [];
      result.forEach((skill: Skills) => {
        dto.push(mapToSkillDTOFromSkills(skill));
      });
      return dto;
    }
    return null;
  }
}
