export interface SkillDTO {
    _id? : string
    type : string
    skill : string
    level : string
    candidateId? : string
    createdAt? : Date
    updatedAt? : Date
}

export interface CreateSkillDTO {
    type : string
    skill : string
    level : string
    candidateId  : string
}