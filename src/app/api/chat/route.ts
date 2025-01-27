import { createChat, updateChatTitle } from "@/actions/chat";
import { openai } from "@ai-sdk/openai";
import { Role } from "@prisma/client";
import { prisma } from "@prisma/db";
import { streamText, generateText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, chatId, userMessage, userId } = await req.json();

    let chatTitle: string | null = null;
    let idChat = chatId;

    if (!chatId) {
      const { id } = await createChat(userId);
      idChat = id;
    }

    if (messages.length === 1) {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        system:
          "You are the best title generator in the world" +
          "You should be concise and to the point" +
          "You should be able to generate a title for a chat based on the messages",
        prompt: `Analyze the following messages and return a concise title that reflects the main topic discussed:\n\n${messages
          .map((msg: { content: string }) => msg.content)
          .join("\n")}\n\nTitle:`,
      });
      chatTitle = text;
    }

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
            chatId: idChat,
          };
        });

        await prisma.message.createMany({
          data: messagesToCreate,
        });

        if (chatTitle) {
          await updateChatTitle(idChat, chatTitle);
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat API: ", error);
    return new Response("Error", { status: 500 });
  }
}
