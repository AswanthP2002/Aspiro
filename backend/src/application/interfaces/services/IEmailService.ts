export default interface IEmailService {
    sendEmail(to : string, subject : string, content : string) : Promise<string | null>
}