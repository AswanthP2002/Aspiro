import RecruiterProfileAggregated, {
  RecruiterProfileAggregatedDTO,
} from '../../DTOs/recruiter/recruiterProfileAggregatedData.dto';

export default function mapToRecruiterAggregatedDTOFromAggregatedData(
  recruiterAggregatedData: RecruiterProfileAggregated
): RecruiterProfileAggregatedDTO {
  return {
    ...recruiterAggregatedData,
  };
}
