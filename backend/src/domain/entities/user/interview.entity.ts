export default interface Interviews {
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


/**
 * date: null,
      time: null,
      interviewType: "",
      gmeetUrl: "",
      interviewerName: "",
      note: "",
      sendEmail: false
 */