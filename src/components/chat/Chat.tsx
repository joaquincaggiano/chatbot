"use client";

import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OpenAISvg from "../icons/OpenAISvg";
import { Spinner } from "@radix-ui/themes";
import { ChatWithMessages } from "@/interfaces/chat";

interface Props {
  chat: ChatWithMessages;
}

export default function ChatComponent({ chat }: Props) {
  const { messages, input, isLoading, stop, handleInputChange, handleSubmit } =
    useChat({
      initialMessages: chat.messages,
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
                chatId: chat.id,
                userMessage: input,
              },
            });
          }}
          className="w-full max-w-2xl flex gap-2 fixed bottom-0 mb-8"
        >
          <Input
            className="w-full p-5 bg-[#2f2f2f] border-none rounded-[24px] font-medium text-base"
            value={input}
            placeholder="Escribe tu mensaje..."
            onChange={handleInputChange}
          />
          {isLoading && (
            <Button onClick={stop}>
              <div className="w-5 h-5 bg-red-500 rounded-full" />
            </Button>
          )}
          {/* <Button type="submit" className="bg-white text-black rounded-[8px]">Submit</Button> */}
        </form>
      </div>
    </div>
  );
}
