import { db } from "../db/client"
import { MONTHS, calendarMonth, calendars, createId } from "../db/schema";
import type { UserPrompt } from "../lib/schemas";
import { generateConcept, generateMidjourneyImages, generatePromptFromConcept } from "../server/prompts"

export async function createCalendar(prompt: UserPrompt) {
  const concept = await generateConcept(prompt)
  if (concept === null) throw new Error("Could not generate concept")

  const calendarId = createId()
  await db.insert(calendars).values({
    id: calendarId,
    promptSubject: prompt.subject,
    promptScenery: prompt.scenery,
    promptStyle: prompt.style,
    promptComments: prompt.comments,
  })

  for (let i = 0; i < concept.length; i++) {
    const month = concept[i]!
    console.log(`Generating Midjourney prompt for month ${i+1}...`)
    const mj = await generatePromptFromConcept(month)
    if (mj === null) {
      console.log("Could not generate Midjourney prompt")
      continue
    }
    console.log("Starting job for Midjourney Images")
    const job = await generateMidjourneyImages(mj)
    if (job === null) throw new Error("Could not generate concept")

    await db.insert(calendarMonth).values({
      calendarId,
      month: MONTHS[i],

      conceptSubject: month.subject,
      conceptScenery: month.scenery,
      conceptStyle: month.style,
      conceptComments: month.comments,

      prompt: mj,

      jobId: job.id
    })
  }


  return calendarId
}