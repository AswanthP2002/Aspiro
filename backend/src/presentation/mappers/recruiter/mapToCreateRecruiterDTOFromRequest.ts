import CreateRecruiterDTO from '../../../application/DTOs/recruiter/recruiter.dto.FIX';
import { CreateRecruiterRequestDto } from '../../schemas/recruiter/createRecruiter.schema';

export default function mapToCreateRecruiterDTOFromRequest(
  requestDto: CreateRecruiterRequestDto
): CreateRecruiterDTO {
  //map data based on conditions
  // const {organizationDetails} = requestDto

  if(requestDto.employerType === 'company'){
    return {
      userId: requestDto.userId,
      employerType: requestDto.employerType,
      organizationDetails: {
        organizationName: requestDto.organizationName,
        organizationType: requestDto.organizationType,
        industry: requestDto.industry,
        organizationContactNumber: requestDto?.organizationContactNumber,
        organizationEmail: requestDto?.organizationEmail,
        teamStrength: requestDto?.teamStrength,
        website: requestDto?.website,
        linkedinUrl: requestDto.linkedinUrl
      },
      focusingIndustries:requestDto.focusingIndustries as string[],
      recruitingExperience:requestDto.recruitingExperience,
      summary:requestDto.summary
    }
  }else{
    return {
      userId: requestDto.userId,
      employerType: requestDto.employerType,
      focusingIndustries:requestDto.focusingIndustries as string[],
      recruitingExperience:requestDto.recruitingExperience,
      summary:requestDto.summary
    };
  }
}

