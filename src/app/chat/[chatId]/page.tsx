import { getChat } from "@/actions/chat";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Chat from "@/components/chat/Chat";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Params = Promise<{ chatId: string }>;

const ChatPage = async ({ params }: { params: Params }) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return redirect("/");
  }

  const { chatId } = await params;
  const chat = await getChat(chatId);

  return <Chat chat={chat} userId={session.user.id} />;
};

export default ChatPage;
