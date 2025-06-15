import Education from "../../entities/candidate/educations";

export default interface IEducationRepo {
    addEducation(education : Education) : Promise<boolean>
    getEducations(candidateID : string) : Promise<Education[]>
    deleteEducation(educationId : string) : Promise<boolean>
    editEducation(educationId : string, education : Education) : Promise<boolean>
}