import SocialLinks from '../../../domain/entities/SocialLinks';
import ICandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';
import CandidateDTO from '../../DTOs/candidate/candidate.dto';
import AddSocialLinkDTO from '../../DTOs/candidate/socialLink.dto';
import mapToCandidateDTO from '../../mappers/user/mapToCandidateDTO.mapper';
import IAddSocialLinkUsecase from './interface/IAddSocialLink.usecase';

export default class AddSocialLinkUseCase implements IAddSocialLinkUsecase {
  constructor(private _ICandidateRepo: ICandidateRepo) {}
  async execute(
    addSocialLinkDto: AddSocialLinkDTO
  ): Promise<CandidateDTO | null> {
    const { candidateId } = addSocialLinkDto;
    const saveLink: SocialLinks = {
      domain: addSocialLinkDto.domain,
      url: addSocialLinkDto.url,
    };

    const result = await this._ICandidateRepo.addSocialLink(
      candidateId?.toString(),
      saveLink
    );

    if (result) {
      const dto = mapToCandidateDTO(result);
      return result;
    }
    return result;
  }
}
