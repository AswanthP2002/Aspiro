import { MongoClient, Db } from "mongodb";

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017"
const dbName = process.env.DB_NAME || "aspiro"

let db : Db

export const connectDb = async () : Promise<Db> => {
    if(db) return db
    const client = new MongoClient(mongoUri)
    await client.connect()
    db = client.db(dbName)
    console.log(`Successfully connected to database db:${dbName}`)

    return db
}