import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";

export default class SaveBasics {
    constructor(private recruiterRepo : IRecruiterRepo){}

    async execute(
        id : string,
        companyName : string,
        about : string,
        benefits : string,
        companyType : string,
        industryType : string,
        teamStrength : string,
        yearOfEstablishment : string,
        website : string,
        vision : string,
        country : string,
        state : string,
        city : string,
        mobile : string,
        logo : string,
        coverphoto : string
    ) :Promise<boolean> {
        const saveBasics = await this.recruiterRepo.updateIntroDetails(id, companyName, about, benefits, companyType, industryType, teamStrength, yearOfEstablishment, website, vision, country, state, city, mobile, logo, coverphoto)
        if(!saveBasics) throw new Error('Recruiter Not Updated')
        
        return true
    }
}