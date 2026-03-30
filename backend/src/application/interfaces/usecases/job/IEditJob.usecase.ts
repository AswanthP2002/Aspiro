import { EditJobDTO, JobDTO } from '../../../DTOs/job/createJob.dto';

export default interface IEditJobUsecase {
  execute(editJobDto: EditJobDTO): Promise<JobDTO | null>;
}
