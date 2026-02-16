import companyImg from "../assets/company.png";
import directorImg from "../assets/director.png";
import {
  Zap,
  Droplet,
  Wind,
  Boxes,
  Building2,
  Flame,
  Cpu,
  ClipboardCheck
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= ANIMATION VARIANTS ================= */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

/* ================= SERVICES DATA ================= */
const services = [
  {
    icon: Building2,
    title: "MEP Coordination",
    description: "Comprehensive coordination of all MEP systems for seamless integration.",
    features: ["BIM Modeling", "3D Coordination", "Clash Detection"],
    theme: {
      card: "bg-blue/10 hover:bg-blue/20 border-blue/30",
      iconBg: "bg-blue/20 group-hover:bg-blue",
      iconColor: "text-blue group-hover:text-white",
      dot: "bg-blue",
    },
  },
  {
    icon: Wind,
    title: "HVAC Solutions",
    description: "Energy-efficient heating, ventilation, and air conditioning system design.",
    features: ["Climate Control", "Ventilation", "Energy Efficiency"],
    theme: {
      card: "bg-red/10 hover:bg-red/20 border-red/30",
      iconBg: "bg-red/20 group-hover:bg-red",
      iconColor: "text-red group-hover:text-white",
      dot: "bg-red",
    },
  },
  {
    icon: Zap,
    title: "Electrical Engineering",
    description: "Complete electrical design, installation, and maintenance for all project types.",
    features: ["Power Distribution", "Lighting Design", "Emergency Systems"],
    theme: {
      card: "bg-blue/10 hover:bg-blue/20 border-blue/30",
      iconBg: "bg-blue/20 group-hover:bg-blue",
      iconColor: "text-blue group-hover:text-white",
      dot: "bg-blue",
    },
  },
  {
    icon: Droplet,
    title: "Plumbing Systems",
    description: "Advanced plumbing solutions including water supply, drainage, and fire protection.",
    features: ["Water Supply", "Drainage Systems", "Fire Protection"],
    theme: {
      card: "bg-red/10 hover:bg-red/20 border-red/30",
      iconBg: "bg-red/20 group-hover:bg-red",
      iconColor: "text-red group-hover:text-white",
      dot: "bg-red",
    },
  },
  {
    icon: Boxes,
    title: "Building Information Modeling (BIM)",
    description: "Digital coordination of building systems using intelligent 3D models across the project lifecycle.",
    features: ["BIM Modeling", "3D Coordination", "Clash Detection"],
    theme: {
      card: "bg-blue/10 hover:bg-blue/20 border-blue/30",
      iconBg: "bg-blue/20 group-hover:bg-blue",
      iconColor: "text-blue group-hover:text-white",
      dot: "bg-blue",
    },
  },
  {
    icon: Flame,
    title: "Fire Protection System",
    description: "Design and coordination of fire safety systems in compliance with applicable codes and standards.",
    features: ["Fire System Design", "Code Compliance", "System Integration"],
    theme: {
      card: "bg-red/10 hover:bg-red/20 border-red/30",
      iconBg: "bg-red/20 group-hover:bg-red",
      iconColor: "text-red group-hover:text-white",
      dot: "bg-red",
    },
  },
  {
    icon: Cpu,
    title: "Intelligent Building Management System (IBMS)",
    description: "Centralized monitoring and control of building services for efficient and automated operation.",
    features: ["Centralized Monitoring", "Automated Controls", "Energy Optimization"],
    theme: {
      card: "bg-blue/10 hover:bg-blue/20 border-blue/30",
      iconBg: "bg-blue/20 group-hover:bg-blue",
      iconColor: "text-blue group-hover:text-white",
      dot: "bg-blue",
    },
  },
  {
    icon: ClipboardCheck,
    title: "3rd Party Testing & Audit",
    description: "Independent evaluation of building systems to verify performance, safety, and compliance.",
    features: ["System Testing", "Performance Verification", "Compliance Audits"],
    theme: {
      card: "bg-red/10 hover:bg-red/20 border-red/30",
      iconBg: "bg-red/20 group-hover:bg-red",
      iconColor: "text-red group-hover:text-white",
      dot: "bg-red",
    },
  },
];

/* ================= COMPONENT ================= */
export default function AboutUs() {
  return (
    <section id="AboutUs" className="bg-gray2 py-5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 md:px-10">

        {/* ================= ABOUT US LABEL (CENTER ONLY) ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-bold text-[45px] uppercase tracking-[0.1em]"
            style={{ fontFamily: "'Promethean', sans-serif" }}
          >
            <span className="text-blue">ABOUT</span>{" "}
            <span className="text-red">US</span>
          </span>
        </motion.div>

        {/* ================= COMPANY INFO ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-14"
        >
          {/* LEFT CONTENT (UNCHANGED HEADING POSITION) */}
          <motion.div variants={slideLeft} className="space-y-5">
            <h2 className="text-[34px] font-bold text-blue leading-tight">
              Building the Future with Expert Engineering
            </h2>

            <p className="text-[19px] text-black leading-relaxed">
              <b
                style={{ fontFamily: "'Promethean', sans-serif" }}
              >
                <span className="text-blue text-[25px]">wISE</span>
                <span className="text-red text-[25px]">TECH </span>
              </b>
              <b className="text-[#4f4b48]">MEP Consultants Pvt. Ltd. </b>
              is a Mumbai-based design consulting firm and a leading provider of Mechanical, Electrical, Plumbing, and Fire Fighting (MEP & FF) design services. The firm is driven by a strong focus on continuous improvement, efficient design solutions, and value engineering to achieve optimal performance and cost-effective project delivery.
            </p>

            <p className="text-[19px] text-black leading-relaxed">
              The company offers MEP consultancy services for a diverse range of projects including commercial developments such as office buildings, IT complexes, campuses and SEZs, as well as residential high-rise buildings, residential developments and townships. Its expertise also extends to institutional buildings, hospitality projects including hotels and hospitals, entertainment zones like malls, multiplexes and studios, engineering industries, shopping complexes, computer and research establishments, laboratories, banks, with project execution across India and overseas.
            </p>
          </motion.div>

          {/* RIGHT IMAGE GRID (MATCH IMAGE-1) */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <img
                src={companyImg}
                alt="Company"
                className="h-full w-full object-cover transition-all duration-500 hover:scale-110"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ================= SERVICES ================= */}
        <section id="services" className="py-5">
          <div className="">
            <div className="text-center mb-5">
              <span className="font-bold text-[45px] tracking-[0.1em]"
                style={{ fontFamily: "'Promethean', sans-serif" }}
              >
                <span className="text-blue">OUR</span>{" "}
                <span className="text-red">SERVICES</span>
              </span>
              <h2 className="text-[35px] font-bold text-blue">Comprehensive MEP Solutions</h2>
              <p className="mt-2 text-[19px] text-black">
                We provide end-to-end MEP engineering services tailored to your project requirements
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`
        group
        rounded-2xl
        p-8
        border
        transition-all duration-300
        hover:-translate-y-1
        ${service.theme.card}
      `}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center mb-5 transition-colors
        ${service.theme.iconBg}`}
                  >
                    <service.icon
                      size={30}
                      className={`transition-colors ${service.theme.iconColor}`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className={`text-[21px] font-bold mb-3 ${service.theme.iconColor}`}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-black mb-3">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-black">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-2 ${service.theme.dot}`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= DIRECTOR HEADING (CENTER) ================= */}
        <div className="py-5">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-blue font-bold text-[40px] sm:text-4xl md:text-[45px] uppercase tracking-[0.1em]"
              style={{ fontFamily: "'Promethean', sans-serif" }}
            >
              Leadership
            </span>
            <h2 className="text-[35px] font-bold text-red ">
              <span className="text-blue">Message from</span>{" "}
              <span className="text-red">Our Director</span>
            </h2>
          </motion.div>

          {/* ================= DIRECTOR CONTENT ================= */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-14 items-center py-5"
          >
            {/* IMAGE */}
            <motion.div variants={slideLeft} className="relative">
              <div className="">
                <img
                  src={directorImg}
                  className="h-full w-full object-cover transition-all duration-500 hover:scale-105 rounded-[20px]"
                />

              </div>
            </motion.div>

            {/* MESSAGE */}
            <motion.div variants={slideRight} className="relative">
              <div
                className="
    bg-white/10
    rounded-2xl
    border border-white/20
    p-8
    transition-all duration-300 ease-out
    hover:bg-white/20
    hover:border-white/30">
                <p className="text-[19px] text-black mb-3">
                  “At
                  <b
                    style={{ fontFamily: "'Promethean', sans-serif" }}
                  >
                    <span className="text-blue text-[25px]"> wISE</span>
                    <span className="text-red text-[25px]">TECH </span>
                  </b>
                  <b className="text-[#4f4b48]">MEP Consultants Pvt. Ltd. </b>
                  we believe that excellence is not just a goal,
                  but a continuous journey. Our commitment to delivering world-class
                  MEP engineering solutions has been the cornerstone of our
                  success.”
                </p>

                <p className="text-[19px] text-black leading-relaxed mb-3">
                  We take pride in our team of skilled engineers who bring
                  innovation, precision, and dedication to every project.
                </p>

                <div className="pt-4 border-t">
                  <p className="text-[21px] font-bold text-blue">
                    Mohd Mobeen
                  </p>
                  <p className="text-black text-[19px]">Managing Director</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
