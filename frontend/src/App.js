import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import OurProjects from "./components/OurProjects";
import News from "./components/News";
import TeamFun from "./components/TeamFun";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ClientsMarquee from "./components/ClientsMarquee";
import OurClients from "./components/OurClients";

import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      document
        .getElementById(location.state.scrollTo)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <Home />
      <ClientsMarquee />
      <AboutUs />
      <OurProjects />
      <OurClients />
      <News />
      <TeamFun />
      <Contact />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:category" element={<Projects />} />
        <Route path="/projects/:category/:slug" element={<ProjectDetail />} />
      </Routes>
      <Footer />
      <ClientsMarquee />
    </div>
    </BrowserRouter>
  );
}

export default App;