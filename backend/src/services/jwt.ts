import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || "mxplora2002"

export const generateToken = async (payload : object) => {
    return jwt.sign(payload, secret, {expiresIn:"1h"})
}

export const generateRefreshToken = async (paylod : object) => {
    return jwt.sign(paylod, secret, {expiresIn:'1d'})
}

export const verifyToken = async (token : string) => {
    return jwt.verify(token, secret)
}