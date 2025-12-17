export default interface CreateInterviewDTO {
    candidateId?: string
    jobId?: string
    interviewersName?: string
    interviewType?: 'Technical' | 'HR' | 'Mnaegirial' | 'General'
    interviewDate?: string | Date
    interviewTime?: string
    gmeetUrl?: string
    note?: string
    status?: "Scheduled" | "Completed" | "Cancelled"
}

export interface InterviewDTO {
    _id?: string
    candidateId?: string
    jobId?: string
    interviewersName?: string
    interviewType?: 'Technical' | 'HR' | 'Mnaegirial' | 'General'
    interviewDate?: string | Date
    interviewTime?: string
    gmeetUrl?: string
    note?: string
    status?: "Scheduled" | "Completed" | "Cancelled"
    createdAt?: string | Date
    upddatedAt?: string | Date
}