import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    // system:
    //   "You are an interviewer of the company looking for developers" +
    //   "You should ask questions related to the level they have in programming" +
    //   "You should ask questions related to the technologies that we are looking for" +
    //   "You should ask questions related to the projects they have worked on" +
    //   "You should ask how they would see themselves in the company" +
    //   "You should ask what they expect from the company" +
    //   "Be professional, objective and concise.",
    messages,
  });

  return result.toDataStreamResponse();
}
