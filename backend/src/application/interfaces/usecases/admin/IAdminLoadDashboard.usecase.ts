import AdminDashboardData from '../../../../domain/entities/admin/DashboardData.entity';

export default interface IAdminLoadDashboardDataUsecase {
  execute(): Promise<AdminDashboardData | null>;
}
