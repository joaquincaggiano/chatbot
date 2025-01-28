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

    if (messages.length === 3) {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        system:
          "You are the best title generator in the world" +
          "You should be concise and to the point" +
          "You should be able to generate a title for a chat based on the messages" +
          "The title must be in spanish",
        prompt: `Analyze the following messages and return a concise title that reflects the main topic discussed:\n\n${messages
          .map((msg: { content: string }) => msg.content)
          .join("\n")}\n\nTitle:`,
      });
      chatTitle = text;
    }

    const result = streamText({
      model: openai("gpt-4o"),
      system:
        "Eres un entrevistador" +
        "Debes preguntar para que puesto quiere aplicar y en que empresa" +
        "Debes buscar información de la empresa y el puesto" +
        "Debes hacer preguntas relacionadas con el puesto de trabajo" +
        "Sos el mejor entrevistador del mundo" +
        "Debes ser objetivo y profesional" +
        "Debes hacer preguntas técnicas y de conocimiento general" +
        "Debes hacer de a una las preguntas" +
        "Tienes que esperar que el usuario conteste la pregunta antes de hacer la siguiente" +
        "Debes seguir el hilo de la conversación" +
        "Analiza bien las respuestas del usuario y haz preguntas relacionadas con la respuesta",
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
