"use client";

import { useChat } from "ai/react";
import { ChatWithMessages } from "@/interfaces/chat";
import OpenAISvg from "@/components/icons/OpenAISvg";
import SendSvg from "@/components/icons/SendSvg";
import StopSvg from "@/components/icons/StopSvg";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";

interface Props {
  chat?: ChatWithMessages;
  userId: string;
}

export default function ChatComponent({ chat, userId }: Props) {
  const { messages, input, isLoading, stop, handleInputChange, handleSubmit } =
    useChat({
      initialMessages: chat?.messages || [],
    });

  return (
    <div className="flex flex-col w-full max-w-2xl pt-10 pb-36 mx-auto stretch">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-center gap-5 mb-10 ${
              m.role === "user" && "self-end"
            }`}
          >
            {m.role !== "user" && (
              <div className="flex items-center justify-center p-2 rounded-full border border-[#2f2f2f]">
                <OpenAISvg width={24} height={24} color="#ffffff" />
              </div>
            )}
            <div
              className={`text-base font-medium w-full ${
                m.role === "user"
                  ? "px-5 pt-3 bg-[#2f2f2f] rounded-[24px] max-w-xl"
                  : "bg-transparent"
              }`}
            >
              <MarkdownRenderer content={m.content} />
            </div>
          </div>
        ))}


      <form
        onSubmit={(event) => {
          handleSubmit(event, {
            body: {
              chatId: chat?.id || undefined,
              userId: userId,
              userMessage: input,
            },
          });
        }}
        className="w-full max-w-2xl flex gap-2 fixed bottom-0 mb-10"
      >
        <div className="w-full p-5 bg-[#2f2f2f] border-none rounded-[24px] flex">
          <textarea
            value={input}
            placeholder="Escribe tu mensaje..."
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e, {
                  body: {
                    chatId: chat?.id || undefined,
                    userId: userId,
                    userMessage: input,
                  },
                });
              }
            }}
            className="w-full bg-transparent border-none outline-none resize-none"
          />
          <div className="flex flex-col gap-5">
            <button type="submit" disabled={isLoading}>
              <SendSvg width={24} height={24} color="#ffffff" />
            </button>

            <button onClick={stop} disabled={!isLoading}>
              <StopSvg
                width={24}
                height={24}
                color={isLoading ? "#ffffff" : "#ffffff27"}
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
