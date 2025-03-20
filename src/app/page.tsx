import SheetData from "@/components/SheetData";
import type { Response } from "@/types/data";

async function getData(): Promise<Response> {
  const res = await fetch("https://gbdh.vercel.app/api/sheet", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="w-full h-full">
      <SheetData data={data} />
    </div>
  );
}
