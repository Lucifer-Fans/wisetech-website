import { useState, useEffect } from "react";
import api from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Plane, PartyPopper, GraduationCap } from "lucide-react";

const BASE_URL = import.meta.env.REACT_APP_API_URL || "https://wisetech-backend.onrender.com";

/* CATEGORY CONFIG */
const categories = [
  { id: "sport", label: "Sports", icon: Trophy },
  { id: "outing", label: "Outing", icon: Plane },
  { id: "celebration", label: "Celebration", icon: PartyPopper },
  { id: "training", label: "Training", icon: GraduationCap },
];

export default function TeamFun() {
  const [teamMoments, setTeamMoments] = useState([]);
  const [activeCategory, setActiveCategory] = useState("sport");
  const [selectedIndex, setSelectedIndex] = useState(null);

  /* FETCH DATA */
  useEffect(() => {
    api.get("/team").then((res) => setTeamMoments(res.data || []));
  }, []);

  /* FILTER IMAGES */
  const visibleMoments = teamMoments
    .filter((item) => item.category === activeCategory)
    .flatMap((item) =>
      item.images.map((img, index) => ({
        id: `${item._id}-${index}`,
        title: item.title,
        image: img,
      }))
    );

  /* INFINITE NAVIGATION */
  const goPrev = () => {
    if (!visibleMoments.length) return;

    setSelectedIndex((prev) =>
      prev === 0 ? visibleMoments.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    if (!visibleMoments.length) return;

    setSelectedIndex((prev) =>
      prev === visibleMoments.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="TeamFun" className="bg-gray2 py-5">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 md:px-10 lg:px-14">

        {/* HEADING */}
        <div className="text-center mb-5">
          <span
            className="font-bold text-[45px] tracking-wide"
            style={{ fontFamily: "'Promethean', sans-serif" }}
          >
            <span className="text-blue">OUR TE</span>
            <span className="text-red">AM FUN</span>
          </span>
          <p className="text-[19px] text-black">
            Building strong bonds beyond work through shared experiences
          </p>
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCategory(c.id);
                setSelectedIndex(null); // close lightbox if category changes
              }}
              className={`px-5 py-3 rounded-lg text-[16px] font-bold transition flex items-center gap-2
                ${activeCategory === c.id
                  ? "bg-red text-white"
                  : "bg-white border hover:border-red"
                }`}
            >
              <c.icon size={22} />
              {c.label}
            </button>
          ))}
        </div>

        {/* COLLAGE */}
        {/* <div className="relative rounded-3xl border border-gray-300 bg-white p-6">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 space-y-3">
            {visibleMoments.map((m, index) => (
              <motion.div
                key={m.id}
                onClick={() => setSelectedIndex(index)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid mb-3 group relative overflow-hidden rounded-lg cursor-pointer"
              >
                <img
                  src={m.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div> */}
        <div className="relative rounded-3xl border border-gray-300 bg-white p-6">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {visibleMoments.map((m, index) => (
      <motion.div
        key={m.id}
        onClick={() => setSelectedIndex(index)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="group relative overflow-hidden rounded-xl cursor-pointer"
      >
        <img
          src={m.image}
          alt=""
          loading="lazy"
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
        />
      </motion.div>
    ))}
  </div>
</div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedIndex !== null && visibleMoments[selectedIndex] && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <motion.img
                key={visibleMoments[selectedIndex].id}
                src={visibleMoments[selectedIndex].image}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(event, info) => {
                  if (info.offset.x < -100) {
                    goNext();   // swipe left → next image
                  } else if (info.offset.x > 100) {
                    goPrev();   // swipe right → previous image
                  }
                }}
              />

              {/* Counter */}
              <div className="mt-4 text-white text-sm bg-black/50 px-4 py-1 rounded-full">
                {selectedIndex + 1} of {visibleMoments.length}
              </div>

              {/* Prev */}
              <button
                onClick={goPrev}
                className="hidden md:block absolute left-6 text-white text-[55px] opacity-70 hover:opacity-100"
              >
                ‹
              </button>

              {/* Next */}
              <button
                onClick={goNext}
                className="hidden md:block absolute right-6 text-white text-[55px] opacity-70 hover:opacity-100"
              >
                ›
              </button>

              {/* Close */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-6 right-6 bg-white p-2 rounded-full"
              >
                <X />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
