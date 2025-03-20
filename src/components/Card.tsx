import type { Cuenta } from "@/types/data";
import Link from "next/link";
import Image from "next/image";
import { RiDownload2Fill } from "@remixicon/react";

type CardProps = {
  data: Cuenta;
};

export default function Card({ data }: CardProps) {
  const handleDownload = async () => {
    const response = await fetch(data.picture);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.user}.jpg`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="card bg-base-100 image-full shadow-md h-64">
      <figure>
        <Image
          src={data.picture}
          alt={`Foto de perfil de ${data.user}`}
          width={400}
          height={400}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body justify-end p-4">
        <h2 className="card-title text-base md:text-xl">@{data.user}</h2>
        <p className="text-xs">
          {data.followers} seguidores{" "}
          <span className="badge badge-info">#{data.position}</span>
        </p>{" "}
        <div className="card-actions justify-end">
          <button className="btn btn-secondary btn-xs" onClick={handleDownload}>
            <RiDownload2Fill size={14} />
          </button>
          <Link
            href={`https://x.com/${data.user}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-xs"
          >
            Seguir
          </Link>
        </div>
      </div>
    </div>
  );
}
