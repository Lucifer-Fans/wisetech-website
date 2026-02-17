import { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import { Calendar, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineReload,
} from "react-icons/ai";

export default function News() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  /* ===== LIGHTBOX STATE ===== */
  const [selectedImage, setSelectedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const containerRef = useRef(null);
  const startRef = useRef({ x: 0, y: 0 });
  const lastRef = useRef({ x: 0, y: 0 });

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 5;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/news");
        setNewsArticles(res.data || []);
      } catch (error) {
        console.error("Failed to fetch news", error);
      }
    };
    fetchNews();
  }, []);

  /* ===== ZOOM HELPERS ===== */
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  const clampPosition = (x, y, scale) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x, y };

    const maxX = ((scale - 1) * rect.width) / 2;
    const maxY = ((scale - 1) * rect.height) / 2;

    return {
      x: clamp(x, -maxX, maxX),
      y: clamp(y, -maxY, maxY),
    };
  };

  const zoom = (delta) => {
    setScale((prev) => {
      const next = clamp(prev + delta, MIN_ZOOM, MAX_ZOOM);
      setPosition((pos) =>
        next === 1 ? { x: 0, y: 0 } : clampPosition(pos.x, pos.y, next)
      );
      return next;
    });
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const onMouseDown = (e) => {
    if (scale === 1) return;
    setDragging(true);
    startRef.current = { x: e.clientX, y: e.clientY };
    lastRef.current = position;
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    setPosition(
      clampPosition(
        lastRef.current.x + dx,
        lastRef.current.y + dy,
        scale
      )
    );
  };

  const onMouseUp = () => setDragging(false);

  const onWheel = (e) => {
    e.preventDefault();
    zoom(e.deltaY > 0 ? -0.2 : 0.2);
  };

  return (
    <section id="News" className="py-5 bg-gray2">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 md:px-10">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-5">
          <span className="font-bold text-[45px] tracking-[0.1em]"
            style={{ fontFamily: "'Promethean', sans-serif" }}
          >
            <span className="text-blue">OUR </span>{" "}
            <span className="text-red ">NEwS</span>
          </span>
          <p className="mt-1 text-[19px] text-black">
            Stay updated with our latest projects, achievements, and company announcements
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles
            .filter(
              (article) =>
                article &&
                article.title &&
                (article.image || article.shortdescription)
            )
            .map((article) => (
              <motion.div
                key={article._id || article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => setSelectedArticle(article)}
                className="group bg-white rounded-xl overflow-hidden border"
              >
                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(article.image);
                      resetZoom();
                    }}
                  />
                  {article.category && (
                    <span className="absolute top-4 left-4 bg-red text-white px-3 py-1 rounded-full text-[14px] font-bold">
                      {article.category}
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  {article.date && (
                    <div className="flex items-center text-[16px] text-black mb-3">
                      <Calendar size={20} className="mr-2" />
                      {article.date}
                    </div>
                  )}

                  <h3 className="text-[21px] font-bold text-blue mb-3 group-hover:text-red transition uppercase">
                    {article.title}
                  </h3>

                  <p className="text-black text-[16px] line-all mb-3">
                    {article.shortdescription}
                  </p>

                  {article.link && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setVideoUrl(article.link);
                      }}
                      className="inline-flex items-center text-[16px] font-bold text-blue hover:text-red transition"
                    >
                      VIEW FULL ARTICLE
                      <ExternalLink size={18} className="ml-1" />
                    </button>
                  )}
                  {videoUrl && (
                    <div className="fixed inset-0 bg-black/10 flex items-center justify-center">
                      <div className="relative w-[100%] max-w-6xl aspect-video rounded-lg overflow-hidden">

                        {/* Close */}
                        <button
                          onClick={() => setVideoUrl(null)}
                          className="absolute top-[-10px] right-2 text-white text-[35px]"
                        >
                          ×
                        </button>

                        {/* YouTube Player */}
                        <iframe
                          src={videoUrl.replace("watch?v=", "embed/")}
                          title="YouTube video"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* ================= LIGHTBOX ================= */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center">
          <div
            ref={containerRef}
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            className="relative max-w-3xl w-full h-[750px] flex items-center justify-center"
          >
            <img
              src={selectedImage}
              draggable={false}
              className="max-w-full max-h-full object-contain select-none"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: dragging ? "none" : "transform 0.25s ease",
                cursor: scale > 1 ? "grab" : "default",
              }}
            />

            {/* Controls */}
            <div className="absolute top-0 right-4 flex flex-col gap-3">
              <button className="bg-white p-2 rounded" onClick={() => zoom(0.2)}>
                <AiOutlinePlus size={20} />
              </button>
              <button className="bg-white p-2 rounded" onClick={() => zoom(-0.2)}>
                <AiOutlineMinus size={20} />
              </button>
              <button className="bg-white p-2 rounded" onClick={resetZoom}>
                <AiOutlineReload size={20} />
              </button>
            </div>

            {/* Close */}
            <button
              className="absolute top-[-20px] left-4 text-white text-[35px]"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
