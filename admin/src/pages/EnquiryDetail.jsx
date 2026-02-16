import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  MailOpen,
  Smartphone,
  UserRound,
  NotebookText,
  Reply,
  FileTextIcon,
} from "lucide-react";

export default function EnquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [enquiry, setEnquiry] = useState(null);

  // Fetch current enquiry
  useEffect(() => {
    axios
      .get(`https://wisetech-backend.onrender.com/api/enquiries/${id}`)
      .then((res) => setEnquiry(res.data));
  }, [id]);

  const goBack = () => {
    navigate("/inbox", {
      state: location.state,
    })
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        goBack();
      }
      if (e.key.toLowerCase() === "r") {
        handleReply(); // Reply
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enquiry]);

  if (!enquiry) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-black text-[18px] animate-pulse">
          Loading enquiry details...
        </p>
      </div>
    );
  }

  const handleReply = () => {
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${enquiry.email
      }&su=RE: ${enquiry.purpose}&body=Hi ${enquiry.name},%0D%0A%0D%0A`;
    window.open(gmailURL, "_blank");
  };

  return (
    <div className="bg-white min-h-screen py-4 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded p-6 shadow-lg relative">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-black hover:text-blue transition text-[15px]"
          >
            ← Back to Inbox
          </button>
        </div>

        {/* Enquiry Content */}
        <div className="max-w-3xl mx-auto space-y-6 text-black text-[18px] leading-relaxed">
          <div className="grid grid-cols-[24px_auto] gap-2 items-start">
            <UserRound size={24} className="text-blue" />
            <p>
              <span className="font-bold">Name:</span> {enquiry.name}
            </p>

            <Smartphone size={24} className="text-blue" />
            <p>
              <span className="font-bold">Phone:</span> {enquiry.phone}
            </p>

            <MailOpen size={24} className="text-red" />
            <p>
              <span className="font-bold">Email:</span> {enquiry.email}
            </p>

            <NotebookText size={24} className="text-blue" />
            <p>
              <span className="font-bold">Purpose:</span> {enquiry.purpose}
            </p>

            <FileTextIcon size={24} className="text-red" />
            <p>
              <span className="font-bold">Message: </span>{" "}
              <span className="whitespace-pre-wrap">{enquiry.message}</span>
            </p>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={handleReply}
              className="inline-flex items-center gap-2 bg-blue hover:bg-red hover:scale-105 transition-transform text-white px-6 py-3 rounded-xl shadow-md"
            >
              <Reply size={24} />
              Reply via Gmail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
