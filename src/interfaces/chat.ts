import { Chat, Message } from "@prisma/client";

export interface ChatWithMessages extends Chat {
  messages: Message[];
}
