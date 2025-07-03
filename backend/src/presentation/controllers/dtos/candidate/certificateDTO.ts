import z from 'zod'

export const CertificateSchema = z.object({
    issuedOrganization: z.string(),
    issuedDate: z.date(),
    certificateId: z.string()
})

export type certificateDTO = z.infer<typeof CertificateSchema>