export default interface AdminLoginResDTO {
    token : string
    refreshToken : string
    admin:{
        id:any, 
        email:string
    }
}

export interface AdminLoginDTO {
    email : string
    password : string
}