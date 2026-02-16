import { useEffect, useState, useMemo } from "react";
import api from "../../api/axios";
import Swal from "sweetalert2";
import {
  Pencil,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ---------- CATEGORY MASTER LIST ---------- */
const categories = [
  { name: "International Projects" },
  { name: "Special Design" },
  { name: "Green Building" },
  { name: "Heritage Building" },
  { name: "Government" },
  { name: "Mivan Formwork" },
  { name: "Electrical Audit" },
  { name: "MOEF / CRZ" },
  { name: "High Rise" },
  { name: "Commercial Building" },
  { name: "Township Planning" },
  { name: "Residential Building" },
  { name: "Bungalows + Rowhouse + Duplex" },
  { name: "Hotel & Restaurant" },
  { name: "Hospital" },
  { name: "Mall" },
  { name: "Industrial" },
  { name: "Institutional" },
  { name: "Religious Monuments" },
  { name: "Interior" }
];

/* ---------- SLUG NORMALIZER ---------- */
const createSlug = (text = "") => {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

export default function ProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const navigate = useNavigate();

  /* ---------- CATEGORY DISPLAY FORMATTER ---------- */
  const getDisplayCategory = useMemo(() => {
    return (backendCategory) => {
      const match = categories.find(
        (cat) => createSlug(cat.name) === createSlug(backendCategory)
      );
      return match ? match.name : backendCategory;
    };
  }, []);

  /* ---------- LOAD DATA ---------- */
  const load = async () => {
    try {
      const res = await api.get("/projects/admin/list", {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchQuery,
        },
      });

      setProjects(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Failed to load projects:", error);
      setProjects([]);
      setTotal(0);
    }
  };

  useEffect(() => {
    load();
  }, [currentPage, itemsPerPage, searchQuery]);

  /* ---------- RESPONSIVE ITEMS PER PAGE ---------- */
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) setItemsPerPage(25);
      else if (width < 1024) setItemsPerPage(10);
      else setItemsPerPage(25);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  /* Reset page when searching */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Project?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9e312c",
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`/projects/${id}`);
        await load();
        Swal.fire("Deleted", "Project removed", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete project", "error");
      }
    }
  };

  /* ---------- PAGINATION HELPERS ---------- */
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

  const indexOfFirstItem =
    total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const indexOfLastItem =
    total === 0 ? 0 : Math.min(currentPage * itemsPerPage, total);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-[30px] font-bold mb-4">Project Dashboard</h1>

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

        {/* New Project Button */}
        <button
          type="button"
          onClick={() => navigate("/upload/project")}
          className="w-56 py-3 rounded-xl text-[18px] text-white font-bold bg-blue hover:bg-red transition"
        >
          + NEW PROJECT
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
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {projects.map((p) => (
              <tr
                key={p._id}
                className="border-t transition hover:bg-red/50 text-[16px]"
              >
                <td className="px-4 py-1 flex items-center justify-center">
                  <img
                    src={p.coverimg}
                    className="h-full w-14 object-cover rounded-lg"
                    alt={p.title}
                  />
                </td>

                <td className="px-4 py-2">{p.title}</td>

                <td className="px-4 py-2">
                  <span className="px-4 py-2 text-black font-[16px] ">
                    {getDisplayCategory(p.category)}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-[16px] rounded-full ${p.status === "Completed"
                      ? "bg-green text-black"
                      : p.status === "Pending"
                        ? "bg-blue1 text-black"
                        : "bg-yellow text-black"
                      }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="px-2 py-3">
                  <div className="flex items-center justify-center gap-2">

                    <button
                      onClick={() => navigate(`/upload/project/${p._id}`)}
                      className="flex items-center gap-1 px-3 py-1 rounded-md bg-blue text-white hover:bg-blue transition"
                    >
                      <Pencil size={16} />
                      EDIT
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-md bg-red text-white hover:bg-red-700 transition"
                    >
                      <Trash2 size={16} />
                      DELETE
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-black text-[18px]">
                  No projects found
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
