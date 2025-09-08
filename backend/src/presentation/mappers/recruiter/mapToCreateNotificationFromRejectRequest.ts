import CreateNotificationDTO from "../../../application/DTOs/notificationsDTO";
import RejectJobApplicationRequestDTO from "../../DTOs/recruiter/rejectJobApplicationRequestDTO";

export default function mapToCreateNotificationFromRejectRequest(requestDto : RejectJobApplicationRequestDTO) : CreateNotificationDTO{
    return {
        senderId:requestDto.rejector,
        receiverId:requestDto.rejectee,
        title:requestDto.title,
        description:requestDto.message,
        type:requestDto.type,
        typeRelatedId:requestDto.relatedId
    }
}