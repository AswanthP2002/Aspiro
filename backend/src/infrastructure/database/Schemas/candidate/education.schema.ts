import { Schema } from "mongoose";
import Education from "../../../../domain/entities/candidate/educations";

export const EducationSchema = new Schema<Education>({
    stream:{type:String},
    level:{type:String},
    organization:{type:String},
    location:{type:String},
    isPresent:{type:Boolean},
    startYear:{type:Date},
    endYear:{type:Date || null},
    candidateId:{type:Schema.Types.ObjectId, ref:'candidates', required:true}
}, {timestamps:true})