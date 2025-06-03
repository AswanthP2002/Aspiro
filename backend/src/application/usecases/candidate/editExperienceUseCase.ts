import Experience from "../../../domain/entities/candidate/experience";
import IExperienceRepo from "../../../domain/interfaces/candidate/IExperienceRepo";

interface EditableExperience {
    editableRole : string
    editableJobType : string
    editableOrganization : string
    editableIsPresent : boolean
    editableStartDate : string
    editableEndDate : string
    editableLocation : string
    editableLocationType : string
}

export default class EditExperienceUseCase {
    constructor(private _experienceRepo : IExperienceRepo){}

    async execute(experienceId : string, experience : EditableExperience) : Promise<boolean> {
        const startDate = new Date(experience.editableStartDate)
        let endDate : any = ""
        if(!experience.editableIsPresent){
            endDate = new Date(experience.editableEndDate)
        }
        const editData = {
            role:experience.editableRole,
            jobtype:experience.editableJobType,
            organization:experience.editableOrganization,
            ispresent:experience.editableIsPresent,
            startdate:startDate,
            enddate:endDate,
            location:experience.editableLocation,
            locationtype:experience.editableLocationType
        }
        const result = await this._experienceRepo.editExperience(experienceId, editData)
        return result
    }
}