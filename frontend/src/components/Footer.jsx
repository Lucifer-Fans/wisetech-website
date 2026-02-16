import logo from "../assets/logo.png";
import logo1 from "../assets/logo1.png";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

export default function Footer() {
  return (
    <footer className="bg-gray2 pt-5 pb-5 mb-10">

      <div className="">
        <div className="md:col-span-3 flex flex-col items-center justify-center ">

          <div
            className="flex items-center gap-4">
            <img src={logo} alt="WISETECH" className="h-[60px]" />
            <img src={logo1} alt="WISETECH" className="h-[45px]" />
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex space-x-4 pt-2 pb-2">
            <a
              href="https://www.instagram.com/wisetechmep?igsh=bHlvYTQ3Mm9waXkw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group transition"
            >
              <Instagram size={30}
                className="text-black transition-all duration-300 group-hover:text-[#ab24bf] group-hover:scale-110"
              />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group transition"
            >
              <Linkedin size={30}
                className="text-black transition-all duration-300 group-hover:text-blue group-hover:scale-110"
              />
            </a>

            <a
              href="https://youtube.com/@wisetech7629?si=rcqGvF19yF7PQIVN"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="group transition"
            >
              <Youtube size={32}
                className="text-black transition-all duration-300 group-hover:text-red group-hover:scale-110"
              />
            </a>
          </div>
        </div>
        <div className="text-center text-[15px] text-black border-t border-black pt-2">
          © 2025 <span className="text-blue font-medium">WISE</span><span className="text-red font-medium">TECH</span> <span className="text-[#4f4b48] font-medium">MEP Consultants.</span> All rights reserved.
        </div>
      </div>
    </footer>
  );
}