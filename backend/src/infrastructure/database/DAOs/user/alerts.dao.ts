import { model } from 'mongoose';
import Alert from '../../../../domain/entities/user/alerts';
import { AlertSchema } from '../../Schemas/user/alert.schema';

export const AlertsDAO = model<Alert>('alerts', AlertSchema);
