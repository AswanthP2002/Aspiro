import SocialLinks from '../../../domain/entities/SocialLinks';
import ICandidateRepo from '../../../domain/interfaces/user/ICandidateRepo.GARBAGE';
import IGetSocialLinksUseCase from './interface/IGetSocialLinks.usecase';

export default class GetSocialLinksUseCase implements IGetSocialLinksUseCase {
  constructor(private _ICandidateRepo: ICandidateRepo) {}

  async execute(candidateId: string): Promise<SocialLinks[] | null> {
    const result = await this._ICandidateRepo.getSocialLinks(candidateId);
    return result;
  }
}
