import RecruiterProfileOverviewData from '../../../domain/entities/recruiter/recruiterProfilveOverviewData';
import RecruiterProfilelOverviewDataDTO from '../../DTOs/recruiter/recruiterProfileOverviewData.dto.FIX';

export default function mapProfileOverviewDataToDTO(
  overviewData: RecruiterProfileOverviewData
): RecruiterProfilelOverviewDataDTO {
  return {
    ...overviewData
  };
}
