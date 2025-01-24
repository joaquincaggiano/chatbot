import { openai } from "@ai-sdk/openai";
import { Role } from "@prisma/client";
import { prisma } from "@prisma/db";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, chatId, userMessage } = await req.json();
    console.log("MESSAGES: ", messages);

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
      async onFinish({ response }) {
        const moreMessages = response.messages.map((message) => {
          const content = message.content[0];
          return {
            role: message.role as Role,
            content:
              typeof content === "string"
                ? content
                : "text" in content
                ? content.text
                : "",
          };
        });
        const messagesToCreate = [
          { role: "user", content: userMessage },
          ...moreMessages,
        ].map((message) => {
          return {
            role: message.role as Role,
            content: message.content,
            chatId: chatId,
          };
        });

        await prisma.message.createMany({
          data: messagesToCreate,
        });
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat API: ", error);
    return new Response("Error", { status: 500 });
  }
}
