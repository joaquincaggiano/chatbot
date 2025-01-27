"use client";

import { Chat } from "@prisma/client";
import Link from "next/link";
import ArrowLeftSvg from "../icons/ArrowLeftSvg";
import { ReactNode, useState } from "react";
import EditSvg from "../icons/EditSvg";
import { useRouter } from "next/navigation";
import { createChat, deleteChat } from "@/actions/chat";
import { Spinner } from "@radix-ui/themes";
import TrashSvg from "../icons/TrashSvg";

interface Props {
  chats: Chat[];
  userId: string;
  children: ReactNode;
}

const ChatLayout = ({ chats, userId, children }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);


  const createChatHandler = async () => {
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

  const handleDeleteChat = async (chatId: string) => {
    try {
      setIsDeleting(chatId);
      const {status} = await deleteChat(chatId);

      if (status === "success") {
        router.replace("/chat");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(null);
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
            onClick={createChatHandler}
            className="hover:bg-[#1a181d] p-2 rounded-[10px] w-fit"
          >
            {isLoading ? <Spinner /> : <EditSvg color="white" />}
          </button>
        </div>
        <div className="flex flex-col gap-5">
          {chats.map((chat) => (
            <div key={chat.id} className="flex items-center justify-between hover:bg-[#1a181d] rounded-[10px] p-2">
              <Link
                href={`/chat/${chat.id}`}
                className="text-base font-normal w-full"
              >
                {chat.title}
              </Link>

              {isDeleting === chat.id ? (
                <Spinner />
              ) : (
                <button
                  onClick={() => handleDeleteChat(chat.id)}
                  className="w-fit"
                >
                  <TrashSvg color="white" width={20} height={20} />
                </button>
              )}
            </div>
          ))}
        </div>
      </aside>
      <main className="flex-1 bg-[#1a181d] h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default ChatLayout;
