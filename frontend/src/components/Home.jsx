import { useState, useEffect, useRef } from "react";
import {
  FolderCheck,
  Users,
  Clock,
  UsersRound,
  Briefcase,
} from "lucide-react";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Slider Images
import slider1 from "../assets/slider/slider1.jpg";
import slider2 from "../assets/slider/slider2.jpg";
import slider3 from "../assets/slider/slider3.jpg";
import slider4 from "../assets/slider/slider4.jpg";
import slider5 from "../assets/slider/slider5.jpg";
import slider6 from "../assets/slider/slider6.jpg";
import slider7 from "../assets/slider/slider7.jpg";
import slider8 from "../assets/slider/slider8.jpg";
import slider9 from "../assets/slider/slider9.jpg";
import slider10 from "../assets/slider/slider10.jpeg";
import slider11 from "../assets/slider/slider11.jpg";
import slider12 from "../assets/slider/slider12.png";
import slider13 from "../assets/slider/slider13.jpg";
import slider14 from "../assets/slider/slider14.jpg";

/* ================= SLIDER DATA ================= */
const sliderImages = [slider1, slider2, slider3, slider4, slider5, slider6, slider7, slider8, slider9, slider10, slider11, slider12, slider13, slider14];

const slides = sliderImages.map((img, index) => ({
  id: index,
  src: img,
}));

/* ================= KPI COUNTER ================= */
function AnimatedCounter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start;
    const animate = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, end, duration]);

  return <div ref={ref}>{count}{suffix}</div>;
}

/* ================= KPI DATA ================= */
const kpis = [
  {
    icon: Briefcase,
    value: 650,
    suffix: "+",
    label: "Total Projects",
    color: "bg-blue",
  },
  {
    icon: FolderCheck,
    value: 450,
    suffix: "+",
    label: "Projects Completed",
    color: "bg-red",
  },
  {
    icon: Users,
    value: 100,
    suffix: "+",
    label: "Clients",
    color: "bg-blue",
  },
  {
    icon: Clock,
    value: 20,
    suffix: "+",
    label: "Years of Experience",
    color: "bg-red",
  },
  {
    icon: UsersRound,
    value: 35,
    suffix: "+",
    label: "Team Strength",
    color: "bg-blue",
  },
];

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="Home">

      {/* ================= SLIDER ================= */}
      <div className="">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          loop
        >
          {slides.map((s) => (
            <SwiperSlide key={s.id}>
              <img
                src={s.src}
                className="w-full h-[85vh] sm:h-[75vh] md:h-[80vh] lg:h-[90vh] object-cover"
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= KPI SECTION ================= */}
      <section className="bg-gray2">
        <div className="max-w-6xl mx-auto px-6 sm:px-6 md:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {kpis.map((kpi, i) => (
              <div
                key={i}
                className=""
              >

                <div className="relative py-5 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-0 rounded-full
                    ${kpi.color} flex items-center justify-center`}
                  >
                    <kpi.icon className="text-white" size={30} />
                  </div>

                  <div className="text-4xl sm:text-4xl md:text-[45px] font-bold text-red"
                    style={{ fontFamily: "'Promethean', sans-serif" }}
                  >
                    <AnimatedCounter end={kpi.value} suffix={kpi.suffix} />
                  </div>

                  <p className="text-blue font-bold text-[19px]"
                  >{kpi.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
