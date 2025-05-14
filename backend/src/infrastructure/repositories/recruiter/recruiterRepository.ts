import Recruiter from "../../../domain/entities/recruiter/recruiter";
import { SaveRecruiter } from "../../../domain/interfaces/recruiter/createRecruiterRequest";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";
import { connectDb } from "../../database/connection";
import { ObjectId } from "mongodb";

export default class RecruiterRespository implements IRecruiterRepo{
   private collection = 'recruiter'
   
   async create(recruiter: Recruiter): Promise<SaveRecruiter> {
        const db = await connectDb()
        const result = await db.collection<Recruiter>(this.collection).insertOne(recruiter)
        return result
    }

    async findByEmail(email: string): Promise<Recruiter | null> {
        const db = await connectDb()
        const result = await db.collection<Recruiter>(this.collection).findOne({email:email})
        console.log('recruiter find request reached here, from recruiter repository side', result)
        return result
    }

    async findById(id: string): Promise<Recruiter | null> {
        const db = await connectDb()
        const result = await db.collection<Recruiter>(this.collection).findOne({_id:new ObjectId(id)})
        return result
    }

    async findByUserName(username: string): Promise<Recruiter | null> {
        const db = await connectDb()
        const result = await db.collection<Recruiter>(this.collection).findOne({username:username})
        return result
    }

    async verifyRecruiter(email: string, field: string, update: boolean): Promise<boolean> {
        const db = await connectDb()
        const result = await db.collection<Recruiter>(this.collection).updateOne(
            {email:email},
            {$set:{isVerified:update}}
        )
        if(result.matchedCount > 0) return true
        return false
    }

    async updateIntroDetails(
        id: string, 
        companyName: string, 
        about: string, 
        benefits: string, 
        companyType: string, 
        industryType: string, 
        teamStrength: string, 
        yearOfEstablishment: string, 
        website: string, 
        vision: string, 
        country: string, 
        state: string, 
        city: string, 
        mobile: string, 
        logo : string, 
        coverphoto : string): Promise<Recruiter | null> {
        const db = await connectDb()
        const result = await db.collection<Recruiter>(this.collection).findOneAndUpdate(
            {_id:new ObjectId(id)},
            {$set:{
                companyName:companyName,
                about:about,
                benefit:benefits,
                companyType:companyType,
                industry:industryType,
                teamStrength:teamStrength,
                foundIn:yearOfEstablishment,
                website:website,
                vision:vision,
                "location.country":country,
                "location.city":city,
                "location.state":state,
                phone:mobile,
                logo:logo,
                coverphoto:coverphoto
            }},
            {returnDocument:'after'}
        )
        
        return result
    }

}