import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Building2,
  Hotel,
  Store,
  Hospital,
  ClipboardList,
  Landmark,
  Users,
  HardHat,
} from "lucide-react";

/* ================= CLIENT IMAGES ================= */
/* Architects */
import a1 from "../assets/clients/architects/1.jpg";
import a2 from "../assets/clients/architects/2.png";
import a3 from "../assets/clients/architects/3.png";
import a4 from "../assets/clients/architects/4.png";
import a5 from "../assets/clients/architects/5.jpg";
import a6 from "../assets/clients/architects/6.jpg";
import a7 from "../assets/clients/architects/7.gif";
import a8 from "../assets/clients/architects/8.jpg";
import a9 from "../assets/clients/architects/9.gif";
import a10 from "../assets/clients/architects/10.png";
import a11 from "../assets/clients/architects/11.png";
import a12 from "../assets/clients/architects/12.png";
import a13 from "../assets/clients/architects/13.png";
import a14 from "../assets/clients/architects/14.jpg";
import a15 from "../assets/clients/architects/15.png";
import a16 from "../assets/clients/architects/16.jpg";
import a17 from "../assets/clients/architects/17.png";
import a18 from "../assets/clients/architects/18.jpg";
import a19 from "../assets/clients/architects/19.jpg";
import a20 from "../assets/clients/architects/20.png";
import a21 from "../assets/clients/architects/21.png";
import a22 from "../assets/clients/architects/22.png";
import a23 from "../assets/clients/architects/23.png";
import a24 from "../assets/clients/architects/24.png";
import a25 from "../assets/clients/architects/25.jpg";
import a26 from "../assets/clients/architects/26.png";
import a27 from "../assets/clients/architects/27.png";
import a28 from "../assets/clients/architects/28.png";
import a29 from "../assets/clients/architects/29.jpg";
import a30 from "../assets/clients/architects/30.jpg";
import a31 from "../assets/clients/architects/31.png";
import a32 from "../assets/clients/architects/32.jpg";
import a33 from "../assets/clients/architects/33.jpg";
import a34 from "../assets/clients/architects/34.jpg";
import a35 from "../assets/clients/architects/35.jpg";
import a36 from "../assets/clients/architects/36.jpg";
import a37 from "../assets/clients/architects/37.jpg";
import a38 from "../assets/clients/architects/38.jpg";
import a39 from "../assets/clients/architects/39.png";
import a40 from "../assets/clients/architects/40.jpg";
import a41 from "../assets/clients/architects/41.jpg";
import a42 from "../assets/clients/architects/42.png";
import a43 from "../assets/clients/architects/43.png";
import a44 from "../assets/clients/architects/44.jpg";
import a45 from "../assets/clients/architects/45.jpg";
import a46 from "../assets/clients/architects/46.png";
import a47 from "../assets/clients/architects/47.jfif";
import a48 from "../assets/clients/architects/48.jpg";
import a49 from "../assets/clients/architects/49.png";

/* Hotel */
import h1 from "../assets/clients/hotel/1.jpg";
import h2 from "../assets/clients/hotel/2.jpg";
import h3 from "../assets/clients/hotel/3.png";
import h4 from "../assets/clients/hotel/4.png";
import h5 from "../assets/clients/hotel/5.jpg";
import h6 from "../assets/clients/hotel/6.jpg";
import h7 from "../assets/clients/hotel/7.jfif";
import h8 from "../assets/clients/hotel/8.png";

/* Store / Shops */
import s1 from "../assets/clients/store/1.jpg";
import s2 from "../assets/clients/store/2.jpg";
import s3 from "../assets/clients/store/3.jpg";
import s4 from "../assets/clients/store/4.jpg";

/* Hospital */
import ho1 from "../assets/clients/hospital/1.jpeg";
import ho2 from "../assets/clients/hospital/2.png";
import ho3 from "../assets/clients/hospital/3.jpg";
import ho4 from "../assets/clients/hospital/4.png";

/* PMC */
import p1 from "../assets/clients/pmc/1.jpg";
import p2 from "../assets/clients/pmc/2.jpg";
import p3 from "../assets/clients/pmc/3.jpg";
import p4 from "../assets/clients/pmc/4.jpg";

/* Government */
import g1 from "../assets/clients/government/1.jpeg";
import g2 from "../assets/clients/government/2.jpg";
import g3 from "../assets/clients/government/3.jpg";

/* Client */
import c1 from "../assets/clients/client/1.png";
import c2 from "../assets/clients/client/2.jpeg";
import c3 from "../assets/clients/client/3.jpg";
import c4 from "../assets/clients/client/4.png";
import c5 from "../assets/clients/client/5.png";
import c6 from "../assets/clients/client/6.png";
import c7 from "../assets/clients/client/7.jpeg";
import c8 from "../assets/clients/client/8.png";
import c9 from "../assets/clients/client/9.jpeg";
import c10 from "../assets/clients/client/10.png";
import c11 from "../assets/clients/client/11.png";
import c12 from "../assets/clients/client/12.png";
import c13 from "../assets/clients/client/13.png";
import c14 from "../assets/clients/client/14.jpg";
import c15 from "../assets/clients/client/15.png";
import c16 from "../assets/clients/client/16.jpg";
import c17 from "../assets/clients/client/17.png";
import c18 from "../assets/clients/client/18.png";
import c19 from "../assets/clients/client/19.jpg";
import c20 from "../assets/clients/client/20.jpg";

/* Builder */
import b1 from "../assets/clients/builder/1.jpg";
import b2 from "../assets/clients/builder/2.png";
import b3 from "../assets/clients/builder/3.png";
import b4 from "../assets/clients/builder/4.jpg";
import b5 from "../assets/clients/builder/5.jpg";
import b6 from "../assets/clients/builder/6.jpg";
import b7 from "../assets/clients/builder/7.jpg";
import b8 from "../assets/clients/builder/8.png";
import b9 from "../assets/clients/builder/9.jpg";
import b10 from "../assets/clients/builder/10.jpg";
import b11 from "../assets/clients/builder/11.jpg";
import b12 from "../assets/clients/builder/12.png";
import b13 from "../assets/clients/builder/13.gif";
import b14 from "../assets/clients/builder/14.jpg";
import b15 from "../assets/clients/builder/15.png";
import b16 from "../assets/clients/builder/16.png";
import b17 from "../assets/clients/builder/17.jpg";
import b18 from "../assets/clients/builder/18.png";
import b19 from "../assets/clients/builder/19.png";
import b20 from "../assets/clients/builder/20.jpg";
import b21 from "../assets/clients/builder/21.png";
import b22 from "../assets/clients/builder/22.jpg";
import b23 from "../assets/clients/builder/23.png";
import b24 from "../assets/clients/builder/24.png";
import b25 from "../assets/clients/builder/25.png";
import b26 from "../assets/clients/builder/26.png";
import b27 from "../assets/clients/builder/27.png";
import b28 from "../assets/clients/builder/28.png";
import b29 from "../assets/clients/builder/29.png";
import b30 from "../assets/clients/builder/30.png";

/* ================= CONFIG ================= */

const clientCategories = [
  { name: "Architects", icon: Building2 },
  { name: "Hotel", icon: Hotel },
  { name: "Store / Shops", icon: Store },
  { name: "Hospital", icon: Hospital },
  { name: "PMC", icon: ClipboardList },
  { name: "Government", icon: Landmark },
  { name: "Client", icon: Users },
  { name: "Builder", icon: HardHat },
];

const clientImages = {
  Architects: [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25, a26, a27, a28, a29, a30, a31, a32, a33, a34, a35, a36, a37, a38, a39, a40, a41, a42, a43, a44, a45, a46, a47, a48, a49],
  Hotel: [h1, h2, h3, h4, h5, h6, h7, h8],
  "Store / Shops": [s1, s2, s3, s4],
  Hospital: [ho1, ho2, ho3, ho4],
  PMC: [p1, p2, p3, p4],
  Government: [g1, g2, g3],
  Client: [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20],
  Builder: [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30],
};

/* ================= COMPONENT ================= */

export default function OurClients() {
  const [selectedClientCategory, setSelectedClientCategory] =
    useState("Architects");

  return (
    <section id="OurClients" className="bg-gray2 py-5">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-5">
          <span
            className="text-[45px] font-bold tracking-[0.1em]"
            style={{ fontFamily: "'Promethean', sans-serif" }}
          >
            <span className="text-blue">OUR </span>
            <span className="text-red">CLIENTS</span>
          </span>
          <p className="mt-1 text-black text-[19px]">
            Building lasting relationships with industry leaders across diverse sectors
          </p>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-4 mb-5">
          {clientCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedClientCategory(cat.name)}
                className={`px-5 py-3 rounded-lg text-[16px] font-bold transition flex items-center gap-2
                  ${selectedClientCategory === cat.name
                    ? "bg-red text-white"
                    : "bg-white border hover:border-red"
                  }`}
              >
                <Icon size={25} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* LOGO GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedClientCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-6
      xl:grid-cols-7
      gap-4
      mt-6
    ">
            {clientImages[selectedClientCategory]?.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="
          bg-white
          rounded-xl
          h-full
          w-full
          flex
          items-center
          justify-center
          p-3
          transition
        ">
                <img
                  src={img}
                  alt={`${selectedClientCategory} logo`}
                  className="
            h-20
            w-30
            object-contain
            transition"
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
