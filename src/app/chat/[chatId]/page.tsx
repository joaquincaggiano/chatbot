import { getChat } from "@/actions/chat";
import Chat from "@/components/chat/Chat";

type Params = Promise<{ chatId: string }>;

const ChatPage = async ({ params }: { params: Params }) => {
  const { chatId } = await params;
  const chat = await getChat(chatId);
  // console.log("chat: ", chat);
  return <Chat chat={chat} />;
};

export default ChatPage;
