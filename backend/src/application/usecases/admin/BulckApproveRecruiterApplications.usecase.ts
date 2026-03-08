import { inject, injectable } from 'tsyringe';
import IBulckApproveRecruiterApplicationUsecase from '../../interfaces/usecases/admin/IBulckApproveRecruiterApplication.usecase';
import RecruiterMapper from '../../mappers/recruiter/Recruiter.mapperClass';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';

@injectable()
export default class BulckApproveRecruiterApplicationsUSecase implements IBulckApproveRecruiterApplicationUsecase {
  private _mapper: RecruiterMapper;

  constructor(@inject('IRecruiterRepository') private _repo: IRecruiterRepo) {
    this._mapper = new RecruiterMapper();
  }

  async execute(): Promise<RecruiterDTO[] | null> {
   // const result = await this._repo.bulkbulckUpdate();

    // if (result) {
    //   const dto: RecruiterDTO[] = [];
    //   result.forEach((recruiter: Recruiter) => {
    //     dto.push(this._mapper.recruiterToRecruiterDTO(recruiter));
    //   });

    //   return dto;
    // }

    return null;
  }
}
