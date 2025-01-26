"use client";
import { createChat } from "@/actions/chat";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FeatureHomeCard from "./FeatureHomeCard";

interface Props {
  userId: string;
}

const Home = ({ userId }: Props) => {
  const router = useRouter();

  const loadingChat = async () => {
    if (!userId) return;

    const { id } = await createChat(userId);

    router.push(`/chat/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Prepárate para tu Próxima Entrevista
          </h1>

          <p className="text-xl md:text-2xl font-normal mb-12">
            Practica tus habilidades de entrevista con nuestro chat profesional
            impulsado por IA. Obtén retroalimentación instantánea y mejora tus
            posibilidades de éxito.
          </p>

          <Button
            onClick={loadingChat}
            className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Comenzar Práctica
            {/* <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> */}
          </Button>

          {/* Features */}
          <div className="mt-24 grid md:grid-cols-3 gap-8">
            <FeatureHomeCard
              title="Preguntas Reales"
              description="Basadas en entrevistas actuales de las mejores empresas"
            />
            <FeatureHomeCard
              title="Feedback Instantáneo"
              description="Recibe consejos y sugerencias para mejorar tus respuestas"
            />
            <FeatureHomeCard
              title="Personalizado"
              description="Adaptado a tu nivel de experiencia y sector profesional"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
