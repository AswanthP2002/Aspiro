export interface SkillDTO {
    _id? : string
    skillType : string
    skill : string
    skillLevel : string
    userId? : string
    createdAt? : Date
    updatedAt? : Date
}

export interface CreateSkillDTO {
    skillType : string
    skill : string
    skillLevel : string
    userId  : string
}