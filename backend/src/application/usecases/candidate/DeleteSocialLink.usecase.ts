import ICandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';
import { RemoveSocialLinkDTO } from '../../DTOs/candidate/socialLink.dto';
import IDeleteSocialLinkUseCase from './interface/IDeleteSocialLink.usecase';

export default class DeleteSocialLinkUseCase
  implements IDeleteSocialLinkUseCase
{
  constructor(private _ICandiateRepo: ICandidateRepo) {}

  async execute(removeSocialLinkDto: RemoveSocialLinkDTO): Promise<void> {
    const { candidateId, domain } = removeSocialLinkDto;
    await this._ICandiateRepo.deleteSocialLink(candidateId, domain);
  }
}
