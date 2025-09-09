import SocialLinks from "../socialLinks"
import Certificates from "./certificates"
import Education from "./educations"
import Experience from "./experience"
import FavoriteJobs from "./favoriteJobs"
import Resume from "./resume"
import Skills from "./skills"
export default interface CandidateAggregated {
    _id : string
    name : string
    email : string
    phone : string
  password : string
  about : string
  certificates : Certificates[]
  coverPhoto: {
    cloudinaryPublicId : string
    cloudinarySecureUrl : string
  },
  currentSubscription : string
  education : Education[]
  experience : Experience
  favorites : FavoriteJobs[]
  role : string
  isBlocked : boolean
  location: {
    city : string
    district : string
    state : string
    pincode : string
    country : string
  },
  profilePicture: {
    cloudinaryPublicId : string
    cloudinarySecureUrl : string
  },
  resume : Resume[]
  socialLinks : SocialLinks[]
  isVerified : boolean
  verificationToken : string
  isAdmin : boolean
  otpExpiresAt : Date
  googleid : string
  facebookid : string
  skills : Skills[]
}

// {
//   "_id": {
//     "$oid": "682b297b485c59bd1ea857c5"
//   },
//   "name": "Aswanth P",
//   "username": "aswanth_leo",
//   "email": "aswanthachu3456@gmail.com",
//   "phone": "6235223484",
//   "password": "$2b$10$EFtcujOH.kxckcj13TKmpOSmAaj6Lno8HasgIk65VZgpjqD6I3Ne2",
//   "about": "",
//   "certificates": [],
//   "coverPhoto": {
//     "cloudinaryPublicId": "",
//     "cloudinarySecureUrl": ""
//   },
//   "currentSubscription": "",
//   "education": [],
//   "experience": [],
//   "favorites": [],
//   "role": "",
//   "isBlocked": false,
//   "location": {
//     "city": "",
//     "district": "",
//     "state": "",
//     "pincode": "",
//     "country": ""
//   },
//   "profilePicture": {
//     "cloudinaryPublicId": "",
//     "cloudinarySecureUrl": ""
//   },
//   "resume": [],
//   "socialLinks": [],
//   "isVerified": true,
//   "verificationToken": "437144",
//   "isAdmin": true,
//   "otpExpiresAt": {
//     "$date": "2025-05-19T12:54:05.691Z"
//   },
//   "googleid": "",
//   "skills": []
// }