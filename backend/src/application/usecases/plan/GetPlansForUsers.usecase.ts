import { inject, injectable } from 'tsyringe';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import { PlanMapper } from '../../mappers/plan/plan.mapperClass';
import { PlanDTO } from '../../DTOs/plan/plan.dto';
import { Plan } from '../../../domain/entities/plan/plan.entity';
import IGetPlansForUserUsecase from '../../interfaces/usecases/plan/IGetPlansForUsers.use ase';

@injectable()
export default class GetPlansForUsersUsecase implements IGetPlansForUserUsecase {
  constructor(
    @inject('IPlanRepository') private _repo: IPlanRepository,
    @inject('PlanMapper') private _mapper: PlanMapper
  ) {}

  async execute(): Promise<PlanDTO[] | null> {
    const result = await this._repo.findVisiblePlans();
    if (result) {
      const dto: PlanDTO[] = [];
      result.forEach((data: Plan) => dto.push(this._mapper.planEntityToPlanDTO(data)));

      return dto;
    }

    return null;
  }
}
