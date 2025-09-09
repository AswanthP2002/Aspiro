import VerifyUserDTO from "../../../application/DTOs/candidate/verifyCandidateDTO";
import VerifyUserRequestDTO from "../../DTOs/candidate/verifyUserRequestDTO";

export default function mapToVerifyUserDTO(dto : VerifyUserRequestDTO) : VerifyUserDTO {
    return {...dto}
}