// @injectable()
// export default class CreateUserUseCase implements ICreateUserUseCase {
//   constructor(
//     @inject('IUserRepository') private readonly _repo: IUserRepository,
//     @inject('IEmailService') private _emailService: IEmailService
//   ) {}

//   async execute(createUserDto: CreateUserDto): Promise<UserDto | null> {
//     //here im confused what about the validation and transformtion plainto instance etc
//   }
// }