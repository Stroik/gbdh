import SheetData from "@/components/SheetData";
import WelcomeMessage from "@/components/WelcomeMessage";
import type { Response } from "@/types/data";

async function getData(): Promise<Response> {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://gbdh.vercel.app";

  const res = await fetch(`${baseUrl}/api/sheet`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error("❌ API /api/sheet falló:", res.status);
    return { cuentas: [], muertes: [], fusilados: [] };
  }

  const json = await res.json();

  if (!json.cuentas || !Array.isArray(json.cuentas)) {
    console.warn("⚠️ cuentas no definidas o inválidas en la respuesta");
    return { cuentas: [], muertes: [], fusilados: [] };
  }

  return json;
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="w-full h-full">
      <WelcomeMessage total={data.cuentas.length} />
      <SheetData data={data} />
    </div>
  );
}
