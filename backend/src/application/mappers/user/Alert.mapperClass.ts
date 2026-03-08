import Alert from '../../../domain/entities/user/alerts';
import AlertDTO, { CreateAlertDTO } from '../../DTOs/user/alerts.dto';

export default class AlertMapper {
  public createAlertDtoToAlert(dto: CreateAlertDTO): Alert {
    return {
      recipientId: dto.recipientId,
      title: dto.title,
      body: dto.body,
      priority: dto.priority,
      status: dto.status,
      type: dto.type,
      actionUrl: dto.actionUrl,
      expiresAt: dto.expiresAt,
    };
  }

  public AlertToAlertDto(alert: Alert): AlertDTO {
    return {
      _id: alert._id,
      recipientId: alert.recipientId,
      title: alert.title,
      body: alert.body,
      status: alert.status,
      type: alert.type,
      priority: alert.priority,
      actionUrl: alert.actionUrl,
      expiresAt: alert.expiresAt,
      metaData: alert.metaData,
      createdAt: alert.createdAt,
    };
  }
}
