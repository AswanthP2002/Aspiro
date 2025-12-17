import { inject, injectable } from "tsyringe";
import IGetRecruiterApplicationsUsecase from "../../interfaces/usecases/admin/IGetRecruiterApplications.usecase";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";
import LoadRecruiterApplicationDTO from "../../DTOs/admin/loadRecruiterApplication.dto";
import RecruiterProfilelOverviewDataDTO from "../../DTOs/recruiter/recruiterProfileOverviewData.dto";
import RecruiterProfileOverviewData from "../../../domain/entities/recruiter/recruiterProfilveOverviewData";
import mapProfileOverviewDataToDTO from "../../mappers/recruiter/mapProfileOvervieDataToDTO.mapper";

@injectable()
export default class GetRecruiterApplicationsUsecase implements IGetRecruiterApplicationsUsecase {
    constructor(
        @inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo
    ) {}

    async execute(loadRecruiterApplicationsDto: LoadRecruiterApplicationDTO): Promise<RecruiterProfilelOverviewDataDTO[] | null> {
        const {search, profileStatus} = loadRecruiterApplicationsDto

        console.log('--checking query from the usecase--', profileStatus)
        let updatedProfileStatus: string[] = []

        switch(profileStatus){
            case 'All':
                updatedProfileStatus = ['pending','approved','rejected']
                break
            case 'Pending':
                updatedProfileStatus = ['pending']
                break
            case 'Approved':
                updatedProfileStatus = ['approved']
                break
            case 'Rejected':
                updatedProfileStatus = ['rejected']
                break
            default :
                updatedProfileStatus = ['pending','approved','rejected']
                break
        }

        const recruiterData = await this._recruiterRepo.getAppliedRecruitersData({search, profileStatus:updatedProfileStatus})

        if(recruiterData){
            const dto: RecruiterProfilelOverviewDataDTO[] = []
            recruiterData.forEach((recruiter: RecruiterProfileOverviewData) => {
                dto.push(mapProfileOverviewDataToDTO(recruiter))
            })

            return dto
        }

        return null
    }
}