import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import { ArrowRight } from "lucide-react";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa";

/* ===========================
   CATEGORY LIST (Display Names)
=========================== */
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

/* ===========================
   SLUG FUNCTION (Same as previous file)
=========================== */
const createSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

export default function Projects() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showScrollTop, setShowScrollTop] = useState(false);

  /* ===========================
    FIND DISPLAY NAME FROM SLUG
 =========================== */
  const displayCategory = useMemo(() => {
    const match = categories.find(
      (cat) => createSlug(cat.name) === category
    );
    return match ? match.name : category;
  }, [category]);

  /* ===========================
     SCROLL BUTTON
  =========================== */
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===========================
     FETCH PROJECTS
  =========================== */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/projects?category=${category}`);
        setProjects(res.data || []);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };

    if (displayCategory) fetchProjects();
  }, [displayCategory]);

  return (
    <section className="bg-gray2 pt-40 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="mb-4 text-sm tracking-wide text-gray-600">
          <ul className="flex items-center gap-2 flex-wrap text-[17px]">
            <li
              className="cursor-pointer hover:text-blue transition"
              onClick={() => navigate("/", { state: { scrollTo: "OurProjects" } })}
            >
              Our Projects
            </li>
            <span>/</span>
            <li
              className="cursor-pointer hover:text-red transition"
              onClick={() => navigate(`/projects/${category}`)}
            >
              <span className="capitalize font-bold">
                {displayCategory}
              </span>
            </li>
          </ul>
        </nav>

        {/* HEADER */}
        <div className="mb-5 text-center ">

          <p className="mt-5 text-blue text-[40px] sm:text-4xl md:text-[45px] uppercase tracking-[0.1em]">
            {displayCategory}
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-black">
            Loading projects...
          </p>
        )}

        {/* EMPTY */}
        {!loading && projects.length === 0 && (
          <p className="text-center text-black">
            No projects found in this category.
          </p>
        )}

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((p) => (
            <Link
              key={p._id}
              to={`/projects/${category}/${p.slug}`}
              className="group relative overflow-hidden cursor-pointer rounded-xl"
            >
              {/* IMAGE */}
              <img
                src={p.coverimg || "/placeholder.jpg"}
                alt={p.title}
                className="w-full h-[340px] object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* FIXED WHITE STRIP */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/40 flex items-center justify-between px-6">
                <span className="text-red text-[21px] font-bold tracking-wider">
                  {p.title}
                </span>

                <ArrowRight className="text-red w-7 h-7" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= WHATSAPP ================= */}
      <a
        href="https://wa.me/9987221079?text=Hello%20WISETECH%20MEP%20CONSULTANT%20PVT.%20LTD.%2C%20I%E2%80%99m%20interested%20in%20your%20work%20on%20the%20Homepage%20at%20https%3A%2F%2Fwww.wisetech-mep.com%2F.%20Could%20you%20please%20share%20more%20details%20on%20how%20I%20might%20engage%20your%20services%3F"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-16 left-3 bg-green-500 p-4 rounded-full hover:scale-110 transition z-50"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </a>

      {/* ================= SCROLL TOP ================= */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-16 right-3 text-white p-4 bg-blue hover:bg-red hover:scale-110
        rounded-full transition z-50 ${showScrollTop ? "opacity-100" : "opacity-0"}`}
      >
        <FaArrowUp />
      </button>
    </section>
  );
}