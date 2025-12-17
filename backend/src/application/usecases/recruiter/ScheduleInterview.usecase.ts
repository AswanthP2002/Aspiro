import { inject, injectable } from "tsyringe";
import IScheduleInterviewUsecase from "../../interfaces/usecases/recruiter/IScheduleInterview.usecase";
import InterviewRepository from "../../../infrastructure/repositories/user/interviewRepository";
import IEmailService from "../../interfaces/services/IEmailService";
import CreateInterviewDTO, { InterviewDTO } from "../../DTOs/user/interview.dto";
import Interviews from "../../../domain/entities/user/interview.entity";
import IUserRepository from "../../../domain/interfaces/IUserRepo";
import { resolveObjectURL } from "buffer";


@injectable()
export default class ScheduleInterviewUsecase implements IScheduleInterviewUsecase {
    constructor(
        @inject('IInterviewRepository') private _repo: InterviewRepository,
        @inject('IEmailService') private _emailService: IEmailService,
        @inject('IUserRepository') private _userRepo: IUserRepository
    ){}

    async execute(interviewData: CreateInterviewDTO): Promise<InterviewDTO | null> {
        try {
            const interviewSchedule = await this._repo.create(interviewData as Interviews)

            if(interviewSchedule){
                const user = await this._userRepo.findById(interviewData.candidateId as string)

                if(user){
                    const subject = 'Interview Scheduled'
                    const body = `
                        <p style="color: #555; font-size: 14px;"> Hello <strong>${user.name}</strong>, </p> 
                        <p style="color: #555; font-size: 14px;"> Your interview has been successfully scheduled. Below are the details: </p> 
                        <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse: collapse; font-size: 14px; color: #444;"> 
                        <tr> 
                        <td style="border: 1px solid #ddd;"><strong>Interview Type</strong></td> 
                        <td style="border: 1px solid #ddd;">${interviewData.interviewType}</td> 
                        </tr> 
                        <tr> 
                        <td style="border: 1px solid #ddd;"><strong>Date</strong></td>
                         <td style="border: 1px solid #ddd;">${interviewData.interviewDate}</td> 
                         </tr> 
                         <tr> 
                         <td style="border: 1px solid #ddd;"><strong>Time</strong></td> 
                         <td style="border: 1px solid #ddd;">${interviewData.interviewTime}</td>
                          </tr> 
                          <tr> 
                          <td style="border: 1px solid #ddd;"><strong>Interviewer</strong></td> 
                          <td style="border: 1px solid #ddd;">${interviewData.interviewersName}</td> 
                          </tr> 
                          <tr> 
                          <td style="border: 1px solid #ddd;"><strong>Meeting Link</strong></td> 
                          <td style="border: 1px solid #ddd;"> <a href="${interviewData.gmeetUrl}" style="color: #1a73e8;">Join Meeting</a> </td> 
                          </tr> </table> <p style="margin-top: 15px; color: #555; font-size: 14px;"> <strong>Note:</strong> {{note}} </p> <p style="margin-top: 15px; color: #555; font-size: 14px;"> Please make sure to join the meeting on time. We wish you all the best. </p> <p style="margin-top: 25px; color: #555; font-size: 14px;"> Regards,<br /> <strong>{{companyName}}</strong> </p> </td> 
                          </tr> 
                          </table>
                    `
                    await this._emailService.sendEmail(user._id as string, subject, body)
                }

                const dto = interviewSchedule as InterviewDTO
                return dto
                
            }
            return null
        } catch (error: unknown) {
            throw error
        }
    }
}