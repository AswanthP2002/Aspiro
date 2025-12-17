import JobAggregatedData from "../../../domain/entities/user/jobAggregated.entity";
import { JobAggregatedDTO } from "../../DTOs/user/jobAggregated.dto";

export default function mapJobAggregatedDataToDTO(data: JobAggregatedData): JobAggregatedDTO {
    return {
        ...data
    }
}