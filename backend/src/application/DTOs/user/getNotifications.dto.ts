export default interface GetNotificationsDTO {
  logedUserId: string;
  page: number;
  type: string;
  status: string;
  offSet: number;
  limit: number;
}
