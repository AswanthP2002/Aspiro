import Experience from "../../../../domain/entities/candidate/experience";

export default interface IAddExperience {
    execute(experience : Experience, candidateId : string) : Promise<string | null>
}