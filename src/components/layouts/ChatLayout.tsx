"use client";

import { Chat } from "@prisma/client";
import Link from "next/link";
import ArrowLeftSvg from "../icons/ArrowLeftSvg";
import { ReactNode, useState } from "react";
import EditSvg from "../icons/EditSvg";
import { useRouter } from "next/navigation";
import { createChat } from "@/actions/chat";
import { Spinner } from "@radix-ui/themes";

interface Props {
  chats: Chat[];
  userId: string;
  children: ReactNode;
}

const ChatLayout = ({ chats, userId, children }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const loadingChat = async () => {
    try {
      if (!userId) return;

      setIsLoading(true);

      const { id } = await createChat(userId);

      router.push(`/chat/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <aside className="flex flex-col gap-10 p-5 overflow-y-auto h-screen w-full max-w-[350px]">
        <div className="flex justify-between items-center">
          <Link href="/" className="hover:bg-[#1a181d] p-2 rounded-full w-fit">
            <ArrowLeftSvg color="white" />
          </Link>

          <button
            onClick={loadingChat}
            className="hover:bg-[#1a181d] p-2 rounded-[10px] w-fit"
          >
            {isLoading ? <Spinner /> : <EditSvg color="white" />}
          </button>
        </div>
        <div className="flex flex-col gap-5">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              href={`/chat/${chat.id}`}
              className="hover:bg-[#1a181d] p-2 rounded-[10px] text-base font-normal"
            >
              {chat.title}
            </Link>
          ))}
        </div>
      </aside>
      <main className="flex-1 bg-[#1a181d] h-screen overflow-y-auto">{children}</main>
    </div>
  );
};

export default ChatLayout;
