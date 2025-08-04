import Candidate from "../../../../domain/entities/candidate/candidates";

export default interface IEditProfileUseCase {
    execute(id : string, name : string, role : string, city : string, district : string, state : string, country : string, about : string) : Promise<Candidate | null>
}