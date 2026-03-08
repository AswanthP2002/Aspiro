export default interface Alert {
  _id?: string;
  recipientId?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'ACTIVE' | 'RESOLVED' | 'DISMISSED';
  type: 'JOB_MATCH' | 'APPLICATION_UPDATE' | 'SYSTEM_SECURITY' | 'EXPIRY';
  title: string;
  body: string;
  actionUrl?: string;
  expiresAt?: string;
  metaData?: { [key: string]: string | number | boolean };
  createdAt?: string;
}
