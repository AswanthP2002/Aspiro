import { CreateJobDTO } from "../../../../presentation/controllers/dtos/jobDTO";

export default interface ICreateJobUseCase {
    execute(id : string, job : CreateJobDTO) : Promise<string | null>
}