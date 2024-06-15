import { z } from "zod"

export const UserPromptSchema = z.object({
  subject: z.string(),
  scenery: z.string(),
  style: z.string(),
  comments: z.string()
})
export type UserPrompt = z.infer<typeof UserPromptSchema>