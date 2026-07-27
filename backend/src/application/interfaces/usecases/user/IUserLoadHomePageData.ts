import HomePageDataDTO from '../../../DTOs/user/homePageData.dto';

export default interface IUserLoadHomePageDatasUsecase {
  execute(): Promise<HomePageDataDTO | null>;
}
