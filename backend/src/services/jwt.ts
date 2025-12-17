import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || "mxplora2002"

export const generateToken = async (payload : {id : string, email : string, role : string}) => {
    //console.log('accesstoken payload', payload)
    return jwt.sign({id:payload.id, email:payload.email, role:payload.role}, secret, {expiresIn:"1h"})
}

export const generateRefreshToken = async (paylod : {id : string, email : string, role : string}) => {
    //console.log('refreshtoken payload', paylod)
    return jwt.sign({id:paylod.id, email:paylod.email, role:paylod.role}, secret, {expiresIn:'1d'})
}

export const verifyToken = async (token : string) => {
    return jwt.verify(token, secret)
}