import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

type SortKey = "postId" | "name" | "email" | null;
type SortOrder = "asc" | "desc" | null;

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);

  // Restore filters from localStorage
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [page, setPage] = useState(Number(localStorage.getItem("page")) || 1);
  const [pageSize, setPageSize] = useState(
    Number(localStorage.getItem("pageSize")) || 10
  );
  const [sortKey, setSortKey] = useState<SortKey>(
    (localStorage.getItem("sortKey") as SortKey) || null
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    (localStorage.getItem("sortOrder") as SortOrder) || null
  );

  // Fetch data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data: Comment[]) => setComments(data));
  }, []);

  // Persist filters
  useEffect(() => {
    localStorage.setItem("search", search);
    localStorage.setItem("page", String(page));
    localStorage.setItem("pageSize", String(pageSize));
    localStorage.setItem("sortKey", sortKey || "");
    localStorage.setItem("sortOrder", sortOrder || "");
  }, [search, page, pageSize, sortKey, sortOrder]);

  // Filtered data
  const filtered = comments.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.body.toLowerCase().includes(search.toLowerCase())
  );

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey || !sortOrder) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (typeof valA === "string" && typeof valB === "string") {
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
    if (typeof valA === "number" && typeof valB === "number") {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }
    return 0;
  });

  // Pagination
  const startIndex = (page - 1) * pageSize;
  const paginated = sorted.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  // Handle sort toggle (no sort → asc → desc → no sort)
  const toggleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder("asc");
    } else {
      if (sortOrder === "asc") setSortOrder("desc");
      else if (sortOrder === "desc") {
        setSortKey(null);
        setSortOrder(null);
      } else {
        setSortOrder("asc");
      }
    }
    setPage(1); // reset page to first
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userName="Ervin Howell" userEmail="ervin@howell.com" />

      <div className="flex-1 p-4 sm:p-6 w-full">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => toggleSort("postId")}
              className={`px-4 py-2 rounded ${
                sortKey === "postId"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Sort Post ID {sortKey === "postId" && (sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : "")}
            </button>
            <button
              onClick={() => toggleSort("name")}
              className={`px-4 py-2 rounded ${
                sortKey === "name"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Sort Name {sortKey === "name" && (sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : "")}
            </button>
            <button
              onClick={() => toggleSort("email")}
              className={`px-4 py-2 rounded ${
                sortKey === "email"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Sort Email {sortKey === "email" && (sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : "")}
            </button>
          </div>
          <SearchBar
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            placeholder="Search name, email, comment"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Post ID</th>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Comment</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="border p-2">{c.postId}</td>
                  <td className="border p-2">{c.name}</td>
                  <td className="border p-2">{c.email}</td>
                  <td className="border p-2">{c.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filtered.length}
          startIndex={startIndex}
          onPageChange={(p) => setPage(p)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
}
