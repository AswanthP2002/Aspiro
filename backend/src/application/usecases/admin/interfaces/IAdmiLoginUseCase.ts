import AdminLoginResDTO, { AdminLoginDTO } from "../../../DTOs/admin/adminLoginResDTO";

export default interface IAdminLoginUseCase {
    execute(adminLoginDto : AdminLoginDTO) : Promise<AdminLoginResDTO>
}