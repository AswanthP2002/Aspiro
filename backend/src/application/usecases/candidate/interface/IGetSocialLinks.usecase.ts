import SocialLinks from '../../../../domain/entities/user/SocialLinks';

export default interface IGetSocialLinksUseCase {
  execute(candidateId: string): Promise<SocialLinks[] | null>;
}
