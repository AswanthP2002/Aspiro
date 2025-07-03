import Resume from "../../entities/candidate/resume";

export default interface IResumeRepo {
    addResume(resume : Resume) : Promise<boolean>
    loadResumes(candidateId : string) : Promise<Resume[] | null>
    deleteResume(resumeId : string) : Promise<boolean>
}