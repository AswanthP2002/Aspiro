import { injectable } from "tsyringe";
import IDataHashService from "../../application/interfaces/services/IDataHashService";
import bcrypt from 'bcrypt'

@injectable()
export default class DataHashService implements IDataHashService {
    async hashData(data: string, saltRound: number = 10): Promise<string> {
        const hashedValue = await bcrypt.hash(data, saltRound)
        return hashedValue
    }

    async compareHashedValue(data: string, hashedValue: string): Promise<boolean> {
        const result = await bcrypt.compare(data, hashedValue)
        return result
    }
}