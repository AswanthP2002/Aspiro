export default interface CreateCandidateDTO {
    // _id? : string create candidate dto does not know about id
    name : string
    // username : string currently username removed from the project only rely on email and password
    password : string
    // role : string at the time of account creating role will not included
    phone : string
    email : string
    googleid? : string
    facebookid? : string
    // experience : Experience[] this will not included at the time of account creation
    // education : Education[] this will not included at the time of account creation
    // location : {
    //     city : string,
    //     district : string,
    //     state : string,
    //     pincode : string
    //     country : string
    // } this will not included at the time of account creation
    // profilePicture : {
    //     cloudinaryPublicId : string,
    //     cloudinarySecureUrl : string
    // } this will not included at the time of account creation
    // coverPhoto : {
    //     cloudinaryPublicId : string,
    //     cloudinarySecureUrl : string
    // } this will not included at the time of account creation
    // favorites : Favorites[]
    // resume : Resume[]
    // certificates : Certificates[]
    // about : string
    // dateOfBirth? : Date
    // isBlocked : boolean
    // socialLinks : SocialLinks[]
    // currentSubscription : string
    // isVerified:boolean
    // isAdmin : boolean
    // verificationToken:string
    // otpExpiresAt?:Date,
    // createdAt:Date,
    // updatedAt:Date
}