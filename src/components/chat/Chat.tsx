"use client";

import { useChat } from "ai/react";
import OpenAISvg from "../icons/OpenAISvg";
import { Spinner } from "@radix-ui/themes";
import { ChatWithMessages } from "@/interfaces/chat";
import SendSvg from "../icons/SendSvg";

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
    <div className="flex flex-col w-full max-w-2xl py-24 mx-auto stretch">
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
                ? "px-5 py-3 bg-[#2f2f2f] rounded-[24px] max-w-xl"
                : "bg-transparent"
            }`}
          >
            {m.content}
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-2">
        {isLoading && <Spinner />}

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
          className="w-full max-w-2xl flex gap-2 fixed bottom-0 mb-8"
        >
          <div className="w-full p-5 bg-[#2f2f2f] border-none rounded-[24px] flex">
            <textarea
              value={input}
              placeholder="Escribe tu mensaje..."
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
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
                <div
                  className={`w-5 h-5 ${
                    isLoading ? "bg-red-500" : "bg-red-500/20"
                  } rounded-full`}
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
