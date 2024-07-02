import { z } from "zod"

export const UserPromptSchema = z.object({
  subject: z.string(),
  scenery: z.string(),
  style: z.string(),
  comments: z.string()
})
export type UserPrompt = z.infer<typeof UserPromptSchema>

export const ImagineAPIJobSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  results: z.string().nullish(),
  user_created: z.string(),
  date_created: z.string(),
  status: z.enum(["pending", "in-progress", "completed", "failed"]),
  progress: z.number().nullish(),
  url: z.string().nullish(),
  error: z.string().nullish(),
  upscaled_urls: z.string().array().nullish(),
  upscaled: z.string().array(),
  ref: z.string().nullish(),
})
export type ImagineAPIJob = z.infer<typeof ImagineAPIJobSchema>