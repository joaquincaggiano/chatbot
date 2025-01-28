import { NextResponse } from "next/server";
import * as mammoth from "mammoth";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Read the uploaded file
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Convert document to plain text
    const { value: cvText } = await mammoth.extractRawText({ buffer: fileBuffer });

    // Analyze with GPT-4
    const { text: analysis } = await generateText({
      model: openai("gpt-4o"),
      system:
        "Eres un experto en recursos humanos y análisis de CVs." +
        "Tu tarea es analizar el CV proporcionado y dar retroalimentación detallada." +
        "Debes evaluar los siguientes aspectos:" +
        "1. Estructura y formato" +
        "2. Contenido y claridad" +
        "3. Experiencia y logros" +
        "4. Habilidades y competencias" +
        "5. Recomendaciones específicas de mejora" +
        "6. Debe ser una sola página" +
        "7. Cada bullet point no debe ser más largo que 2 lineas." +
        "8. Que se asegure de incluir logros, impactos, si lidero un equipo, etc." +
        "9. Verificar que este todo bien escrito, no debe tener errores de gramática o ortografía." +
        "10. Evita incluir información que no sea relevante para el CV." +
        "11. Cada sección no debe tener más de 5 bullet points." +
        "12. ¿Cumple con el formato del template?" +
        "13. ¿Qué secciones le faltan o están incompletas?" +
        "14. ¿Qué sugerencias tienes para mejorarlo?" +
        "Responde en formato Markdown y en español.",
      prompt: `Por favor, analiza el siguiente CV y proporciona una evaluación detallada:\n\n${cvText}`,
    });

    return NextResponse.json({ result: analysis });

  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { error: "Error processing file" },
      { status: 500 }
    );
  }
}