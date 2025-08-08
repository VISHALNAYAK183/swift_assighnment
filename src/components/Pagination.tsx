interface PaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  startIndex: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  pageSize,
  totalItems,
  startIndex,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  return (
    <div className="flex justify-between items-center mt-4">
      <span>
        {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)} of{" "}
        {totalItems} items
      </span>
      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>{page}</span>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          <option value={10}>10 / Page</option>
          <option value={50}>50 / Page</option>
          <option value={100}>100 / Page</option>
        </select>
      </div>
    </div>
  );
}
