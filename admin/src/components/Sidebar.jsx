import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Image,
  Newspaper,
  Mail,
  LogOut,
} from "lucide-react";
import { logout } from "../auth/useAuth";
import logo from "../assets/logo.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? "bg-red font-bold" : "bg-blue";

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="bg-white p-2 flex justify-between items-center md:hidden fixed top-0 left-0 right-0 z-50">
        <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 flex flex-col justify-between`}
      >
        <div className="flex-1 overflow-y-auto">
          {/* DESKTOP HEADER */}
          <div className="hidden md:flex items-center justify-center p-2 border-b">
            <NavLink to="/">
              <img src={logo} alt="Wisetech Logo" className="h-17 object-contain" />
            </NavLink>
          </div>

          <ul className="mt-2">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={`flex items-center p-4 text-[18px] ${isActive("/")}`}
              >
                <LayoutDashboard size={20} className="mr-2" />
                Project Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/team"
                onClick={() => setIsOpen(false)}
                className={`flex items-center p-4 text-[18px] ${isActive("/team")}`}
              >
                <Image size={20} className="mr-2" />
                Team Fun Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/news"
                onClick={() => setIsOpen(false)}
                className={`flex items-center p-4 text-[18px] ${isActive("/news")}`}
              >
                <Newspaper size={20} className="mr-2" />
                News Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/inbox"
                onClick={() => setIsOpen(false)}
                className={`flex items-center p-4 text-[18px] ${isActive("/inbox")}`}
              >
                <Mail size={20} className="mr-2" />
                Inbox
              </NavLink>
            </li>
          </ul>
        </div>

        <button
          onClick={() => logout(navigate)}
          className="flex items-center p-4 m-2 bg-blue text-black rounded hover:bg-red text-[18px]"
        >
          <LogOut size={20} className="mr-2" />
          Logout
        </button>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}