import OpenAI from 'openai';
import { UserPromptSchema, type UserPrompt } from '../lib/schemas';
import { CONCEPT_INSTRUCTIONS, MIDJOURNEY_INSTRUCTIONS } from '../lib/instructions';

const openai = new OpenAI({
  apiKey: Bun.env["OPENAI_API_KEY"]
});

function stringifyPrompt(prompt: UserPrompt): string {
  return `
What is the subject: ${prompt.subject}
What is the scenery: ${prompt.scenery}
What is the style: ${prompt.style}
Additional Comments: ${prompt.comments}
`.trim()
}

export async function generateConcept(prompt: UserPrompt): Promise<UserPrompt[] | null> {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: CONCEPT_INSTRUCTIONS },
      { role: "user", content: stringifyPrompt(prompt) }
    ],
    model: 'gpt-3.5-turbo',
  });

  const jsonStr = chatCompletion.choices[0]?.message.content
  if (jsonStr === null) return null

  const json = JSON.parse(jsonStr)
  const concept = UserPromptSchema.array().safeParse(json)
  if (!concept.success) return null

  return concept.data
}

export async function generatePromptFromConcept(concept: UserPrompt): Promise<string | null> {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: MIDJOURNEY_INSTRUCTIONS },
      { role: "user", content: stringifyPrompt(concept) }
    ],
    model: 'gpt-3.5-turbo',
  });

  return chatCompletion.choices[0]?.message.content
}

export async function generateMidjourneyImages(prompt: string) {
  const data = { prompt }
  return await fetch('https://cl.imagineapi.dev/items/images/', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Authorization': `Bearer ${Bun.env["IMAGINE_API_KEY"]}`,
      'Content-Type': 'application/json'
    }
  })
}