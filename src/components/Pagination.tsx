import {
  RiArrowLeftDoubleLine,
  RiArrowRightDoubleLine,
} from "@remixicon/react";

type PaginationProps = {
  currentPage: number;
  setPage: (page: number) => void;
  totalPages: number;
  paginationNumbers: number[];
};

export default function Pagination({
  currentPage,
  setPage,
  totalPages,
  paginationNumbers,
}: PaginationProps) {
  const handleSetPage = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="join flex justify-center mt-6">
      <button
        onClick={() => currentPage > 1 && handleSetPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className="join-item btn btn-sm"
      >
        <RiArrowLeftDoubleLine size={16} />
      </button>

      {paginationNumbers[0] > 1 && (
        <>
          <button
            className="join-item btn btn-sm"
            onClick={() => handleSetPage(1)}
          >
            1
          </button>
          {paginationNumbers[0] > 2 && (
            <span className="join-item btn btn-sm btn-disabled">...</span>
          )}
        </>
      )}

      {paginationNumbers.map((page) => (
        <button
          key={page}
          className={`join-item btn btn-sm ${
            page === currentPage ? "btn-active" : ""
          }`}
          onClick={() => handleSetPage(page)}
        >
          {page}
        </button>
      ))}

      {paginationNumbers[paginationNumbers.length - 1] < totalPages && (
        <>
          {paginationNumbers[paginationNumbers.length - 1] < totalPages - 1 && (
            <span className="join-item btn btn-sm btn-disabled">...</span>
          )}
          <button
            className="join-item btn btn-sm"
            onClick={() => handleSetPage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() =>
          currentPage < totalPages && handleSetPage(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
        className="join-item btn btn-sm"
      >
        <RiArrowRightDoubleLine size={16} />
      </button>
    </div>
  );
}
