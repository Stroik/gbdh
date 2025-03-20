"use client";

import Link from "next/link";
import Image from "next/image";
import { RiCupLine } from "@remixicon/react";
// import { usePathname } from "next/navigation";
import Theme from "./Theme";

export default function Navbar() {
  // const pathname = usePathname();

  return (
    <div className="navbar bg-neutral text-neutral-content dark:bg-neutral shadow">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {/*<li>
              <Link href="/" className={pathname === "/" ? "active" : ""}>
                Cuentas
              </Link>
            </li>
             <li>
              <Link
                href="/muertes"
                className={pathname === "/muertes" ? "active" : ""}
              >
                Muertes
              </Link>
            </li> */}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          <Image src="/logo.png" alt="Logo" width={24} height={28} priority />
          GBDH
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {/*<li>
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              Cuentas
            </Link>
          </li>
           <li>
            <Link
              href="/muertes"
              className={pathname === "/muertes" ? "active" : ""}
            >
              Muertes
            </Link>
          </li> */}
        </ul>
      </div>
      <div className="navbar-end">
        <Theme />
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            <RiCupLine size={20} />
          </div>
          <div
            tabIndex={0}
            className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md"
          >
            <div className="card-body">
              <h3 className="text-base">¡DATABORD necesita comer!</h3>
              <p className="text-xs">
                Regalale un cafecito haciendo click en su logo. Dale su dosis de
                pasto.
              </p>
              <Link
                href="http://cafecito.app/databord"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/databord.jpg"
                  alt="Databord Cafecito"
                  width={400}
                  height={400}
                  priority
                  objectFit="cover"
                />
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
