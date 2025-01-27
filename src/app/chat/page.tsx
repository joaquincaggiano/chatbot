import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Chat from "@/components/chat/Chat";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const ChatPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return redirect("/");
  }

  return <Chat userId={session.user.id} />;
};

export default ChatPage;
