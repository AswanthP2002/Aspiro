import { model, Schema } from 'mongoose';
import WorkMode from '../../../../domain/entities/admin/workMode.entity';

export const WorkModeSchema = new Schema<WorkMode>({
  name: { type: String, require: true },
  slug: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});


export const workModeDAO = model<WorkMode>('workmode', WorkModeSchema)