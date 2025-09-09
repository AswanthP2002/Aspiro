import RecruiterProfileAggregated, { RecruiterProfileAggregatedDTO } from "../../DTOs/recruiter/recruiterProfileAggregatedData";

export default function mapToRecruiterAggregatedDTOFromAggregatedData(recruiterAggregatedData : RecruiterProfileAggregated) : RecruiterProfileAggregatedDTO {
    return {
        about:recruiterAggregatedData.about,
        benefit:recruiterAggregatedData.benefit,
        companyName:recruiterAggregatedData.companyName,
        companyType:recruiterAggregatedData.companyType,
        coverphoto:recruiterAggregatedData.coverphoto,
        email:recruiterAggregatedData.email,
        foundIn:recruiterAggregatedData.foundIn,
        industry:recruiterAggregatedData.industry,
        isBlocked:recruiterAggregatedData.isBlocked,
        isVerified:recruiterAggregatedData.isVerified,
        jobs:recruiterAggregatedData.jobs,
        lcoation:recruiterAggregatedData.lcoation,
        logo:recruiterAggregatedData.logo,
        otpExpiresAt:recruiterAggregatedData.otpExpiresAt,
        password:recruiterAggregatedData.password,
        phone:recruiterAggregatedData.phone,
        socialLinks:recruiterAggregatedData.socialLinks,
        teamStrength:recruiterAggregatedData.teamStrength,
        username:recruiterAggregatedData.username,
        verificationToken:recruiterAggregatedData.verificationToken,
        vision:recruiterAggregatedData.vision,
        website:recruiterAggregatedData.website,
        _id:recruiterAggregatedData._id,
        createdAt:recruiterAggregatedData.createdAt,
        updatedAt:recruiterAggregatedData.updatedAt
    }
}