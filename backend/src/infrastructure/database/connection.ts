import { MongoClient, Db } from "mongodb";
import mongoose from "mongoose";
import logger from "../../utilities/logger";

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017"
const dbName = process.env.DB_NAME || "aspiro"
const databaseuri = `${mongoUri}/${dbName}`


// let db : Db

// export const connectDb = async () : Promise<Db> => {
//     if(db) return db
//     const client = new MongoClient(mongoUri)
//     await client.connect()
//     db = client.db(dbName)
//     console.log(`Successfully connected to database db:${dbName}`)

//     return db
// }

const connectToDb = async () : Promise<void> => {
    try {
        await mongoose.connect(databaseuri)
        logger.info(`Database ${dbName} connedted`)

        mongoose.connection.on("disconnected", () => {
            logger.warn({}, "Database disconnected")
        })

        mongoose.connection.on("reconnected", () => {
            logger.info(`Database reconnected`)
        })
    } catch (error : unknown) {
        console.log('Error occured while connecting to the database', error)
    }
}

export default connectToDb