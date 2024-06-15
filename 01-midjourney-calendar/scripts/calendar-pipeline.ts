

/**
 * Go from user prompt to a midjourney prompt for every month
 */

import type { UserPrompt } from "../src/lib/schemas"
import { generateConcept, generateMidjourneyImages, generatePromptFromConcept } from "../src/server/prompts"

console.log("Generating Concept from prompt...")
const prompt: UserPrompt = {
  subject: "Characters from Harry Potter",
  scenery: "Hogwarts",
  style: "Photorealistic",
  comments: "Harry Potter hanging out with his friends at Hogwarts"
}
const concept = await generateConcept(prompt)

if (concept === null) throw new Error("Could not generate concept")

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
  console.log(await job.json())
}
