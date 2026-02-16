import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Inbox from "./pages/Inbox";
import EnquiryDetail from "./pages/EnquiryDetail";
import ProjectDashboard from "./pages/Projects/ProjectDashboard";
import UploadProject from "./pages/Projects/UploadProject";
import TeamDashboard from "./pages/Team/TeamDashboard";
import UploadTeam from "./pages/Team/UploadTeam";
import NewsDashboard from "./pages/News/NewsDashboard";
import UploadNews from "./pages/News/UploadNews";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-white">
                <Sidebar />

                {/* MAIN CONTENT */}
                <main className="flex-1 md:ml-64 p-4 sm:p-6 pt-20 md:pt-6">
                  <Routes>
                    <Route path="/" element={<ProjectDashboard />} />
                    <Route path="/upload/project" element={<UploadProject />} />
                    <Route path="/upload/project/:id" element={<UploadProject />} />

                    <Route path="/team" element={<TeamDashboard />} />
                    <Route path="/upload/team" element={<UploadTeam />} />

                    <Route path="/news" element={<NewsDashboard />} />
                    <Route path="/upload/news" element={<UploadNews />} />

                    <Route path="/inbox" element={<Inbox />} />
                    <Route path="/enquiry/:id" element={<EnquiryDetail />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

