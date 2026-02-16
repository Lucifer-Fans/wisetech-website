import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { Image as ImageIcon } from "lucide-react";

const steps = ["Info", "Image", "Review"];

export default function UploadNews() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    date: "",
    category: "",
    link: "",
    shortdescription: "",
  });

  const [image, setImage] = useState(null);

  /* ---------- VALIDATION ---------- */
  const validateStep = () => {
    if (step === 0) {
      if (
        !data.title ||
        !data.date ||
        !data.category ||
        !data.shortdescription
      ) {
        Swal.fire("Error", "All fields except link are required", "error");
        return false;
      }
    }

    if (step === 1 && !image) {
      Swal.fire("Error", "Image is required", "error");
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, 2));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  /* ---------- SUBMIT ---------- */
  const submit = async () => {
    if (loading) return; // ✅ Prevent multiple clicks

    if (!image) {
      return Swal.fire("Error", "Image is required", "error");
    }

    setLoading(true); // ✅ Start loading

    try {
      const form = new FormData();
      Object.entries(data).forEach(([k, v]) => form.append(k, v));
      form.append("image", image);

      await api.post("/news", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Uploaded", "News uploaded successfully", "success");
      navigate("/news");
    } catch (err) {
      Swal.fire("Error", "Upload failed", "error");
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center py-6 px-4">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-[30px] font-bold mb-4">Upload News</h1>

        {/* ---------------- STEP TRACKER ---------------- */}
        <div className="flex justify-between items-center px-4">
          {steps.map((label, index) => (
            <div key={index} className="flex-1 text-center">
              <div
                className={`mx-auto w-10 h-10 flex items-center justify-center rounded-full text-[16px] font-bold transition ${
                  index === step
                    ? "bg-red text-white scale-110 shadow-lg"
                    : index < step
                    ? "bg-green text-white"
                    : "bg-blue text-white"
                }`}
              >
                {index + 1}
              </div>
              <p
                className={`text-[15px] mt-1 font-medium ${
                  index === step ? "text-red" : "text-blue"
                }`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ---------------- FORM CARD ---------------- */}
        <div className="bg-white shadow-2xl rounded-2xl px-10 py-12 space-y-10">

          {/* ---------------- STEP 1 ---------------- */}
          {step === 0 && (
            <>
              <h2 className="text-[30px] font-bold text-blue border-b border-black pb-1">
                News Info
              </h2>

              <div className="flex flex-col gap-4">

                {["category", "title", "link"].map((f) => (
                  <div key={f} className="flex flex-col gap-1">
                    <label className="text-[18px] font-medium text-black capitalize">
                      {f}
                    </label>
                    <input
                      className="w-full px-4 py-2 border rounded-lg"
                      value={data[f]}
                      onChange={(e) =>
                        setData({ ...data, [f]: e.target.value })
                      }
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1">
                  <label className="text-[18px] font-medium text-black">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={data.date}
                    onChange={(e) =>
                      setData({ ...data, date: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[18px] font-medium text-black">
                    Short Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg"
                    value={data.shortdescription}
                    onChange={(e) =>
                      setData({ ...data, shortdescription: e.target.value })
                    }
                  />
                </div>
              </div>
            </>
          )}

          {/* ---------------- STEP 2 ---------------- */}
          {step === 1 && (
            <>
              <h2 className="text-[30px] font-bold text-blue border-b border-black pb-2">
                Upload Image
              </h2>

              <label className="flex items-center gap-4 w-fit cursor-pointer group">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <div
                  className="flex items-center gap-2 border-2 border-dashed border-blue
                  rounded-lg px-4 py-2 text-[16px] text-black font-medium
                  group-hover:border-red transition"
                >
                  <ImageIcon size={20} className="text-blue" />
                  <span>Choose file</span>
                </div>

                <div className="h-20 w-20 rounded-lg border border-black bg-white
                  flex items-center justify-center overflow-hidden shadow-sm">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-[14px] text-black text-center leading-tight">
                      Image<br />Preview
                    </span>
                  )}
                </div>
              </label>
            </>
          )}

          {/* ---------------- STEP 3 ---------------- */}
          {step === 2 && (
            <>
              <h2 className="text-[30px] font-bold text-blue border-b border-black pb-2 mb-6">
                Review
              </h2>

              <div className="space-y-6">

                <div className="border border-black rounded-lg shadow-sm text-[16px] p-5">
                  <h3 className="font-bold text-black text-[18px] mb-4">
                    News Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-black mb-3">
                    <div>
                      <span className="font-medium">Category:</span> {data.category || "—"}
                    </div>
                    <div>
                      <span className="font-medium">Title:</span> {data.title || "—"}
                    </div>
                    <div>
                      <span className="font-medium">Date:</span> {data.date || "—"}
                    </div>
                    <div>
                      <span className="font-medium">Link:</span> {data.link || "—"}
                    </div>
                  </div>

                  <div className="text-black leading-relaxed">
                    <span className="font-medium">Short Description:</span>
                    <p className="mt-1 whitespace-pre-line">
                      {data.shortdescription || "—"}
                    </p>
                  </div>
                </div>

                <div className="border border-black rounded-lg shadow-sm p-5">
                  <h3 className="font-bold text-black text-[18px] mb-5">
                    Image
                  </h3>
                  <div className="flex justify-center">
                    {image && (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="News"
                        className="h-40 w-34 object-cover rounded-xl border-2 border-green hover:scale-105 shadow-md"
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ---------------- NAV BUTTONS ---------------- */}
          <div className="flex justify-between pt-6">
            {step > 0 && (
              <button
                onClick={back}
                className="px-5 py-2 bg-blue text-white rounded-lg hover:bg-red transition text-[16px]"
              >
                Back
              </button>
            )}

            {step < 2 ? (
              <button
                onClick={next}
                className="ml-auto px-6 py-2 bg-red text-white hover:bg-blue rounded-lg transition text-[16px]"
              >
                Next
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={loading} // ✅ Disabled while loading
                className={`ml-auto px-6 py-2 bg-green text-white rounded-lg transition text-[16px] ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
