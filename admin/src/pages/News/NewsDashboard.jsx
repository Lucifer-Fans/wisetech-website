import { useEffect, useState } from "react";
import api from "../../api/axios";
import Swal from "sweetalert2";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewsDashboard() {
  const [news, setNews] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const BASE_URL = import.meta.env.VITE_API_URL || "https://wisetech-backend.onrender.com";

  const navigate = useNavigate();

  const load = async () => {
    const res = await api.get("/news/admin/list", {
      params: {
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
      },
    });

    setNews(res.data.data || []);
    setTotal(res.data.total || 0);
  };

  useEffect(() => {
    load();
  }, [currentPage, itemsPerPage, searchQuery]);

  /* ---------- RESPONSIVE ITEMS PER PAGE ---------- */
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) setItemsPerPage(10);
      else if (width < 1024) setItemsPerPage(10);
      else setItemsPerPage(10);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const del = async (id) => {
    const ok = await Swal.fire({
      title: "Delete News?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9e312c",
    });

    if (ok.isConfirmed) {
      await api.delete(`/news/${id}`);
      load();
      Swal.fire("Deleted", "News removed", "success");
    }
  };

  /* ---------- PAGINATION HELPERS ---------- */
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

  const indexOfFirstItem =
    total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const indexOfLastItem =
    total === 0 ? 0 : Math.min(currentPage * itemsPerPage, total);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <h1 className="text-[30px] font-bold mb-4">News Dashboard</h1>

      {/* ---------- TOP CONTROLS ---------- */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        {/* Search */}
        <div className="relative w-full sm:w-1/3">
          <Search size={20} className="absolute left-2.5 top-2.5 text-black" />
          <input
            type="text"
            placeholder="Quick Search..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* New Button */}
        <button
          type="button"
          onClick={() => navigate("/upload/news")}
          className="w-56 py-3 rounded-xl text-[18px] text-white font-bold bg-blue hover:bg-red transition"
        >
          + NEW NEWS
        </button>
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-blue text-[18px] text-black">
            <tr>
              <th className="px-4 py-3 text-center">Image</th>
              <th className="px-4 py-3 text-center">Title</th>
              <th className="px-4 py-3 text-center">Category</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {news.map((n) => (
              <tr
                key={n._id}
                className="border-t transition hover:bg-red/50 text-[16px]"
              >
                <td className="px-4 py-1 flex items-center justify-center">
                  <img
                    src={n.image}
                    className="h-full w-14 object-cover rounded-lg"
                    alt={n.title}
                  />
                </td>

                <td className="px-4 py-2">{n.title}</td>

                <td className="px-4 py-2">
                  <span className="px-4 py-2 text-black font-[16px]">
                    {n.category}
                  </span>
                </td>

                <td className="px-4 py-3">{n.date}</td>

                <td className="px-2 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => del(n._id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-md bg-red text-white hover:bg-red-700 transition"
                    >
                      <Trash2 size={16} />
                      DELETE
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {news.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-black text-[18px]">
                  No news found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---------- PAGINATION ---------- */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-[16px] text-black">
          Showing {indexOfFirstItem}–{indexOfLastItem} of {total}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border rounded-lg disabled:opacity-40"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="px-2 text-[16px]">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border rounded-lg disabled:opacity-40"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
