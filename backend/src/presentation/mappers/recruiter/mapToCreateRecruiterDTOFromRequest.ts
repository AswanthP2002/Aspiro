import CreateRecruiterDTO from '../../../application/DTOs/recruiter/recruiter.dto';
import CreateRecruiterRequestDto from '../../DTOs/recruiter/createRecruiterRequestDTO';

export default function mapToCreateRecruiterDTOFromRequest(
  requestDto: CreateRecruiterRequestDto
): CreateRecruiterDTO {
  //map data based on conditions
  const {organizationDetails} = requestDto

  if(organizationDetails?.organizationName){
    return {
      userId: requestDto.userId,
      employerType: requestDto.employerType,
      organizationDetails: {
        organizationName: organizationDetails?.organizationName,
        organizationType: organizationDetails?.organizationType,
        industry: organizationDetails?.industry,
        organizationContactNumber: organizationDetails?.organizationContactNumber,
        organizationEmail: organizationDetails?.organizationEmail,
        teamStrength: organizationDetails?.teamStrength,
        aboutCompany: organizationDetails?.aboutCompany,
        website: organizationDetails?.website,
        vision: organizationDetails?.vision
      }
    }
  }else{
    return {
      userId: requestDto.userId,
      employerType: requestDto.employerType
    };
  }
}

