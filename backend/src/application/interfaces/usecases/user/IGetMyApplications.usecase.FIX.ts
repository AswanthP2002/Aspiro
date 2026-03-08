import { LoadMyApplicationsDTO, MyApplicationsListDTO } from '../../../DTOs/job/myApplications.dto';

export default interface IGetMyApplicationsUsecase {
  execute(dto: LoadMyApplicationsDTO): Promise<{
    applications: MyApplicationsListDTO[];
    totalPages: number;
    totalDocs: number;
  } | null>;
}
