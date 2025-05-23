"use client";
import type { Cuenta } from "@/types/data";
import Link from "next/link";
import Image from "next/image";
import { RiDownload2Fill, RiExternalLinkLine } from "@remixicon/react";
import { useState } from "react";

type CardProps = {
  data: Cuenta;
};

export default function Card({ data }: CardProps) {
  const [showModal, setShowModal] = useState(false);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("es-AR").format(num);

  const handleDownload = async () => {
    const response = await fetch(data.profile);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.username}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="card bg-base-100 image-full shadow-md h-48 relative">
        <figure>
          <Image
            src={data.profile}
            alt={`Foto de perfil de ${data.username}`}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="absolute top-2 left-2 z-10 flex flex-col">
          <span className="text-white text-base font-semibold drop-shadow">
            @{data.username}
          </span>
          <span className="text-sm">{formatNumber(data.followers)} seguidores</span>
        </div>

        <div className="card-body justify-end p-4 pt-12">
          <div className="flex items-center justify-between">
            <span className="badge badge-info text-xs">#{data.position}</span>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => setShowModal(true)}
            >
              Ver info
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <dialog id="profile_modal" className="modal modal-open">
          <div className="modal-box">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={data.profile}
                alt={`Foto de perfil de ${data.username}`}
                width={64}
                height={64}
                className="rounded-full border"
              />
              <div>
                <h3 className="font-bold text-lg">@{data.username}</h3>
                <p className="text-xs text-gray-500">
                  #{data.position} en el ranking
                </p>
              </div>
            </div>

            <p className="py-2 whitespace-pre-line text-sm">{data.bio}</p>

            <ul className="text-sm mb-4 space-y-1">
              <li>
                <strong>Seguidores:</strong> {formatNumber(data.followers)}
              </li>
              <li>
                <strong>Siguiendo:</strong> {formatNumber(data.following)}
              </li>
              <li>
                <strong>Tweets:</strong> {formatNumber(data.tweets)}
              </li>
              <li>
                <strong>Likes:</strong> {formatNumber(data.likes)}
              </li>
            </ul>

            <div className="modal-action flex flex-wrap justify-between md:justify-end items-center gap-2">
              <button
                className="btn btn-sm btn-secondary"
                onClick={handleDownload}
              >
                <RiDownload2Fill size={14} />
                Descargar foto
              </button>

              <Link
                href={`https://x.com/${data.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-primary"
              >
                <RiExternalLinkLine size={14} />
                Ver perfil
              </Link>

              <button
                className="btn btn-sm"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
