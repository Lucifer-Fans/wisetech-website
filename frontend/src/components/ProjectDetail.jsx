import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
  Briefcase,
  User,
  Users,
  Square,
  CheckCircle,
  MapPin,
  X
} from "lucide-react";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

/* ================= CATEGORY MASTER LIST ================= */
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

const createSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

export default function ProjectDetail() {
  const { slug, category } = useParams();
  const navigate = useNavigate();

  /* ================= MATCH CATEGORY NAME ================= */
  const formattedCategory =
    categories.find((cat) => createSlug(cat.name) === category)?.name ||
    category;

  const [project, setProject] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(null);

  // ================= SCROLL BUTTON =================
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ================= FETCH PROJECT =================
  useEffect(() => {
    let isMounted = true;

    const fetchProject = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/projects/slug/${slug}`);
        const data = res.data.project;

        if (!isMounted) return;

        setProject({
          ...data,
          images: Array.isArray(data.images)
            ? data.images.filter(Boolean)
            : [],
        });

        setPrev(res.data.prev || null);
        setNext(res.data.next || null);

        window.scrollTo({ top: 0, behavior: "smooth" });
        setAnimate(false);
        setTimeout(() => setAnimate(true), 100);
      } catch (error) {
        console.error("Failed to load project", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProject();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // ================= INFINITE NAVIGATION =================
  const goPrev = () => {
    if (!project?.images?.length) return;
    setSelectedIndex((prevIndex) =>
      prevIndex === 0
        ? project.images.length - 1
        : prevIndex - 1
    );
  };

  const goNext = () => {
    if (!project?.images?.length) return;
    setSelectedIndex((prevIndex) =>
      prevIndex === project.images.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  // ================= KEYBOARD SUPPORT =================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, project]);

  if (loading) {
    return (
      <section className="pt-40 text-center text-black">
        Loading project…
      </section>
    );
  }

  if (!project) return null;

  return (
    <section className="bg-gray2 pt-40 pb-10">

      <div
        className={`max-w-7xl mx-auto px-6 transition-all duration-700 ease-out
        ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >

        {/* BREADCRUMB */}
        <nav className="mb-4 text-[17px] tracking-wide">
          <ul className="flex items-center gap-2 flex-wrap">
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
              <span className="capitalize">
                {formattedCategory}
              </span>
            </li>
            <span>/</span>
            <li className="font-bold cursor-pointer hover:text-blue transition capitalize">
              {project.title}
            </li>
          </ul>
        </nav>

        {/* TITLE */}
        <h1 className="text-[40px] sm:text-4xl md:text-[45px] font-bold tracking-widest text-blue uppercase">
          {project.title},
          <span className="text-[35px] font-bold tracking-widest text-red uppercase"> {project.location}</span>
        </h1>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-14 mt-5">
          <div className="lg:col-span-2 leading-7 whitespace-pre-line text-[18px]">
            {project.description}
          </div>

          <div className="space-y-5 text-sm">
            <Meta icon={<Briefcase className="text-blue" size={25} />} label="Service: " value={project.service} />
            <Meta icon={<User className="text-red" size={25} />} label="Architect: " value={project.architect} />
            <Meta icon={<Users className="text-blue" size={25} />} label="Client: " value={project.client} />
            <Meta icon={<Square className="text-red" size={25} />} label="Built-Up Area: " value={project.area} />
            <Meta icon={<MapPin className="text-blue" size={25} />} label="Location: " value={project.location} />
            <Meta icon={<CheckCircle className="text-red" size={25} />} label="Status: " value={project.status} />
          </div>
        </div>

        {/* IMAGES */}
        <div className="mt-10 columns-1 sm:columns-2 lg:columns-2 gap-6">
          {project.images.length > 0 ? (
            project.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedIndex(i)}
                className="mb-8 break-inside-avoid overflow-hidden rounded-xl cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Project ${i + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))
          ) : (
            <p className="text-black text-center">No images available</p>
          )}
        </div>

        {/* NAVIGATION */}
        <div className="flex items-center justify-between border-t mt-20 pt-8 text-lg">
          <button
            disabled={!prev}
            onClick={() => navigate(`/projects/${category}/${prev.slug}`)}
            className="flex items-center gap-2 opacity-80 hover:text-blue hover:opacity-100 transition disabled:opacity-30"
          >
            <ArrowLeft /> Previous Project
          </button>

          <button onClick={() => navigate(`/projects/${category}`)}
            className="opacity-80 hover:text-red hover:opacity-100 transition"
          >
            <LayoutGrid />
          </button>

          {next ? (
            <button onClick={() => navigate(`/projects/${category}/${next.slug}`)}
              className="flex items-center gap-2 opacity-80 hover:text-blue hover:opacity-100 transition"
            >
              Next Project <ArrowRight size={25} />
            </button>
          ) : (
            <button
              onClick={() => navigate("/", { state: { scrollTo: "OurProjects" } })}
              className="opacity-80 hover:text-blue hover:opacity-100 transition"
            >
              Back to Our Projects
            </button>
          )}
        </div>
      </div>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button (Top Right Corner Same As Image) */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-8 right-8 bg-white p-3 rounded-full shadow-lg"
            >
              <X size={22} />
            </button>

            {/* Prev Button (Left Center) */}
            <button
              onClick={goPrev}
              className="absolute left-8 top-1/2 -translate-y-1/2 text-white text-[65px] opacity-70 hover:opacity-100"
            >
              ‹
            </button>

            {/* Next Button (Right Center) */}
            <button
              onClick={goNext}
              className="absolute right-8 top-1/2 -translate-y-1/2 text-white text-[65px] opacity-70 hover:opacity-100"
            >
              ›
            </button>

            {/* Image + Counter */}
            <div className="flex flex-col items-center">
              <motion.img
                src={project.images[selectedIndex]}
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Counter Below Image */}
              <div className="mt-4 text-white text-sm bg-black/50 px-4 py-1 rounded-full">
                {selectedIndex + 1} of {project.images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= WHATSAPP ================= */}
      <a
        href="https://wa.me/9987221079?text=Hello%20WISETECH%20MEP%20CONSULTANT%20PVT.%20LTD.%2C%20I%E2%80%99m%20interested%20in%20your%20work%20on%20Our%20Projects%20at%20https%3A%2F%2Fwww.wisetech-mep.com%2F.%20Could%20you%20please%20share%20more%20details%20on%20how%20I%20engage%20your%20services%3F"
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

/* META COMPONENT */
function Meta({ icon, label, value }) {
  if (!value) return null;

  return (
    <div className="flex items-start gap-2">
      <span>{icon}</span>
      <div>
        <p className="uppercase tracking-widest text-[16px] text-black font-bold">
          {label}
          <span className="tracking-widest text-[15px] text-black font-normal">{value}</span>
        </p>
      </div>
    </div>
  );
}
