export default interface AlertDTO {
  _id?: string;
  recipientId?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  type: 'JOB_MATCH' | 'APPLICATION_UPDATE' | 'SYSTEM_SECURITY' | 'EXPIRY';
  status: 'ACTIVE' | 'RESOLVED' | 'DISMISSED';
  title: string;
  body: string;
  actionUrl?: string;
  expiresAt?: string;
  metaData?: { [key: string]: string | boolean | number | object };
  createdAt?: string;
}

export interface CreateAlertDTO {
  recipientId: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  type: 'JOB_MATCH' | 'APPLICATION_UPDATE' | 'SYSTEM_SECURITY' | 'EXPIRY';
  status: 'ACTIVE' | 'RESOLVED' | 'DISMISSED';
  title: string;
  body: string;
  actionUrl?: string;
  expiresAt?: string;
  metaData?: { [key: string]: string | number | boolean | object };
}

export interface GetAlertsRequestDTO {
  userId: string;
  status: 'ALL' | 'ACTIVE' | 'RESOLVED' | 'DISMISSED';
  page: number;
  limit: number;
}
