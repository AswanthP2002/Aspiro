//Test simulation for class dto replacing interface dto

import { IsDefined, IsEmail, MaxLength, MinLength } from "class-validator"

//entity
interface User {
    name: string
    age: number
    mobile: string
    email: string
}

//dtos
class CreateUserDTO {
    @IsDefined({message:'Value canot be undefined'})
    public name: string

    @IsDefined({message:'Value can not be undefined'})
    public age: number

    @IsDefined({message:'Value can not be undefined'})
    @MinLength(10, {message:'Minimum 10 digits'})
    @MaxLength(10, {message:'Maximum 10 digits'})
    public mobile: string

    @IsDefined({message: 'Value can not be undefined'})
    @IsEmail({}, {message:'Email field must be a valid email'})
    public email: string

    constructor(value: CreateUserDTO){
        this.name = value.name
        this.age  = value.age
        this.mobile = value.mobile
        this.email = value.email
    }
}

//mappers
class UserMapper {
    public mapToUserEntity(dto: CreateUserDTO): User {
        return {
           name: dto.name,
           age: dto.age,
           mobile: dto.mobile,
           email: dto.email
        }
    }

    public mapToUserDto(entity: User): CreateUserDTO {
        return {
            name: entity.name,
            age: entity.age,
            mobile: entity.mobile,
            email: entity.email
        }
    }
}

//usecase interface
interface ICreateUser {
    execute(data: CreateUserDTO): CreateUserDTO
}

//usecase implementation
class CreateUserUsecase implements ICreateUser {
    execute(data: CreateUserDTO): CreateUserDTO {
        console.log('--checking data form the usecase--', data)
        //map data to entity
        const mapper = new UserMapper()
        const newUser = mapper.mapToUserEntity(data)
        //logic for db
        const testData: User = {
            name: 'Aswanth',
            age:23,
            mobile: "6235223484",
            email:'aswanth.prathayoth@gmail.com'

        }

        //return data to user
        //map data to dto
        const dto = mapper.mapToUserDto(testData)
        return dto
    }
}


function main(){
    try {
        const createUserUsecase = new CreateUserUsecase()

        //calling usecase
        const body = {
            
        }
        const result = createUserUsecase.execute(body as CreateUserDTO)
        console.log('User Created',result)
    } catch (error: unknown) {
        console.log('--error occured--', error instanceof Error ? error.message : error)
    }


}

main()
