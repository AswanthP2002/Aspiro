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
  metaData?: { [key: string]: any };
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
  metaData?: { [key: string]: any };
}
