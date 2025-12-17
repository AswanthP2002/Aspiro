import z from 'zod'

export const addUserEducationSchema = z.object({
    educationStream: z.string(),
    educationLevel: z.string(),
    institution: z.string(),
    location: z.string(),
    isPresent: z.boolean(),
    startYear: z.string(),
    endYear: z.string()
})

/**
 * educationStream: { type: String },
    educationLevel: { type: String },
    institution: { type: String },
    location: { type: String },
    isPresent: { type: Boolean },
    startYear: { type: String },
    endYear: { type: String || null },
 */