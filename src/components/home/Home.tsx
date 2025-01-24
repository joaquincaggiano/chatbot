"use client"
import { createChat } from "@/actions/chat";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
    userId: string;
}

const Home = ({ userId }: Props) => {
    const router = useRouter()

    const loadingChat = async () => {
        if (!userId) return;

        const { id } = await createChat(userId);

        router.push(`/chat/${id}`);
      };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold">Home</h1>
    <p>Prueba nuestro chat de entrevistas profesionales</p>

    <Button onClick={loadingChat}>Empezar</Button>
  </div>
  )
}

export default Home