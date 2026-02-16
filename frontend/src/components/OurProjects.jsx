import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/* ===========================
   CATEGORY IMAGES (PROJECTS)
=========================== */
import internationalprojects from "../assets/categories/internationalprojects.png";
import specialdesign from "../assets/categories/specialdesign.jpg";
import greenbldg from "../assets/categories/greenbldg.jpg";
import heritagebldg from "../assets/categories/heritagebldg.jpg";
import government from "../assets/categories/government.jpg";
import mivanformwork from "../assets/categories/mivanformwork.png";
import electricalaudit from "../assets/categories/electricalaudit.png";
import moefcrz from "../assets/categories/moefcrz.png";
import highrise from "../assets/categories/highrise.jpg";
import commercialbldg from "../assets/categories/commercialbldg.png";
import townshipplanning from "../assets/categories/townshipplanning.png";
import residentialbldg from "../assets/categories/residentialbldg.jpg";
import brd from "../assets/categories/brd.png";
import hotelandrestaurant from "../assets/categories/hotelandrestaurant.jpg";
import hospital from "../assets/categories/hospital.jpg";
import mall from "../assets/categories/mall.png";
import industrial from "../assets/categories/industrial.jpeg";
import institutional from "../assets/categories/institutional.jpg";
import religiousmonuments from "../assets/categories/religiousmonuments.jpg";
import interior from "../assets/categories/interior.jpg";

/* ===========================
   SLUG FUNCTION (URL SAFE)
=========================== */
const createSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")          // Replace &
    .replace(/[^\w\s-]/g, "")      // Remove special chars
    .replace(/\s+/g, "-");         // Replace spaces with -
};

/* ===========================
   PROJECT CATEGORIES
=========================== */
const rawCategories = [
  { name: "International Projects", img: internationalprojects },
  { name: "Special Design", img: specialdesign },
  { name: "Green Building", img: greenbldg },
  { name: "Heritage Building", img: heritagebldg },
  { name: "Government", img: government },
  { name: "Mivan Formwork", img: mivanformwork },
  { name: "Electrical Audit", img: electricalaudit },
  { name: "MOEF / CRZ", img: moefcrz },
  { name: "High Rise", img: highrise },
  { name: "Commercial Building", img: commercialbldg },
  { name: "Township Planning", img: townshipplanning },
  { name: "Residential Building", img: residentialbldg },
  { name: "Bungalows + Rowhouse + Duplex", img: brd },
  { name: "Hotel & Restaurant", img: hotelandrestaurant },
  { name: "Hospital", img: hospital },
  { name: "Mall", img: mall },
  { name: "Industrial", img: industrial },
  { name: "Institutional", img: institutional },
  { name: "Religious Monuments", img: religiousmonuments },
  { name: "Interior", img: interior }
];

/* Add slug automatically */
const categories = rawCategories.map((cat) => ({
  ...cat,
  slug: createSlug(cat.name),
}));

export default function OurProjects() {
  const [visible, setVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);

  /* ===========================
     RESTORE SHOW ALL STATE
  =========================== */
  useEffect(() => {
    const stored = sessionStorage.getItem("showAllProjects");
    if (stored === "true") {
      setShowAll(true);
    }

    // Reset only on refresh
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("showAllProjects");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  /* ===========================
     INTERSECTION OBSERVER
  =========================== */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* ===========================
       SHOW ONLY 6 INITIALLY
    =========================== */
  const visibleCategories = showAll
    ? categories
    : categories.slice(0, 9);

  return (
    <>
      {/* ===========================
          OUR PROJECTS SECTION
      =========================== */}
      <section id="OurProjects" className="bg-gray2 py-5">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 md:px-10">

          {/* HEADING */}
          <h2
            className="text-[45px] font-bold text-center mb-5 tracking-[0.1em]"
            style={{ fontFamily: "'Promethean', sans-serif" }}
          >
            <span className="text-blue">OUR </span>
            <span className="text-red">PROJECTS</span>
          </h2>

          {/* PROJECT GRID */}
          <div
            ref={ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {visibleCategories.map((cat, i) => (
              <Link
                key={i}
                to={`/projects/${cat.slug}`}
                className={`group cursor-pointer rounded-xl overflow-hidden
                  transition-all duration-700
                  ${visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                  }`}
              >
                <div className="relative h-[330px] group">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />

                  {/* Bottom overlay (always visible) */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/40 flex items-center justify-between px-6">

                    {/* Category name */}
                    <span className="text-blue text-[21px] font-bold tracking-wider">
                      {cat.name}
                    </span>

                    {/* Arrow */}
                    <ArrowRight className="text-blue w-7 h-7" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* VIEW MORE BUTTON */}
          {!showAll && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  setShowAll(true);
                  sessionStorage.setItem("showAllProjects", "true");
                }}
                className="group flex items-center gap-4 px-8 py-4
                         bg-blue text-white text-[18px] font-bold
                         rounded-full transition-all duration-300
                         hover:bg-red"
              >
                View More Projects
                <ArrowRight
                  size={24}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}