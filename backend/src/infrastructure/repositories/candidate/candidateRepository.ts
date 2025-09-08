import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import Candidate from "../../../domain/entities/candidate/candidates";
import { Db, ObjectId } from "mongodb";
import mongoose, { Mongoose } from "mongoose";
import { after } from "node:test";
import { SaveCandidate } from "../../../domain/interfaces/candidate/saveResponses";
import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import BaseRepository from "../baseRepository";
import SocialLinks from "../../../domain/entities/socialLinks";
import { CandidateDAO } from "../../database/DAOs/candidate/candidateDAO";
import CandidateAggregated from "../../../domain/entities/candidate/candidateAggregated";
import CandidatePaginated from "../../../domain/entities/candidate/candidatePaginated";

export default class CandidateRepository extends BaseRepository<Candidate> implements ICandidateRepo {
    constructor(){
        super(CandidateDAO) //chance for runtime error while creating experience :::
    }

    // async create(candidate: Candidate): Promise<SaveCandidate | null> {
    //     const db = await connectDb()
    //     const result = await db.collection(this._collection).insertOne(candidate)
    //     console.log('Candidate repo.ts :: ', result)
    //     console.log('Candidate repo.ts :: ', typeof result.insertedId)
    //     return result
    // }
    
    async findByEmail(email: string): Promise<Candidate | null> {
        const candidate = await CandidateDAO.findOne({email:email})
        return candidate
    }

    async findByMobileNumber(mobileNumber: string): Promise<Candidate | null> {
        return await CandidateDAO.findOne({phone:mobileNumber})
    }

    async findById(id: string): Promise<Candidate | null> {
        return await CandidateDAO.findOne({_id:new mongoose.Types.ObjectId(id)})
    }

    async findByGoogleId(googleId: string): Promise<Candidate | null> {
        return await CandidateDAO.findOne({googleid:googleId})
    }

    async findByToken(token: string): Promise<Candidate | null> {
        const candidate = await CandidateDAO.findOne({verificationToken:token})
        return candidate
    }

    async updateVerification(email : string): Promise<Candidate | null> {
        const updatedCandidate = await CandidateDAO.findOneAndUpdate({email:email}, {$set:{isVerified:true}}, {returnDocument:'after'})
        return  updatedCandidate
    }

    async updateIntroDetails(id: string, role: string, city: string, district: string, state: string, country: string, pincode: string, summary: string): Promise<Candidate | null> {
        const result = await CandidateDAO.findOneAndUpdate(
            {_id:new mongoose.Types.ObjectId(id)},
            {$set:{
                role:role,
                "location.city":city,
                "location.district":district,
                "location.state":state,
                "location.country":country,
                "location.pincode":pincode,
                about:summary
            }},
            {returnDocument:'after'}
        )

        return result

        
    }

    async editProfile(id: string, name: string, role: string, city: string, district: string, state: string, country: string, about : string): Promise<Candidate | null> {
        const doc = await CandidateDAO.findOneAndUpdate(
            {_id:new ObjectId(id)},
            {$set:{
                name:name,
                role:role,
                "location.city":city,
                "location.district":district,
                "location.state":state,
                "location.country":country,
                about:about
            }},
            {returnDocument:'after'}
        )

        return doc
    }

    async findCandidates(search : string = "", page : number = 1, limit : number = 1, sort : string = 'joined-latest', filter : any): Promise<CandidatePaginated | null> {
        const skip = (page - 1) * limit
        //const query = search ? { name: { $regex: new RegExp(search, 'i') }, isAdmin:false } : {isAdmin:false}
        const currentSort = sort
        const sortOption : any = {}
        const matchFilter : any = {isAdmin:false}

        console.log(`Filter content from the client side :: CandidateRepository.ts`, filter)


        if(search){
            matchFilter.name = {$regex:new RegExp(search, 'i')}
        }

        if(filter?.jobRole.length > 0){
            console.log('Content exist in the jobRole :: filter')
            matchFilter.role = {$in:filter?.jobRole}
        }

        if(filter?.status.length > 0) {
            console.log('Content exist in the status :: filter')
            matchFilter.isBlocked = {$in:filter?.status}
        }

        switch (sort) {
            case 'joined-latest' :
                sortOption['createdAt'] = -1
                break
            case 'joined-oldest' :
                sortOption['createdAt'] = 1 
                break
            case 'name-a-z' :
                sortOption['name'] = 1
                break
            case 'name-z-a' :
                sortOption['name'] = -1
                break
            default :
                sortOption['createdAt'] = -1 
        }

        console.log('Match query before applying', matchFilter)

        const candidates = await CandidateDAO.find(matchFilter).sort(sortOption).skip(skip).limit(limit).lean()
        const totalDocuments = await CandidateDAO.countDocuments(matchFilter)
        const totalPages = Math.ceil(totalDocuments / limit)
        return {candidates, currentPage:page, totalPages, currentSort}
    }

    async blockCandidate(id: string): Promise<boolean> {
        const result = await CandidateDAO.updateOne(
            {_id:new ObjectId(id)},
            {$set:{isBlocked:true}}
        )

        return result.acknowledged
    }

    async unblockCandidate(id: string): Promise<boolean> {
        const result = await CandidateDAO.updateOne(
            {_id:new ObjectId(id)},
            {$set:{isBlocked:false}}
        )

        return result.acknowledged
    }

    async isCandidateBlocked(id: string): Promise<boolean | undefined> {
        const result = await CandidateDAO.findOne({_id:new ObjectId(id)})
        return result?.isBlocked
    }

    async candidateAggregatedData(candidateId: string): Promise<CandidateAggregated | null> {
        
        const result = await CandidateDAO.aggregate([
            {$match:{_id:new ObjectId(candidateId)}},
            {$lookup:{
                from:'experiences',
                foreignField:'candidateId',
                localField:'_id',
                as:'experience'
            }},
            {$lookup:{
                from:'skills',
                foreignField:'candidateId',
                localField:'_id',
                as:'skills'
            }},
            {$lookup:{
                from:'educations',
                foreignField:'candidateId',
                localField:'_id',
                as:'education'
            }}
        ])

        return result[0]
    }

    async addSocialLink(candidateId: string, socialLink: SocialLinks): Promise<Candidate | null> {
        //find the domain is already exist or not
        const isExist = await CandidateDAO.findOne({
            _id:new mongoose.Types.ObjectId(candidateId),
            socialLinks:{$elemMatch:{domain:socialLink.domain}}
        })
        if(isExist) return null
        
        const updateResult = CandidateDAO.findOneAndUpdate(
            {_id:new mongoose.Types.ObjectId(candidateId)},
            {$push:{socialLinks:socialLink}},
            {returnDocument:'after'}
        )

        return updateResult
    }

    async getSocialLinks(candidateId: string): Promise<any> {
        const result = await CandidateDAO.findOne(
            {_id:new mongoose.Types.ObjectId(candidateId)}
        )

        return result ?  result.socialLinks : null
    }

    async deleteSocialLink(candidateId: string, domain: string): Promise<void> {
        const result = await CandidateDAO.updateOne(
            {_id:new mongoose.Types.ObjectId(candidateId)},
            {$pull:{socialLinks:{domain:domain}}}
        )
    }

    async uploadProfilePhoto(candidateId: string, cloudinaryUrl: string, cloudinaryPublicId: string): Promise<Candidate | null> {
        const result = await CandidateDAO.findOneAndUpdate(
            {_id:new mongoose.Types.ObjectId(candidateId)},
            {$set:{profilePicture:{cloudinarySecureUrl:cloudinaryUrl, cloudinaryPublicId:cloudinaryPublicId}}},
            {returnDocument:'after'}
        )
        return result
    }

    async removeProfilePhoto(candidateId: string): Promise<void> {
        await CandidateDAO.updateOne(
            {_id:new mongoose.Types.ObjectId(candidateId)},
            {$set:{
                profilePicture:{cloudinaryPublicId:"", cloudinarySecureUrl:""}
            }}
        )
    }

    async uploadCoverPhoto(candidateId: string, cloudinaryUrl: string, cloudinaryPublicId: string): Promise<Candidate | null> {
        const result = await CandidateDAO.findOneAndUpdate(
            {_id:new mongoose.Types.ObjectId(candidateId)},
            {$set:{
                coverPhoto:{cloudinaryPublicId:cloudinaryPublicId, cloudinarySecureUrl:cloudinaryUrl}
            }},
            {returnDocument:'after'}
        )

        return result
    }

    async removeCoverPhoto(candidateId: string): Promise<void> {
        await CandidateDAO.updateOne(
            {_id:new mongoose.Types.ObjectId(candidateId)},
            {$set:{
                coverPhoto:{cloudinaryPublicId:"", cloudinarySecureUrl:""}
            }}
        )
    }
}