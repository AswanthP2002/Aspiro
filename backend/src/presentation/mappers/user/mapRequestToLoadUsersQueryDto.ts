import LoadUsersQueryDTO from "../../../application/DTOs/admin/loadUsersAdminside.dto.FIX";
import LoadUsersQueryRequestDTO from "../../DTOs/user/loadUsersRequest.dto";

export default function mapRequestToLoadUsersQueryDto(requestDto : LoadUsersQueryRequestDTO) : LoadUsersQueryDTO {
    return {...requestDto}
}