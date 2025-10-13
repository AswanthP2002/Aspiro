import Experience from '../../../domain/entities/candidate/experience.entity';
import IExperienceRepo from '../../../domain/interfaces/candidate/IExperienceRepo';
import { ExperienceDTO } from '../../DTOs/candidate/experience.dto';
import mapToExperienceDTO from '../../mappers/candidate/mapToExperienceDTO.mapper';
import ILoadExperiencesUseCase from './interface/IGetExperiences.usecase';

export default class GetExperienceUseCase implements ILoadExperiencesUseCase {
  constructor(private _experienceRepo: IExperienceRepo) {}

  async execute(candidateId: string): Promise<ExperienceDTO[] | null> {
    const result = await this._experienceRepo.findWithCandidateId(
      candidateId.toString()
    );
    if (result) {
      const experienceDto: ExperienceDTO[] = [];
      result.forEach((experience: Experience) => {
        experienceDto.push(mapToExperienceDTO(experience));
      });
      return experienceDto;
    }
    return null;
  }
}
