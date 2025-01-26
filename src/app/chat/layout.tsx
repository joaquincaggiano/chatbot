import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { getChats } from "@/actions/chat";
import ChatLayout from "@/components/layouts/ChatLayout";

const LayoutChat = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return redirect("/");
  }

  const chats = await getChats(session.user.id);

  return <ChatLayout chats={chats} userId={session.user.id}>{children}</ChatLayout>;
};

export default LayoutChat;
