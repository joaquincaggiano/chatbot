"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FeatureHomeCard from "./FeatureHomeCard";

const Home = () => {
  const router = useRouter();

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

          <div className="flex justify-center items-center gap-5">
            <Button
              onClick={() => router.push("/analyze-cv")}
              className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Analizemos tu cv
            </Button>

            <Button
              onClick={() => router.push("/chat")}
              className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Comenzar Práctica
            </Button>
          </div>

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
