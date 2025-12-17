import mongoose, {ObjectId} from "mongoose"

export interface SaveCandidate {
    acknowledged : boolean
    insertedId : object
}

export interface SaveExperience {
    acknowledged : boolean
    insertedId : object

}