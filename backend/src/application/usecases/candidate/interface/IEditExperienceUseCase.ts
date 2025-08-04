import { EditableExperience } from "../editExperienceUseCase";

export default interface IEditExperienceUseCase {
    execute(experienceId : string, experience : EditableExperience) : Promise<boolean>
}