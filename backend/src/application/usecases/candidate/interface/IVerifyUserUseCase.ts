import VerifyUserDTO from "../../../DTOs/candidate/verifyCandidateDTO";

export default interface IVerifyUserUseCase {
    execute(verifyUser : VerifyUserDTO) : Promise<void>
}