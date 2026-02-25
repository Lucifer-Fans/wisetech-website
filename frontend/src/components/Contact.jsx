import { useState, useEffect } from "react";
import api from "../api/axios";
import { Phone, MapPin, Mail } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

export default function Contact() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    purpose: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

  const isFormValid =
    data.name &&
    data.phone.length === 10 &&
    isEmailValid &&
    data.purpose &&
    data.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    const whatsappMessage = `New Enquiry:
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Purpose: ${data.purpose}
Message: ${data.message}`;

    try {
      setLoading(true);

      await api.post("/enquiries", {
        name: data.name,
        phone: data.phone,
        phone: data.phone,
        email: data.email,
        purpose: data.purpose,
        message: data.message,
      });

      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "We’ll contact you shortly.",
        confirmButtonColor: "#9e312c",
        showConfirmButton: true,
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          const url = `https://wa.me/919987221079?text=${encodeURIComponent(whatsappMessage)}`;
          window.open(url, "_blank", "noopener, noreferrer");
        }
      });

      setData({
        name: "",
        phone: "",
        email: "",
        purpose: "",
        message: "",
      });
    } catch (error) {
      console.error("Enquiry failed:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#9e312c",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="Contact" className="bg-gray2 py-5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-14 px-6 sm:px-6 md:px-10">

        {/* LEFT SECTION */}
        <div
          data-aos="fade-right"
          className="group w-full lg:w-1/2 bg-blue/10 border border-red/30 rounded-2xl p-8 space-y-2"
        >
          <h2 className="text-[35px] font-bold"
            style={{ fontFamily: "'Promethean', sans-serif" }}
          >
            <span className="text-blue">GET I</span>
            <span className="text-red">N TOUCH</span>
          </h2>

          <div className="space-y-2">
            <div className="flex gap-2 text-black">
              <MapPin className="text-blue mt-3 flex-shrink-0" />
              <span className="text-[18px]">
                Ghaswala Estate, Swami Vivekananda Road, Jogeshwari West,
                Mumbai, Maharashtra, India - 400102
              </span>
            </div>

            <div className="flex gap-2 text-black">
              <Phone className="text-red mt-0.5 flex-shrink-0" />
              <span className="text-[18px]">
                <a href="tel:+919833994355" className="hover:text-blue">
                  +91 98339 94355
                </a>
              </span>
            </div>

            <div className="flex gap-2 text-black">
              <Mail className="text-blue mt-0.5 flex-shrink-0" />
              <span className="text-[18px]">
                <a href="mailTo:me" className="hover:text-red">
                  mobeen@wisetech-mep.com
                </a>
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-[25px] font-bold text-blue mb-2"
              style={{ fontFamily: "'Promethean', sans-serif" }}
            >Location</h3>
            <div className="rounded-md overflow-hidden">
              <iframe
                title="Company Location"
                className="w-full h-[300px]"
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5192.523752642171!2d72.8415131!3d19.140867999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7eee9aa0e35%3A0x8e2045ea442cfe34!2sWISETECH%20MEP%20CONSULTANTS%20Pvt.%20Ltd.!5e1!3m2!1sen!2sin!4v1768644227435!5m2!1sen!2sin"
              />
            </div>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div
          data-aos="fade-left"
          className="group w-full lg:w-1/2 bg-blue/10 border border-red/30 rounded-2xl p-8 space-y-2"
        >
          <h2 className="text-[35px] font-bold mb-5 text-center"
            style={{ fontFamily: "'Promethean', sans-serif" }}
          >
            <span className="text-blue">SEND US </span>
            <span className="text-red">A MESSAGE</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="name"
              placeholder="Your Full Name"
              value={data.name}
              onChange={(e) => {
                if (/^[a-zA-Z\s]*$/.test(e.target.value)) handleChange(e);
              }}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red"
            />

            <input
              name="phone"
              placeholder="Mobile Number"
              value={data.phone}
              onChange={(e) => {
                if (/^[0-9]*$/.test(e.target.value) && e.target.value.length <= 10) {
                  handleChange(e);
                }
              }}
              maxLength={10}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={data.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red"
            />

            <input
              name="purpose"
              placeholder="Purpose"
              value={data.purpose}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={data.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red resize-none"
            />

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-3 rounded-lg text-white font-bold transition
                ${isFormValid ? "bg-red" : "bg-blue cursor-not-allowed"}`}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
