import Skills from "../../entities/candidate/skills";

export default interface ISkillRepo {
    saveSkill(skill : Skills) : Promise<boolean>
    getSkills(candidateId : string) : Promise<Skills[]>
    deleteSkill(skillId : string) : Promise<boolean>
}