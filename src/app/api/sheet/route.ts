import { NextResponse } from "next/server";
import type { Cuenta } from "@/types/data";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "db", "hagovdb.json");
    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      return NextResponse.json(
        { error: "Archivo hagovdb.json no encontrado" },
        { status: 404 }
      );
    }

    const data = await fs.readFile(filePath, "utf-8");
    const parsed: unknown = JSON.parse(data);

    if (!Array.isArray(parsed)) {
      return NextResponse.json(
        { error: "Formato inválido: el JSON no es un array" },
        { status: 400 }
      );
    }

    const cuentas: Cuenta[] = parsed.map((item, index) => ({
      ...item,
      position: item.position ?? index + 1,
    }));

    return NextResponse.json({
      cuentas,
      muertes: [],
      fusilados: [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Fallo inesperado: ${String(error)}` },
      { status: 500 }
    );
  }
}
