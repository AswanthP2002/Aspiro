import JobAggregatedData from '../../../domain/entities/job/jobAggregatedData.entity';
import { JobAggregatedDTO } from '../../DTOs/job/jobAggregated.dto';

export default function mapJobAggregatedDataToDTO(data: JobAggregatedData): JobAggregatedDTO {
  return {
    ...data,
  };
}
