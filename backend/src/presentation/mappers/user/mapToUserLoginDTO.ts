import { UserLoginInpDTO } from "../../../application/DTOs/user/userLogin.dto";
import UserLoginRequestDTO from "../../DTOs/user/userLoginRequest.dto";


export default function mapToUserLoginDTO(requestDto : UserLoginRequestDTO) : UserLoginInpDTO {
  return {...requestDto}

}
