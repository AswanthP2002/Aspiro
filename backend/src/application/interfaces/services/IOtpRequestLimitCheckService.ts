

export default interface IOtpRequestLimitCheckService {
    isAllowToResend(email : string, id : string) : Promise<boolean>
}