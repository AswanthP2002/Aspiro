export default interface IDataHashService {
    hashData(data: string, saltRound: number): Promise<string>
    compareHashedValue(data: string, hashedValue: string): Promise<boolean>
}