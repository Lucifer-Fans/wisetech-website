// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import logo from "../assets/logo.png";
// import logo1 from "../assets/logo1.png";
// import {
//   Home,
//   Info,
//   Briefcase,
//   Newspaper,
//   Users,
//   Mail,
// } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const navItems = [
//     { key: "Home", label: "Home", icon: <Home size={18} /> },
//     { key: "AboutUs", label: "About Us", icon: <Info size={18} /> },
//     { key: "OurProjects", label: "Our Projects", icon: <Briefcase size={18} /> },
//     { key: "OurClients", label: "Our Client", icon: <Users size={18} /> },
//     { key: "News", label: "News", icon: <Newspaper size={18} /> },
//     { key: "TeamFun", label: "Our Team Fun", icon: <Users size={18} /> },
//     { key: "Contact", label: "Contact", icon: <Mail size={18} /> },
//   ];

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 80);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleNavClick = (key) => {
//     if (location.pathname !== "/") {
//       navigate("/", { state: { scrollTo: key } });
//     } else {
//       document.getElementById(key)?.scrollIntoView({ behavior: "smooth" });
//     }
//     setIsOpen(false);
//   };

//   return (
//     <nav
//       className={`w-full z-50 transition-all duration-300 ${scrolled
//           ? "fixed top-0 bg-white shadow-md"
//           : "absolute top-0 bg-transparent"
//         }`}
//     >
//       <div className="max-w-9xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-1">

//         {/* Desktop */}
//         <div className="hidden md:flex items-center justify-between">

//           <div className="flex items-center gap-3 lg:gap-4">
//             <img src={logo} alt="WISETECH" className="h-10 sm:h-12 lg:h-[70px]" />
//             <img src={logo1} alt="WISETECH" className="h-8 sm:h-10 lg:h-[55px]" />
//           </div>

//           <div className="flex items-center text-lg font-bold">
//             {navItems.map((item, index) => (
//               <div key={item.key} className="flex items-center">
//                 <button
//                   onClick={() => handleNavClick(item.key)}
//                   className="relative flex items-center gap-2 px-2 lg:px-3 text-blue hover:text-red transition           
//                   transition-colors duration-300
//                   after:absolute after:left-0 after:-bottom-2
//                   after:h-[3px] after:w-0
//                   after:bg-red
//                   after:rounded-full
//                   after:transition-all after:duration-300
//                   hover:after:w-full"
//                 >
//                   {item.icon}
//                   {item.label}
//                 </button>
//                 {index !== navItems.length - 1 && (
//                   <span className="text-blue hidden lg:block">|</span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Mobile */}
//         <div className="md:hidden flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <img src={logo} className="h-10" />
//             <img src={logo1} className="h-8" />
//           </div>

//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="p-2 rounded-full text-[21px] text-blue"
//           >
//             {isOpen ? "✕" : "☰"}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"
//             }`}
//         >
//           <div className="flex flex-col bg-white shadow-md rounded-b-lg">
//             {navItems.map((item) => (
//               <button
//                 key={item.key}
//                 onClick={() => handleNavClick(item.key)}
//                 className="py-2 px-6 text-left text-l font-bold text-blue hover:text-red"
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import logo1 from "../assets/logo1.png";
import {
  Home,
  Info,
  Briefcase,
  Newspaper,
  Users,
  Mail,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: "Home", label: "Home", icon: <Home size={18} /> },
    { key: "AboutUs", label: "About Us", icon: <Info size={18} /> },
    { key: "OurProjects", label: "Our Projects", icon: <Briefcase size={18} /> },
    { key: "OurClients", label: "Our Client", icon: <Users size={18} /> },
    { key: "News", label: "News", icon: <Newspaper size={18} /> },
    { key: "TeamFun", label: "Our Team Fun", icon: <Users size={18} /> },
    { key: "Contact", label: "Contact", icon: <Mail size={18} /> },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (key) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: key } });
    } else {
      document.getElementById(key)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`w-full z-50 transition-all duration-300 ${
        scrolled
          ? "fixed top-0 bg-white shadow-md"
          : "absolute top-0 bg-transparent"
      }`}
    >
      <div className="max-w-9xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-1">

        {/* Desktop (Visible ≥ 1250px) */}
        <div className="hidden min-[1500px]:flex items-center justify-between">

          <div className="flex items-center gap-3 lg:gap-4">
            <img src={logo} alt="WISETECH" className="h-10 sm:h-12 lg:h-[70px]" />
            <img src={logo1} alt="WISETECH" className="h-8 sm:h-10 lg:h-[55px]" />
          </div>

          <div className="flex items-center text-lg font-bold">
            {navItems.map((item, index) => (
              <div key={item.key} className="flex items-center">
                <button
                  onClick={() => handleNavClick(item.key)}
                  className="relative flex items-center gap-2 px-2 lg:px-3 text-blue hover:text-red transition           
                  transition-colors duration-300
                  after:absolute after:left-0 after:-bottom-2
                  after:h-[3px] after:w-0
                  after:bg-red
                  after:rounded-full
                  after:transition-all after:duration-300
                  hover:after:w-full"
                >
                  {item.icon}
                  {item.label}
                </button>
                {index !== navItems.length - 1 && (
                  <span className="text-blue hidden lg:block">|</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile (Visible < 1250px) */}
        <div className="min-[1500px]:hidden flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} className="h-10" />
            <img src={logo1} className="h-8" />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full text-[21px] text-blue"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`min-[1500px]:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="flex flex-col bg-white shadow-md rounded-b-lg">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className="py-2 px-6 text-left text-l font-bold text-blue hover:text-red"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </nav>
  );
}
