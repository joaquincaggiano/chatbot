import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { getChats } from "@/actions/chat";
import Link from "next/link";

const LayoutChat = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return redirect("/");
  }

  const chats = await getChats(session.user.id);
  return (
    <div className="flex ">
      <aside className="flex flex-col gap-2">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            {chat.id}
          </Link>
        ))}
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default LayoutChat;
