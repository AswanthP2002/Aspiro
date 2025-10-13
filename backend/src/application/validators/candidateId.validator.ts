import zod from 'zod'

export const CandidateIdValidator = zod.object({
    candidateId : zod.string().length(24).regex(/^[a-f\d]{24}$/i, {
        message:'Invalid candidate id format'
    })
})