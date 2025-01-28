"use client";

import Link from "next/link";
import MarkdownRenderer from "../markdown/MarkdownRenderer";
import { Input } from "../ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AnalyzeCV = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    // formState: { errors },
    // reset,
  } = useForm();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onSubmit = async () => {
    if (!file) return alert("Por favor, selecciona un archivo.");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/analyze-cv", {  // Remove http://localhost:3000
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("La respuesta del servidor no es válida");
      }

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Error al analizar el archivo.");
      }

      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error: ", error);
      const errorMessage = error instanceof Error
        ? error.message
        : "Ocurrió un error al procesar el archivo.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen mx-auto p-10">
      {result ? (
        <div className="w-full max-w-4xl flex flex-col gap-5 justify-center items-center p-5 border-2 border-[#2f2f2f] rounded-[24px]">
          <MarkdownRenderer content={result} />

          <div className="flex justify-center items-center gap-5">
            <Link
              href="/"
              className="group inline-flex items-center bg-blue-600 hover:bg-blue-700 text-base font-semibold px-8 py-2 rounded-[20px]"
            >
              Volver al inicio
            </Link>

            <button
              onClick={() => setResult("")}
              className="group inline-flex items-center bg-blue-600 hover:bg-blue-700 text-base font-semibold px-8 py-2 rounded-[20px]"
            >
              Analizar otro CV
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold">
            Analiza tu CV al formato Harvard
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center gap-5"
          >
            <Input
              id="file"
              {...register("file")}
              type="file"
              placeholder="Ingresa tu CV"
              accept=".docx, .pdf"
              className="w-full max-w-md"
              onChange={handleFileChange}
            />
            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center bg-blue-600 hover:bg-blue-700 text-base font-semibold px-8 py-2 rounded-[20px]"
            >
              {loading ? "Analizando..." : "Analizar"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AnalyzeCV;
