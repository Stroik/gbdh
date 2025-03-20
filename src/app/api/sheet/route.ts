import { Cuenta } from "@/types/data";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    const url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTqj7_vD9hyJrvpvybZdEbz0s7imtkkI98cnqgtbj_esYfDzD74rmANHNgRpFvUPluV_M1ZvjDGxysE/pub?output=xlsx";
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    const workbook = XLSX.read(buffer);

    const cuentasSheet = workbook.Sheets["Cuentas"];
    // const muertesSheet = workbook.Sheets["Muertes"];
    // const fusiladosSheet = workbook.Sheets["REHF"];
    const fpfSheet = workbook.Sheets["FPF"];

    const cuentasRaw = XLSX.utils
      .sheet_to_json<unknown[]>(cuentasSheet, { header: 1 })
      .slice(1);
    // const muertesRaw = XLSX.utils
    //   .sheet_to_json<unknown[]>(muertesSheet, { header: 1 })
    //   .slice(1);
    // const fusiladosRaw = XLSX.utils
    //   .sheet_to_json<unknown[]>(fusiladosSheet, { header: 1 })
    //   .slice(1);
    const fpfRaw = XLSX.utils.sheet_to_json<unknown[]>(fpfSheet, { header: 1 });

    const cuentas = cuentasRaw
      .map((row, i) => {
        const userCell = row[0]?.toString().trim();
        if (!userCell) return null;
        const match = userCell.match(/^(\d+)\.\s*(.+)$/);
        if (!match) return null;
        const [, , user] = match;
        const followers = Number(row[1]);
        if (isNaN(followers) || followers < 0) return null;

        let pictureLink = fpfRaw[i]?.[0] ? fpfRaw[i][0] : "";
        if (pictureLink === "#N/D" || !pictureLink)
          pictureLink = "/placeholder.png";

        return {
          id: i + 1,
          user: user.trim(),
          followers,
          picture: typeof pictureLink === "string" ? pictureLink : "",
        };
      })
      .filter((item): item is Omit<Cuenta, "position"> => Boolean(item))
      .sort((a, b) => b.followers - a.followers)
      .map((item, index) => ({ ...item, position: index + 1 }));

    // const muertes = muertesRaw
    //   .filter((row) => row[0] && row[0].toString().trim() !== "")
    //   .map((row) => ({
    //     user: row[0],
    //     followers: row[1],
    //     dead_at: row[2],
    //     status: row[3],
    //     now_is: row[4],
    //   }));

    // const fusilados = fusiladosRaw
    //   .filter((row) => row[0] && row[0].toString().trim() !== "")
    //   .map((row) => ({
    //     user: row[0],
    //     dead_at: row[1],
    //   }));

    return NextResponse.json({ cuentas });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
