import LoadJobDTO, { LoadJobResDTO } from "../../../DTOs/loadJobDTO";

export default interface ILoadJobCandidateSideUseCase {
    execute(loadJobDto : LoadJobDTO) : Promise<LoadJobResDTO | null>
}