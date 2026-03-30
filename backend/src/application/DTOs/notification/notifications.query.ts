export default interface NotificationsQuery {
  logedUserId: string;
  page: number;
  offSet: number;
  limit: number;
  status: boolean[];
  type: string[];
}
