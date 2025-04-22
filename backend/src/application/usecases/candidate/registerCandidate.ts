import Candidate from "../../../domain/entities/candidate/candidates";
import CandidateRepo from "../../../domain/interfaces/candidate/candidateRepo";
import bcrypt from 'bcrypt'

export default class RegisterCandidate {
    constructor(private candidateRep : CandidateRepo){}
    
    async execute(candidate : Candidate) : Promise<string>{
        //check if email id already exist
        const existingEmail = await this.candidateRep.findByEmail(candidate.email)
        if(existingEmail) throw new Error('duplicate email')
        
        //check if username is already taken
        const existingUsername = await this.candidateRep.findByUsername(candidate.username)
        if(existingUsername) throw  new Error('duplicate username')

        const hashedPassword = await bcrypt.hash(candidate.password, 10)

        candidate.password = hashedPassword
        
        candidate.about = ""
        candidate.certificates = []
        candidate.coverPhoto = ""
        candidate.currentSubscription = ""
        candidate.education = []
        candidate.experience = []
        candidate.favorites = []
        candidate.isBlocked = false
        candidate.location = {
            city:"",
            district:"",
            state:"",
            pincode:"",
            country:""
        }
        candidate.profilePicture = ""
        candidate.resume = []
        candidate.socialLinks = []

        const createdCandidate = await this.candidateRep.create(candidate)
        return createdCandidate
    }
}