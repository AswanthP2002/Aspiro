import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";
import { RecruiterDTO } from "../../DTOs/recruiter/recruiterDTO";
import SaveIntroDetailsDTO from "../../DTOs/recruiter/saveIntroDetailsDTO";
import mapToRecruiterDtoFromRecruiter from "../../mappers/recruiter/mapToRecruiterDtoFromRecruiter";
import ISaveBasicsUseCase from "./interface/ISaveBasicsUseCase";

export default class SaveBasicsUseCase implements ISaveBasicsUseCase {
    constructor(private recruiterRepo : IRecruiterRepo){}

    async execute(saveIntroDetailsDto : SaveIntroDetailsDTO) :Promise<RecruiterDTO | null> {
        const {id, companyName, companyType, about, benefits, industryType, teamStrength, yearOfEstablishment, website, vision, country, state, city, mobile} = saveIntroDetailsDto
        const saveBasics = await this.recruiterRepo.updateIntroDetails(id, companyName, about, benefits, companyType, industryType, teamStrength, yearOfEstablishment, website, vision, country, state, city, mobile)
        
        if(saveBasics){
            const dto = mapToRecruiterDtoFromRecruiter(saveBasics)
            return dto
        }
        
        return null
    }
}