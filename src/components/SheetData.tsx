"use client";
import { useState, useMemo } from "react";
import type { Response } from "@/types/data";
import Card from "./Card";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 20;
const MAX_PAGE_NUMBERS = 5;

export default function SheetData({ data }: { data: Response }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return data.cuentas.filter((user) => {
      if (!user || typeof user.username !== "string") {
        // console.warn("Cuenta inválida:", user);
        return false;
      }
      return user.username.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, data.cuentas]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredData]);

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const paginationNumbers = useMemo(() => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_NUMBERS / 2));
    let endPage = startPage + MAX_PAGE_NUMBERS - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - MAX_PAGE_NUMBERS + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  if (!data?.cuentas?.length) {
    return (
      <p className="text-center text-sm text-gray-500">
        No se encontraron cuentas.
      </p>
    );
  }

  return (
    <section>
      <label className="input w-full mb-4">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          placeholder="Buscar hagovero..."
          className="grow"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </label>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentData.map((user) => (
          <Card key={user.position} data={user} />
        ))}
      </div>

      <footer>
        <Pagination
          currentPage={currentPage}
          setPage={setPage}
          totalPages={totalPages}
          paginationNumbers={paginationNumbers}
        />
      </footer>
    </section>
  );
}
